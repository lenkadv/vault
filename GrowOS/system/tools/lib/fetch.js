'use strict';

/**
 * fetch.js — resolve an update source to a local .tgz path  (system/tools/lib/)
 *
 * PRODUCT code (SPEC §2, §6.3 step 1): Node >= 18, stdlib only, no npm, no
 * shelling out. Two kinds of source:
 *   - a LOCAL path (relative or absolute): used in place, nothing is copied.
 *   - an https:// URL: downloaded (following up to 5 redirects) into the
 *     install's .growos/tmp/ folder so the rest of update can extract it.
 *
 * http:// is REFUSED before any network call — an update must arrive over a
 * secure channel, and refusing early keeps the error plain and testable
 * without a live server (SPEC §11 update-suite item g). Any redirect that
 * would leave https is refused the same way.
 */

const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');
const { URL } = require('node:url');
const { newId } = require('./ids.js');

/** True when the string looks like a URL with a scheme (scheme://…). */
function isUrl(s) {
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(String(s));
}

/**
 * Stream one https response to `dest`, following redirects. `redirectsLeft`
 * counts DOWN; at 0 a further redirect is an error. Every hop is re-checked
 * for the https scheme, so a redirect to http:// (or anything else) is refused.
 */
function downloadHttps(url, dest, redirectsLeft) {
  return new Promise((resolve, reject) => {
    let parsed;
    try {
      parsed = new URL(url);
    } catch (_err) {
      reject(new Error('the update link is not a valid URL: ' + url));
      return;
    }
    if (parsed.protocol !== 'https:') {
      reject(new Error('refusing a non-secure redirect to ' + parsed.protocol + '// — updates must stay on https://'));
      return;
    }

    const req = https.get(url, (res) => {
      const code = res.statusCode || 0;
      if (code >= 300 && code < 400 && res.headers.location) {
        res.resume(); // drain so the socket can be reused/closed
        if (redirectsLeft <= 0) {
          reject(new Error('the update link redirected too many times (more than 5) — check the address'));
          return;
        }
        const next = new URL(res.headers.location, url).toString();
        downloadHttps(next, dest, redirectsLeft - 1).then(resolve, reject);
        return;
      }
      if (code !== 200) {
        res.resume();
        reject(new Error('could not download the update (the server said HTTP ' + code + '): ' + url));
        return;
      }
      const out = fs.createWriteStream(dest);
      res.pipe(out);
      out.on('finish', () => out.close(() => resolve(dest)));
      out.on('error', (err) => {
        try { fs.rmSync(dest, { force: true }); } catch (_e) { /* best effort */ }
        reject(err);
      });
    });
    req.on('error', (err) => {
      try { fs.rmSync(dest, { force: true }); } catch (_e) { /* best effort */ }
      reject(err);
    });
  });
}

/**
 * fetchToTmp(source, root) -> Promise<{ path, downloaded }>
 *   - source is required; empty/non-string throws a plain error.
 *   - local path: returns { path: <resolved absolute>, downloaded: false } and
 *     verifies the file exists (a missing file is a plain error, not a crash).
 *   - https:// URL: downloads into <root>/.growos/tmp/update-<id>.tgz and
 *     returns { path, downloaded: true }.
 *   - http:// (or any non-https scheme) URL: REFUSED with a plain error, before
 *     any network access.
 */
async function fetchToTmp(source, root) {
  if (typeof source !== 'string' || source === '') {
    throw new Error('an update needs a file or an https:// link — none was given');
  }

  if (!isUrl(source)) {
    const abs = path.resolve(String(source));
    let stat = null;
    try { stat = fs.statSync(abs); } catch (_err) { /* handled below */ }
    if (!stat || !stat.isFile()) {
      throw new Error('could not find the update file: ' + source);
    }
    return { path: abs, downloaded: false };
  }

  let parsed;
  try {
    parsed = new URL(source);
  } catch (_err) {
    throw new Error('the update link is not a valid URL: ' + source);
  }
  if (parsed.protocol === 'http:') {
    throw new Error('refusing to download over http:// (not secure) — ask for an https:// link instead: ' + source);
  }
  if (parsed.protocol !== 'https:') {
    throw new Error('only https:// update links are supported (got ' + parsed.protocol + '//): ' + source);
  }

  const tmpDir = path.join(String(root), '.growos', 'tmp');
  fs.mkdirSync(tmpDir, { recursive: true });
  const dest = path.join(tmpDir, 'update-' + newId() + '.tgz');
  await downloadHttps(source, dest, 5);
  return { path: dest, downloaded: true };
}

module.exports = { fetchToTmp, isUrl };
