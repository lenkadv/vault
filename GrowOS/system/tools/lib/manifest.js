'use strict';

/**
 * manifest.js — sha256 hash-tree build / compare / verify  (system/tools/lib/)
 *
 * PRODUCT code (SPEC §2, §6, §6.3): Node >= 18, stdlib only, no npm, no
 * shelling out. Manifest keys are ALWAYS normalized POSIX '/' relative paths
 * (SPEC §2 exception), even when built on Windows.
 *
 * Manifest shape (also the `files` map inside package-manifest.json, §6.3):
 *   { "files": { "<posix relpath>": "<sha256 hex>", ... } }   keys sorted
 *
 * API (hashing functions are async — files are hashed via streams so big
 * payloads never load into memory twice):
 *   buildManifest(root, relPaths)            -> Promise<manifest>
 *   compareManifest(root, manifest, coveredRoots?) -> Promise<{ok,missing,changed,extra}>
 *       missing = in manifest, not on disk
 *       changed = on disk but hash differs (or is not a regular file)
 *       extra   = present under the covered top-level dirs but absent from
 *                 the manifest. coveredRoots defaults to the manifest keys'
 *                 top-level segments; pass an explicit array to widen/narrow.
 *   verifyDir(dir, manifest)                 -> Promise<{ok,missing,changed,extra}>
 *       restore-point verification: extras are flagged ANYWHERE under dir.
 *   saveManifest(manifest, filePath)         -> filePath   (pretty JSON,
 *       sorted keys, LF, no BOM, atomic write)
 *   loadManifest(filePath)                   -> manifest   (accepts BOM/CRLF
 *       per SPEC §2; validates shape and refuses malformed hashes)
 *   hashFile(absPath)                        -> Promise<sha256 hex>
 */

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const SHA256_RE = /^[0-9a-f]{64}$/;

/* ----------------------------- path handling ----------------------------- */

/** Normalize to POSIX and refuse anything unsafe. Returns { posix, segments }. */
function normalizeRelPath(input) {
  if (typeof input !== 'string' || input.length === 0) {
    throw new Error('manifest: path must be a non-empty string');
  }
  const posix = input.replace(/\\/g, '/'); // convert at the boundary (SPEC §2)
  if (posix.startsWith('/') || /^[A-Za-z]:/.test(posix)) {
    throw new Error('manifest: absolute paths are not allowed: ' + JSON.stringify(input));
  }
  const segments = posix.split('/');
  for (const seg of segments) {
    if (seg === '' || seg === '.' || seg === '..') {
      throw new Error('manifest: unsafe path segment ' + JSON.stringify(seg) + ' in ' + JSON.stringify(input));
    }
  }
  return { posix, segments };
}

const byteCompare = (a, b) => Buffer.compare(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8'));

/** Validate + return a canonical { files } copy with sorted keys. */
function normalizeManifest(manifest, sourceLabel) {
  const label = sourceLabel ? ' (' + sourceLabel + ')' : '';
  if (
    !manifest || typeof manifest !== 'object' ||
    !manifest.files || typeof manifest.files !== 'object' || Array.isArray(manifest.files)
  ) {
    throw new Error('manifest: expected shape { files: { "<relpath>": "<sha256 hex>" } }' + label);
  }
  const files = {};
  for (const key of Object.keys(manifest.files).sort(byteCompare)) {
    const { posix } = normalizeRelPath(key);
    if (posix !== key) {
      throw new Error('manifest: keys must already be POSIX relative paths: ' + JSON.stringify(key) + label);
    }
    const value = manifest.files[key];
    if (typeof value !== 'string' || !SHA256_RE.test(value)) {
      throw new Error('manifest: bad sha256 for ' + JSON.stringify(key) + label + ' (want 64 lowercase hex chars)');
    }
    files[key] = value;
  }
  return { files };
}

/* -------------------------------- hashing -------------------------------- */

/** Streaming sha256 of one file. */
async function hashFile(absPath) {
  const hash = crypto.createHash('sha256');
  for await (const chunk of fs.createReadStream(absPath)) hash.update(chunk);
  return hash.digest('hex');
}

async function buildManifest(root, relPaths) {
  if (typeof root !== 'string' || root.length === 0) {
    throw new Error('buildManifest: root must be a non-empty string');
  }
  if (!Array.isArray(relPaths)) throw new Error('buildManifest: relPaths must be an array');

  const normalized = relPaths.map(normalizeRelPath);
  const seen = new Set();
  for (const n of normalized) {
    if (seen.has(n.posix)) throw new Error('buildManifest: duplicate path: ' + n.posix);
    seen.add(n.posix);
  }
  normalized.sort((a, b) => byteCompare(a.posix, b.posix));

  const files = {};
  for (const n of normalized) {
    const abs = path.join(root, ...n.segments);
    let stat;
    try {
      stat = fs.lstatSync(abs);
    } catch (_err) {
      throw new Error('buildManifest: file not found: ' + n.posix);
    }
    if (!stat.isFile()) throw new Error('buildManifest: not a regular file: ' + n.posix);
    files[n.posix] = await hashFile(abs);
  }
  return { files };
}

/* ------------------------------- comparing ------------------------------- */

/** Recursively collect POSIX rel paths of everything that is not a directory. */
function walkEntries(absDir, relPrefix, out) {
  const dirents = fs.readdirSync(absDir, { withFileTypes: true }).sort((a, b) => byteCompare(a.name, b.name));
  for (const dirent of dirents) {
    const rel = relPrefix === '' ? dirent.name : relPrefix + '/' + dirent.name;
    if (dirent.isDirectory()) {
      walkEntries(path.join(absDir, dirent.name), rel, out);
    } else {
      out.push(rel); // regular files AND oddities (symlinks etc.) — both count
    }
  }
}

/** Shared missing/changed pass over every manifest key. */
async function diffKnownFiles(rootAbs, files) {
  const missing = [];
  const changed = [];
  for (const key of Object.keys(files)) {
    const abs = path.join(rootAbs, ...key.split('/'));
    let stat = null;
    try {
      stat = fs.lstatSync(abs);
    } catch (_err) {
      /* missing */
    }
    if (!stat) {
      missing.push(key);
      continue;
    }
    if (!stat.isFile()) {
      changed.push(key); // something else sits where a file should be
      continue;
    }
    if ((await hashFile(abs)) !== files[key]) changed.push(key);
  }
  missing.sort(byteCompare);
  changed.sort(byteCompare);
  return { missing, changed };
}

function resultOf(missing, changed, extra) {
  return { ok: missing.length === 0 && changed.length === 0 && extra.length === 0, missing, changed, extra };
}

async function compareManifest(root, manifest, coveredRoots) {
  const { files } = normalizeManifest(manifest);
  const { missing, changed } = await diffKnownFiles(root, files);

  const roots =
    coveredRoots === undefined || coveredRoots === null
      ? [...new Set(Object.keys(files).map((k) => k.split('/')[0]))]
      : [...new Set(coveredRoots.map((r) => normalizeRelPath(r).posix))];

  const present = [];
  for (const rel of roots.sort(byteCompare)) {
    const abs = path.join(root, ...rel.split('/'));
    let stat = null;
    try {
      stat = fs.lstatSync(abs);
    } catch (_err) {
      continue; // a fully-missing covered root has no extras
    }
    if (stat.isDirectory()) walkEntries(abs, rel, present);
    else present.push(rel);
  }
  const extra = [...new Set(present)].filter((p) => !(p in files)).sort(byteCompare);
  return resultOf(missing, changed, extra);
}

async function verifyDir(dir, manifest) {
  const { files } = normalizeManifest(manifest);
  const { missing, changed } = await diffKnownFiles(dir, files);
  const present = [];
  let stat = null;
  try {
    stat = fs.lstatSync(dir);
  } catch (_err) {
    /* absent dir -> everything already reported missing */
  }
  if (stat && stat.isDirectory()) walkEntries(dir, '', present);
  const extra = present.filter((p) => !(p in files)).sort(byteCompare);
  return resultOf(missing, changed, extra);
}

/* ------------------------------- save / load ------------------------------ */

function saveManifest(manifest, filePath) {
  if (typeof filePath !== 'string' || filePath.length === 0) {
    throw new Error('saveManifest: filePath must be a non-empty string');
  }
  const canonical = normalizeManifest(manifest);
  const body = JSON.stringify(canonical, null, 2) + '\n'; // pretty, LF, trailing newline

  // Atomic write (SPEC §2): tmp sibling on the same volume, rename into place.
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  const tmp = path.join(
    dir,
    path.basename(filePath) + '.' + Math.random().toString(36).slice(2, 8) + '.growos-tmp'
  );
  try {
    fs.writeFileSync(tmp, body, 'utf8'); // UTF-8, no BOM
    try {
      fs.renameSync(tmp, filePath);
    } catch (err) {
      if (err && (err.code === 'EEXIST' || err.code === 'EPERM')) {
        fs.rmSync(filePath, { force: true });
        fs.renameSync(tmp, filePath);
      } else {
        throw err;
      }
    }
  } finally {
    fs.rmSync(tmp, { force: true });
  }
  return filePath;
}

function loadManifest(filePath) {
  let text = fs.readFileSync(filePath, 'utf8');
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1); // accept BOM (SPEC §2)
  let parsed;
  try {
    parsed = JSON.parse(text); // JSON.parse accepts CRLF whitespace natively
  } catch (err) {
    throw new Error('manifest: invalid JSON in ' + filePath + ': ' + err.message);
  }
  return normalizeManifest(parsed, filePath);
}

module.exports = { buildManifest, compareManifest, verifyDir, saveManifest, loadManifest, hashFile };
