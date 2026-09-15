'use strict';

/**
 * cmd-publish-event.js — the `publish-event` command (Build Doc P5.5).
 *
 *   growos publish-event --item <path> --publisher <skill> --route <r>
 *     --outcome <o> --reason <code> [--destination <id>] [--ref <id>] [--json]
 *
 * ONE reason-coded event per publish attempt, whatever the outcome — blocked,
 * uncertain and manual attempts used to leave no trace at all, so the Doctor
 * could not tell a broken connector from an owner who prefers pasting. The
 * event lands in the business logbook (`.state/logbook.jsonl`), and the
 * Doctor reads the codes, never the connections.
 *
 * The codes are a FIXED list (below, documented in publisher-standard.md). A
 * code the list does not know is refused, not recorded: a free-text reason
 * would rot into prose nobody can bucket, which is the thing this exists to
 * prevent. The recorder validates and records; it never judges the attempt.
 *
 * PRODUCT code: Node >= 18, stdlib only, no npm, no shelling out.
 */

const publishing = require('./publishing.js');
const logbook = require('./logbook.js');

/** How far the attempt got. `prepared` = verified safe handoff; the two live
 * forms distinguish "it is public now" from "it is scheduled to go public". */
const OUTCOMES = new Set([
  'prepared', 'live-now', 'live-scheduled', 'waiting-owner', 'blocked', 'needs-verification',
]);

/** Which tier carried it. */
const ROUTES = new Set(['connector', 'api', 'manual']);

/** WHY it ended that way — the codes the Doctor buckets. */
const REASONS = new Set([
  'verified',            // the outcome is what the publisher intended, read back
  'owner-chose-manual',  // manual by preference, not by failure
  'mode-unanswered',     // the channel has no answer in setup.md; owner was asked
  'mode-safe',           // live was not authorised; a safe handoff was made instead
  'connector-missing',   // no usable connection in this session
  'connector-unproven',  // a connection exists but could not prove the needed capability
  'account-mismatch',    // the connection's account is not the setup.md destination
  'destination-missing', // setup.md has no confirmed destination id
  'schedule-missing',    // a schedule was needed and not approved/present
  'unsupported-media',   // the destination cannot carry the approved package
  'sealed-mismatch',     // a sealed asset failed verification (publish-stage refused)
  'approval-mismatch',   // the item no longer matches its approved snapshot
  'compliance-missing',  // ads: no recorded pass for the exact creative
  'provider-error',      // the outside service failed or refused
  'readback-failed',     // the write may have landed; the read-back contradicts or fails
  'readback-timeout',    // bounded verification retries ran out
  'id-lost',             // the mutation may have committed and no id came back
]);

function fail(json, msg) {
  if (json) process.stdout.write(JSON.stringify({ refused: true, reason: msg }) + '\n');
  else process.stdout.write('Not recorded: ' + msg + '\n');
  return 2;
}

async function run(args, ctx) {
  const f = ctx.flags || {};
  const json = !!f.json;
  if (!f.item || typeof f.item !== 'string') return fail(json, 'publish-event needs --item <path>');
  if (!ctx.root) return fail(json, 'there is no GrowOS folder here (no system/VERSION found)');

  const publisher = typeof f.publisher === 'string' ? f.publisher.trim() : '';
  if (!publisher || !/^[a-z0-9][a-z0-9-]*$/i.test(publisher)) {
    return fail(json, 'publish-event needs --publisher <the skill that made the attempt>');
  }
  const route = typeof f.route === 'string' ? f.route.trim() : '';
  if (!ROUTES.has(route)) {
    return fail(json, '--route must be one of: ' + Array.from(ROUTES).join(', '));
  }
  const outcome = typeof f.outcome === 'string' ? f.outcome.trim() : '';
  if (!OUTCOMES.has(outcome)) {
    return fail(json, '--outcome must be one of: ' + Array.from(OUTCOMES).join(', '));
  }
  const reason = typeof f.reason === 'string' ? f.reason.trim() : '';
  if (!REASONS.has(reason)) {
    return fail(json, '--reason must be one of the documented codes: ' + Array.from(REASONS).join(', '));
  }

  let meta;
  try {
    meta = publishing.resolveMode(ctx.root, f.item);
  } catch (err) {
    return fail(json, err && err.message ? err.message : String(err));
  }

  const fs = require('node:fs');
  const path = require('node:path');
  const fm = require('./fm.js');
  const ids = require('./ids.js');
  let id = null;
  try {
    const text = fs.readFileSync(path.join(path.resolve(String(ctx.root)), ...meta.item.split('/')), 'utf8');
    id = fm.getField(text, 'id') || null;
  } catch (_) { id = null; }
  // An event with no item id can never be matched to a receipt, so it would
  // record nothing the Doctor can use — and worse, it LOOKS recorded. Refuse —
  // publishers only run on stamped items anyway.
  if (!id || !ids.isId(id)) {
    return fail(json, 'the item has no valid id, so the attempt cannot be attributed to it — ' +
      'a publish event must name the stamped item it belongs to');
  }

  const entry = logbook.append(ctx.root, meta.business, {
    actor: 'ai',
    event: 'publish-attempt',
    id,
    item: meta.item,
    channel: meta.channel,
    publisher,
    route,
    outcome,
    // P5.5 names this field reason_code — a fixed vocabulary, never free text.
    reason_code: reason,
    intended_destination: typeof f.destination === 'string' && f.destination !== '' ? f.destination : null,
    ref: typeof f.ref === 'string' && f.ref !== '' ? f.ref : null,
  });

  if (json) process.stdout.write(JSON.stringify({ recorded: true, entry }) + '\n');
  else process.stdout.write('Recorded: ' + publisher + ' / ' + meta.channel + ' -> ' + outcome + ' (' + reason + ')\n');
  return 0;
}

module.exports = {
  name: 'publish-event',
  summary: 'Record one reason-coded publish attempt in the business logbook.',
  run,
};
