'use strict';

/**
 * item-fields.js — the ONE list of a work item's core frontmatter fields.
 *
 * Two different pieces of machinery turn on the question "which keys are
 * core": the guard (system/guards/item-hook.js) refuses an ambiguous label —
 * a repeated key, or a core field written with different capitalization —
 * and `restamp` decides which files are in a shape it may correct. When each
 * kept its own list, restamp did not know `headline` was core: it restamped
 * an item carrying `Headline:`, reported the business cured, and left the
 * owner with a file the guard still refuses to edit, with nothing saying
 * why. One list, required by both, so the two can never disagree.
 *
 * The meaning of each field lives in system/standards/item-model.md.
 */

/** The shipping receipt a publishing skill fills in. `publish_reason` is the
 * P5.5 outcome code (why an attempt ended the way it did — a short kebab-case
 * token from the publisher standard's list, never prose). */
const RECEIPT_KEYS = [
  'publish_destination', 'publish_ref', 'publish_attempted_at',
  'publish_state', 'publish_note', 'publish_reason', 'published_at',
];

/** Every field the system stamps or the guard treats as core. `sealed` is the
 * P4.1 shipped-asset seal: an ambiguous spelling of it would let a publish-time
 * check and a human reader disagree about which assets are sealed. */
const CORE_KEYS = [
  'id', 'status', 'type', 'business', 'channel', 'created',
  'headline', 'skill', 'note', 'sealed',
].concat(RECEIPT_KEYS);

module.exports = { CORE_KEYS, RECEIPT_KEYS };
