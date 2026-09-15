---
name: publish
description: 'Use when approved email, video, or content items need to be prepared and shipped as far as the owner chose: a safe unsent draft, a verified private upload, an approved schedule, or a manual handoff. Triggers: "publish", "prepare the approved email", "put this in Kit", "prepare the approved video", "upload this privately", "prepare this post", "schedule the approved content", "publish the social batch", "prepare everything I approved".'
---

# Publish

ONE safe publisher for email, video, and content. It reads each approved item's
channel and runs that channel's flow — nothing more. Each flow below is the
already-reviewed publisher it replaces, re-housed word for word; this file only
routes to the right one.

Read `system/standards/publisher-standard.md` before starting. Its queue
boundary, resolver, receipt, live rules, and event recording apply to every
branch. Ads are not this skill's job: an ads item goes to `ads-meta-publish`,
which owns the Meta compliance backstop — say so and stop if one is handed
here.

## 1. Take the items

Accept approved items from a `review-queue` handoff, or find the ones the owner
asks for. Run `node system/tools/growos.js reconcile` first. Only items at
`status: approved` enter publishing; refuse every other status, per the
standard. Handle a batch one item at a time, each with its own outcome — one
failure never rolls back or hides another item's verified success.

## 2. Check the item's type before routing on channel

Some types have their own successor skill, or no publish step at all — a
channel alone is not enough to route these safely. Re-read the item's own
`type:` field before opening any channel branch, and hand it off by type
instead when it matches one of these:

- `social-plan` → not here. Hand it to `social-write` and say so.
- `carousel-outline` → not here. Hand it to `carousel-create` and say so.
- `gbp-post`, `review-request-campaign`, `review-response-batch` → not here.
  These are paste-only; `google-business` has no `publish` step for them.
  Say so plainly and stop.
- `cold-outreach` → not here. The normal email publisher would point it at
  the wrong sending setup entirely. Hand it back to `cold-outreach`'s own
  handoff and say so.

An unfamiliar type with no documented successor is a question for the owner,
not a channel-branch default — never guess a destination.

## 3. Route by the item's channel

Read the item's stamped `channel` field and open exactly one branch file. The
map is fixed:

- `email` (a newsletter, broadcast, sequence email, or customer email) →
  `channels/email.md`
- `video` (a final video package) → `channels/video.md`
- `social`, `articles`, `pages`, a platform name, or any other content channel →
  `channels/content.md`
- `ads` → not here. Hand the item to `ads-meta-publish` and say so.
- `strategy`, and only a `type: marketing-plan` item → not here. A strategy
  plan is installed into `brain/plan.md` by `marketing-strategy`, not
  published outside. Hand the item to `marketing-strategy` and say so. Every
  other type sharing the `strategy` channel — `campaign-brief`, `seo-report`,
  `marketing-report`, `website-audit`, `offer`, and any other internal
  document — is not a plan and has no publish step: it is finished the
  moment it is `approved`; leave it there and say so.

If the channel is missing or does not fit the map, ask the owner — never guess
a destination, and never fall through to a branch by default. Follow the chosen
branch exactly as written; every rule in it (approved snapshot, resolver,
staging, receipts, events, its checklist) is law for that item.

## 4. Close per item

Each branch records its own reason-coded publish-event per attempt (as
`--publisher publish`), writes the complete receipt before any move to
published, and scores its own checklist in `checklists/`. Report per item:
headline, destination, outside reference when one exists, how far the
publish actually went (from its receipt), and the next owner action. This
skill never publishes past the owner's per-channel choice, never edits
approved copy, and never invents a destination, schedule, account, or
budget.
