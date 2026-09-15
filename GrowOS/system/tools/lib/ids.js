'use strict';

/**
 * ids.js - permanent item ids.
 *
 * An id is 10 characters of lowercase base36 (0-9, a-z), e.g. "k3x9q2m7wd".
 * Stamped once by the guard hook, never edited, never derived from the
 * filename. Randomness comes from crypto.randomBytes with rejection sampling,
 * so every one of the 36 characters is equally likely (no modulo bias).
 * 36^10 is about 3.6 quadrillion times 1000 - collisions are not a real-world
 * concern, and the Doctor still checks for duplicates as a backstop.
 */

const crypto = require('crypto');

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';
const LENGTH = 10;
// Largest multiple of 36 that fits in a byte (7 * 36 = 252). Bytes at or above
// this are thrown away so that byte % 36 is perfectly uniform.
const LIMIT = 252;

/** newId() -> a fresh 10-character lowercase base36 id. */
function newId() {
  let out = '';
  while (out.length < LENGTH) {
    const bytes = crypto.randomBytes(16);
    for (let i = 0; i < bytes.length && out.length < LENGTH; i++) {
      const b = bytes[i];
      if (b < LIMIT) out += ALPHABET[b % 36];
    }
  }
  return out;
}

/** isId(s) -> true only for a string of exactly 10 lowercase base36 chars. */
function isId(s) {
  return typeof s === 'string' && /^[0-9a-z]{10}$/.test(s);
}

module.exports = { newId, isId };
