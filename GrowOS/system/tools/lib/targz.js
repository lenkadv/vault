'use strict';

/**
 * targz.js — deterministic USTAR tar.gz writer/reader  (system/tools/lib/)
 *
 * PRODUCT code (SPEC §2, §6): Node >= 18, stdlib only, no npm, no shelling
 * out. Hand-rolled USTAR headers + zlib.gzipSync/gunzipSync.
 *
 * API:
 *   createTarGz(entries, outPath) -> outPath
 *     entries: [{ name, content, mode? }]
 *       name    entry path. POSIX '/' separators ALWAYS stored; windows-style
 *               '\' input is converted at the boundary (SPEC §2 exception).
 *       content Buffer or string (strings written as UTF-8).
 *       mode    optional file mode (default 0o644); masked to 0o7777.
 *     Deterministic: fixed mtime 0, uid/gid 0, empty uname/gname, entries
 *     sorted by UTF-8 byte order, fixed gzip level -> same input, same bytes.
 *   extractTarGz(tgzPath, destDir) -> [names]  (creates parent dirs; every
 *     file written atomically: tmp sibling + rename)
 *   listTarGz(tgzPath) -> [{ name, type: 'file'|'dir', size, mode }]
 *
 * Safety (enforced on BOTH read and write):
 *   - no absolute paths, no '..' / '.' / empty segments, no backslashes,
 *     no Windows drive prefixes (zip-slip protection)
 *   - symlink / hardlink / any non-file, non-dir entry type refused on read
 *   - long names via the USTAR prefix field up to 255 bytes total; longer
 *     (or unsplittable at a '/') refused with a plain error
 */

const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const BLOCK = 512;
const NAME_MAX = 100;   // ustar name field (bytes)
const PREFIX_MAX = 155; // ustar prefix field (bytes)
const TOTAL_MAX = 255;  // prefix + '/' + name ceiling we support

/* ----------------------------- shared helpers ---------------------------- */

/** Validate a POSIX entry name; throw a plain error on anything unsafe. */
function assertSafeEntryName(name) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('tar entry name must be a non-empty string');
  }
  if (name.includes('\\')) {
    throw new Error('unsafe tar entry name (backslash): ' + JSON.stringify(name));
  }
  if (name.startsWith('/')) {
    throw new Error('unsafe tar entry name (absolute path): ' + JSON.stringify(name));
  }
  if (/^[A-Za-z]:/.test(name)) {
    throw new Error('unsafe tar entry name (drive path): ' + JSON.stringify(name));
  }
  const segments = name.split('/');
  for (const seg of segments) {
    if (seg === '' || seg === '.' || seg === '..') {
      throw new Error('unsafe tar entry name (segment ' + JSON.stringify(seg) + '): ' + JSON.stringify(name));
    }
  }
  return segments;
}

const utf8 = (s) => Buffer.from(s, 'utf8');

/** Atomic write: tmp sibling on the same volume, then rename into place. */
function atomicWriteFileSync(targetPath, data, mode) {
  const dir = path.dirname(targetPath);
  fs.mkdirSync(dir, { recursive: true });
  const tmp = path.join(
    dir,
    path.basename(targetPath) + '.' + Math.random().toString(36).slice(2, 8) + '.growos-tmp'
  );
  try {
    fs.writeFileSync(tmp, data);
    if (mode !== undefined) fs.chmodSync(tmp, mode);
    try {
      fs.renameSync(tmp, targetPath);
    } catch (err) {
      // Windows: rename over an existing file can fail — replace explicitly.
      if (err && (err.code === 'EEXIST' || err.code === 'EPERM')) {
        fs.rmSync(targetPath, { force: true });
        fs.renameSync(tmp, targetPath);
      } else {
        throw err;
      }
    }
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

/* -------------------------------- writing -------------------------------- */

/** Zero-padded octal, NUL-terminated, into a fixed-width field. */
function writeOctal(header, offset, width, value) {
  const s = value.toString(8).padStart(width - 1, '0');
  if (s.length > width - 1) {
    throw new Error('tar numeric field overflow: ' + value);
  }
  header.write(s + '\0', offset, 'latin1');
}

/**
 * Split a long name (bytes) into ustar { prefixBytes, nameBytes } at a '/'.
 * UTF-8-safe: '/' (0x2f) never occurs inside a multi-byte sequence.
 */
function splitName(name) {
  const bytes = utf8(name);
  if (bytes.length > TOTAL_MAX) {
    throw new Error(
      'tar entry name too long (' + bytes.length + ' bytes; max ' + TOTAL_MAX + '): ' + name.slice(0, 60) + '...'
    );
  }
  if (bytes.length <= NAME_MAX) {
    return { nameBytes: bytes, prefixBytes: null };
  }
  let split = -1; // rightmost '/' with prefix <= 155 and remainder <= 100
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] === 0x2f && i <= PREFIX_MAX && bytes.length - i - 1 <= NAME_MAX && bytes.length - i - 1 > 0) {
      split = i;
    }
  }
  if (split === -1) {
    throw new Error(
      'tar entry name cannot be split into ustar prefix/name (no "/" lands so that prefix <= ' +
        PREFIX_MAX + ' bytes and name <= ' + NAME_MAX + ' bytes): ' + name.slice(0, 60) + '...'
    );
  }
  return { prefixBytes: bytes.subarray(0, split), nameBytes: bytes.subarray(split + 1) };
}

function buildHeader(nameBytes, prefixBytes, size, mode, typeflag) {
  const h = Buffer.alloc(BLOCK);
  nameBytes.copy(h, 0);            // name (<= 100 bytes, validated)
  writeOctal(h, 100, 8, mode);     // mode
  writeOctal(h, 108, 8, 0);        // uid — fixed 0 (deterministic)
  writeOctal(h, 116, 8, 0);        // gid — fixed 0
  writeOctal(h, 124, 12, size);    // size
  writeOctal(h, 136, 12, 0);       // mtime — fixed 0 (deterministic)
  h.fill(0x20, 148, 156);          // chksum = spaces while summing
  h.write(typeflag, 156, 'latin1');
  // linkname (157..257) stays zero — symlinks are not supported
  h.write('ustar\0', 257, 'latin1');
  h.write('00', 263, 'latin1');
  // uname/gname (265..329) stay empty; devmajor/devminor (329..345) stay zero
  if (prefixBytes) prefixBytes.copy(h, 345);
  let sum = 0;
  for (let i = 0; i < BLOCK; i++) sum += h[i];
  h.write(sum.toString(8).padStart(6, '0') + '\0 ', 148, 'latin1');
  return h;
}

function createTarGz(entries, outPath) {
  if (!Array.isArray(entries)) throw new Error('createTarGz: entries must be an array');
  if (typeof outPath !== 'string' || outPath.length === 0) {
    throw new Error('createTarGz: outPath must be a non-empty string');
  }

  const normalized = entries.map((entry, i) => {
    if (!entry || typeof entry !== 'object') {
      throw new Error('createTarGz: entry ' + i + ' must be an object');
    }
    if (typeof entry.name !== 'string' || entry.name.length === 0) {
      throw new Error('createTarGz: entry ' + i + ' needs a non-empty name');
    }
    const name = entry.name.replace(/\\/g, '/'); // POSIX always, even on Windows
    if (name.endsWith('/')) {
      throw new Error('createTarGz: directories are implicit; entry names must not end with "/": ' + name);
    }
    assertSafeEntryName(name);
    let content = entry.content;
    if (typeof content === 'string') content = utf8(content);
    if (!Buffer.isBuffer(content)) {
      throw new Error('createTarGz: entry ' + JSON.stringify(name) + ' content must be a Buffer or string');
    }
    let mode = entry.mode === undefined ? 0o644 : entry.mode;
    if (!Number.isInteger(mode) || mode < 0) {
      throw new Error('createTarGz: entry ' + JSON.stringify(name) + ' mode must be a non-negative integer');
    }
    return { name, content, mode: mode & 0o7777 };
  });

  normalized.sort((a, b) => Buffer.compare(utf8(a.name), utf8(b.name))); // deterministic order
  for (let i = 1; i < normalized.length; i++) {
    if (normalized[i].name === normalized[i - 1].name) {
      throw new Error('createTarGz: duplicate entry name: ' + normalized[i].name);
    }
  }

  const parts = [];
  for (const entry of normalized) {
    const { nameBytes, prefixBytes } = splitName(entry.name);
    parts.push(buildHeader(nameBytes, prefixBytes, entry.content.length, entry.mode, '0'));
    if (entry.content.length > 0) {
      parts.push(entry.content);
      const pad = (BLOCK - (entry.content.length % BLOCK)) % BLOCK;
      if (pad) parts.push(Buffer.alloc(pad));
    }
  }
  parts.push(Buffer.alloc(2 * BLOCK)); // end-of-archive marker

  // Fixed level: byte-identical output for identical input (gzip header from
  // zlib carries mtime 0 and a constant OS byte, so hashes are reproducible).
  const gz = zlib.gzipSync(Buffer.concat(parts), { level: zlib.constants.Z_BEST_COMPRESSION });
  atomicWriteFileSync(outPath, gz);
  return outPath;
}

/* -------------------------------- reading -------------------------------- */

function parseOctal(header, offset, width) {
  const raw = header.toString('latin1', offset, offset + width).replace(/\0/g, ' ').trim();
  if (raw === '') return 0;
  const value = parseInt(raw, 8);
  if (Number.isNaN(value)) throw new Error('corrupt tar: bad numeric field at header offset ' + offset);
  return value;
}

function cstring(header, offset, width) {
  let end = offset;
  const max = offset + width;
  while (end < max && header[end] !== 0) end++;
  return header.toString('utf8', offset, end);
}

function isZeroBlock(buf, offset) {
  for (let i = offset; i < offset + BLOCK; i++) {
    if (buf[i] !== 0) return false;
  }
  return true;
}

function readTarBuffer(tgzPath) {
  if (typeof tgzPath !== 'string' || tgzPath.length === 0) {
    throw new Error('tgzPath must be a non-empty string');
  }
  const gz = fs.readFileSync(tgzPath);
  try {
    return zlib.gunzipSync(gz);
  } catch (err) {
    throw new Error('failed to gunzip ' + tgzPath + ': ' + err.message);
  }
}

/** Iterate validated entries. Throws on anything unsafe or unsupported. */
function* iterateTar(tarBuf, sourceLabel) {
  let offset = 0;
  while (offset + BLOCK <= tarBuf.length) {
    if (isZeroBlock(tarBuf, offset)) return; // end-of-archive
    const h = tarBuf.subarray(offset, offset + BLOCK);

    const stored = parseOctal(h, 148, 8);
    let sum = 0;
    for (let i = 0; i < BLOCK; i++) sum += i >= 148 && i < 156 ? 0x20 : h[i];
    if (sum !== stored) {
      throw new Error('corrupt tar (' + sourceLabel + '): header checksum mismatch at offset ' + offset);
    }
    if (h.toString('latin1', 257, 262) !== 'ustar') {
      throw new Error('unsupported tar (' + sourceLabel + '): missing ustar magic at offset ' + offset);
    }

    let name = cstring(h, 0, NAME_MAX);
    const prefix = cstring(h, 345, PREFIX_MAX);
    if (prefix) name = prefix + '/' + name;
    const size = parseOctal(h, 124, 12);
    const mode = parseOctal(h, 100, 8) & 0o7777;
    const typeflag = h[156] === 0 ? '0' : String.fromCharCode(h[156]);

    if (typeflag === '2') throw new Error('refusing symlink entry in tar (' + sourceLabel + '): ' + name);
    if (typeflag === '1') throw new Error('refusing hard-link entry in tar (' + sourceLabel + '): ' + name);
    if (typeflag !== '0' && typeflag !== '5') {
      throw new Error('unsupported tar entry type ' + JSON.stringify(typeflag) + ' (' + sourceLabel + '): ' + name);
    }
    if (typeflag === '5' && name.endsWith('/')) name = name.slice(0, -1); // dir names may carry a trailing '/'
    if (name === '') throw new Error('corrupt tar (' + sourceLabel + '): empty entry name at offset ' + offset);
    assertSafeEntryName(name); // refuse-on-read: '..', absolute, backslash, drive

    const dataStart = offset + BLOCK;
    const dataEnd = dataStart + size;
    if (dataEnd > tarBuf.length) throw new Error('corrupt tar (' + sourceLabel + '): truncated entry data');
    yield { name, size, mode, typeflag, data: tarBuf.subarray(dataStart, dataEnd) };
    offset = dataStart + Math.ceil(size / BLOCK) * BLOCK;
  }
}

function listTarGz(tgzPath) {
  const out = [];
  for (const entry of iterateTar(readTarBuffer(tgzPath), tgzPath)) {
    out.push({
      name: entry.name,
      type: entry.typeflag === '5' ? 'dir' : 'file',
      size: entry.size,
      mode: entry.mode,
    });
  }
  return out;
}

function extractTarGz(tgzPath, destDir) {
  if (typeof destDir !== 'string' || destDir.length === 0) {
    throw new Error('extractTarGz: destDir must be a non-empty string');
  }
  const destRoot = path.resolve(destDir);
  fs.mkdirSync(destRoot, { recursive: true });
  const extracted = [];
  for (const entry of iterateTar(readTarBuffer(tgzPath), tgzPath)) {
    const segments = entry.name.split('/'); // pre-validated by iterateTar
    const target = path.join(destRoot, ...segments);
    const resolved = path.resolve(target);
    if (resolved !== destRoot && !resolved.startsWith(destRoot + path.sep)) {
      // belt-and-suspenders: segment validation above already prevents this
      throw new Error('unsafe tar entry escapes destination: ' + entry.name);
    }
    if (entry.typeflag === '5') {
      fs.mkdirSync(resolved, { recursive: true });
      continue;
    }
    atomicWriteFileSync(resolved, entry.data, entry.mode || 0o644);
    extracted.push(entry.name);
  }
  return extracted;
}

module.exports = { createTarGz, extractTarGz, listTarGz };
