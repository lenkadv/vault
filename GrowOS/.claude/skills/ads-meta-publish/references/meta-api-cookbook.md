# Meta API cookbook: the MCP-only publish path

The mechanics `ads-meta-publish` follows to move an approved ad item into Meta: pick the
campaign and ad set, host the creative publicly, upload it, build the creative, create the ad
PAUSED, apply tracking. Every write in this file goes through an `ads_*` MCP tool. There is no
CLI, SDK, or raw Graph API fallback in this pack. If an MCP call fails or a tool doesn't cover
something, that's the end of the line for that ad this run: report it and move on, don't reach
for a workaround outside the MCP.

Config values (`ad_account_id`, `page_id`, `pixel_or_dataset_id`, `landing_page_url`) come from
`brain/ads/config.md` or `./ads-brain/config.md`, never hardcoded here. An Instagram placement id
isn't part of that schema; look it up live with `ads_get_ig_accounts` when a Reels/IG placement
is wanted, and fall back to Facebook-only when none is connected.

Contents: Pick the campaign · Pick or create the ad set · Host the creative · Upload to Meta ·
Build the creative · Create the ad · Landmines table · Multiple text variants · Video and
carousel · UTM tags · Pixel tracking · After every create.

---

## Pick the campaign

`ads_get_ad_entities(level="campaign", fields=["id","name","objective","buying_type","status"])`,
filtered to `effective_status IN [ACTIVE, PAUSED]`. Offer the existing campaigns plus "create
new."

- **Existing:** capture `campaign_id` and `objective`: the objective drives which
  `optimization_goal` values the ad set is allowed to use.
- **New:** `ads_create_campaign(objective=<an OUTCOME_* value>, special_ad_categories=[], ...)`.
  Legacy objectives (`LINK_CLICKS`, `APP_INSTALLS`, etc.) are rejected outright; only the
  `OUTCOME_*` family works. PAUSED by default. CBO (a campaign-level `daily_budget`, pulled from
  config's `daily_budget`, in the account's minor currency unit, e.g. cents) is the sane
  default; only skip it if the person specifically wants ABO (budget set per ad set instead).

## Pick or create the ad set

`ads_get_ad_entities(level="adset", filtering=[{"field":"campaign.id","operator":"EQUAL","value":[<campaign_id>]}])`.
Offer existing ad sets under that campaign plus "create new."

- **Existing:** capture `ad_set_id`. Done, no targeting work needed.
- **New:** `ads_create_ad_set(campaign_id=..., optimization_goal=<must be in the campaign
  objective's allowed list>, billing_event="IMPRESSIONS", targeting={...})`. Build targeting
  fresh from `brain/ads/config.md` / the round's `_brief.md` (countries, age range) rather than
  trying to clone a reference ad set's exact targeting field-for-field, since reading a full
  targeting object back isn't reliable across every MCP build (see landmines). Use only
  interest IDs the person actually supplied and verified; never invent one. The MCP itself
  refuses invented IDs and falls back to geo-only broad targeting, which is a safe default, not
  a failure. EU/DSA beneficiary/payor fields auto-fill if you omit them. If the campaign is ABO
  (no campaign-level budget), set the ad set's `daily_budget` from config's `daily_budget`
  field; under CBO, omit ad set budget fields entirely (see landmines).

## Host the creative publicly

`ads_creative_upload_image` / `ads_creative_upload_video` fetch bytes from a URL you hand them;
they don't take a local file, and they explicitly reject Drive/Dropbox share links (those return
an interstitial HTML page instead of raw bytes, so the fetch fails). The file you host here is
always the staged copy, never a path opened straight off the round folder or the `_<ad-code>/`
parts folder (SKILL.md § 4, step 2): in GrowOS mode, the staged copy `growos publish-stage`
handed back (`<business>/.state/staging/<id>/<file>`); in standalone mode, the staged copy this
skill made and re-verified in that same step
(`work/ads/<round>/.staging/<item-id>/<ad-code>.png`, or
`ads/rounds/<round>/.staging/<item-id>/<ad-code>.png` standalone; a carousel's cards are staged
the same way, `.staging/<item-id>/card-01.png`, `.staging/<item-id>/card-02.png`, and so on).
Either way, it needs a direct public URL first.

This host is public, not a private relay: anyone with the exact link can view the file there for
as long as the host keeps it, which on the primary host below is indefinitely, not just the few
minutes Meta's fetch needs. `pack-setup.md`'s promise-3 note discloses this to the owner before
the first upload ever happens, and names the way around it: hand this skill a URL already hosted
somewhere the owner controls, and this step uploads nothing to catbox.moe or 0x0.st for that file.

**Primary host: catbox.moe.** Free, no signup, no API key, permanent (no expiry), direct file
links (`https://files.catbox.moe/<id>.<ext>`), 200MB cap.

```bash
curl -s -F "reqtype=fileupload" -F "fileToUpload=@/absolute/path/to/creative.png" https://catbox.moe/user/api.php
```

Success returns the plain-text URL as the entire response body (e.g.
`https://files.catbox.moe/abc123.png`). A response that doesn't start with `https://` is a
failure (usually `ERROR ...` or an HTML page): check before treating it as a URL.

**Fallback host: 0x0.st.** Same no-signup anonymous model, direct raw links, per-file expiry
scaled to size (small ad images comfortably outlast the minutes needed for Meta to fetch them).
Use this if catbox is down, rejects the file, or its response doesn't parse as a URL. 0x0.st asks
callers to identify themselves via `User-Agent`; a generic browser UA gets rate-limited harder
than an honest one:

```bash
curl -s -A "ads-meta-publish (Meta Ads Pack)" -F "file=@/absolute/path/to/creative.png" https://0x0.st
```

Same parsing rule. If BOTH hosts fail: stop and report that ad. Don't invent a URL, don't skip
it silently, don't stand up a customer-run web server (out of scope: this pack assumes nothing
beyond Chrome and ffmpeg). Video files use the identical commands on both hosts, just point `-F`
at the `.mp4`.

## Upload to Meta

**Image:** `ads_creative_upload_image(ad_account_id, image_url=<hosted URL>)` returns
`image_hash`. Meta dedupes by content hash, so re-uploading the same file twice is a no-op, a
small free idempotency backstop on top of the item's own `meta_ad_id` check.

**Video:** `ads_creative_upload_video(ad_account_id, video_url=<hosted URL>)` returns
`video_id` immediately with `video_status: "processing"`. Poll `ads_get_ad_videos(video_ids=[...])`
every 5-10 seconds until `status` reads `ready`, capped at ~2 minutes. If it's still processing
past that, report and skip rather than hang the run. Video ads also need a thumbnail
`image_hash`; if `ads_get_ad_videos` doesn't hand you one, render/upload a still frame through
the image path above and use that hash.

Tip: unsure whether a field name or enum value is still valid on this MCP build?
`ads_get_field_context(["field_name"])` confirms it before you build the call, cheaper than a
failed write.

## Build the creative

```
ads_create_creative(
  ad_account_id=<ad_account_id>,
  name="<ad_code> creative",
  object_story_spec={
    "page_id": <page_id>,
    "instagram_user_id": <instagram_user_id>,   # from ads_get_ig_accounts; omit entirely if none, FB-only then
    "link_data": {
      "link": "<landing URL with UTM, see below>",
      "message": "<primary_text>",
      "name": "<ad_headline>",
      "description": "<link_description>",
      "image_hash": "<from the upload step>",
      "call_to_action": {"type": "<cta>", "value": {"link": "<same UTM URL>"}}
    }
  }
)
```

Capture the returned `creative_id`. If this call ever fails with `error_subcode 3858504`
("standard enhancements no longer supported"), the payload is missing
`degrees_of_freedom_spec`. Add `{"creative_features_spec": {"standard_enhancements":
{"enroll_status": "OPT_OUT"}}}` at the top level of the create call and retry once.

## Create the ad

```
ads_create_ad(
  ad_account_id=<ad_account_id>,
  ad_set_id=<ad_set_id>,
  name="<ad_code>",
  status="PAUSED",
  creative={"creative_id": "<from the previous step>"}
)
```

Capture the returned ad id. This is the whole idempotency mechanism: write it to the item's
`meta_ad_id` field AND `publish_ref` — the publisher standard's shipping-receipt field, same
value, written together — immediately, before moving to the next ad (see § After every create).
Creating the ad is not the same as Meta confirming it exists: read it back before SKILL.md's flow
calls the receipt `prepared` (SKILL.md § 4).

---

## Landmines

| Issue | Apply |
|---|---|
| `image_url` inside `link_data` is rejected by the API. | Always resolve to an `image_hash` from the upload step first. Never pass a raw URL into `link_data`. |
| `tracking_specs` passed as a JSON-encoded string inside `fields` returns an INTERNAL error. | Pass `tracking_specs` as a real JSON array/object value, never a stringified blob. |
| SG in `geo_locations.countries` requires a top-level `regional_regulated_categories: ["SINGAPORE_UNIVERSAL"]`; nesting it inside `geo_locations` is rejected. | Drop SG from the country list and say so in the dry-run summary ("SG excluded: add manually in Ads Manager if wanted"). Don't block the rest of the round over one country. |
| Advantage+ audience (`targeting_automation.advantage_audience = 1`) requires `age_max >= 65`. | Set `age_max: 65` whenever Advantage+ audience is on, even if the brief specified a narrower ceiling. |
| `description` is rejected on `video_data` (image/carousel ads use `description`; video ads use `link_description` for the same slot). | Match the field name to the ad type. Copying one type's field name onto another is the single most common cause of a video-ad create failure. |
| `attribution_spec` can't be changed on an ad set after it's created. | Set it correctly (or leave the account default) at creation time. If it needs to change later, that's a new ad set, not a patch. |
| Creating a new ad set under a CBO (campaign-budget-optimized) campaign while also passing `daily_budget`/`lifetime_budget` on the ad set is rejected; the campaign already owns the budget. | Omit budget fields entirely on the ad set when the parent campaign is CBO. Only set an ad set budget under an ABO campaign. |
| Cloning another ad set's exact targeting by reading it back isn't reliable across every MCP build. | Build targeting fresh from config/brief instead of copying a reference set field-for-field (see § Pick or create the ad set). |

---

## Multiple text variants (`asset_feed_spec`)

If the item carries `primary_text_options` and/or `ad_headline_options` (both lists, both
default empty), Meta can test several body/title pairings instead of shipping one fixed pair.
Take this branch only when at least one list is non-empty; otherwise use the single-text
`link_data` path above, unchanged.

Build the creative's `object_story_spec` as identity-only (`page_id` + `instagram_user_id`, no
`link_data` at all) plus a separate `asset_feed_spec`:

```
object_story_spec: { "page_id": <page_id>, "instagram_user_id": <instagram_user_id> }
asset_feed_spec: {
  "images": [{"hash": "<image_hash>"}],
  "bodies": [{"text": "<primary_text>"}, {"text": "<opt 1>"}, ...],    # cap 5, dedupe exact repeats
  "titles": [{"text": "<ad_headline>"}, {"text": "<opt 1>"}, ...],     # cap 5, dedupe
  "descriptions": [{"text": "<link_description>"}],
  "ad_formats": ["SINGLE_IMAGE"],
  "link_urls": [{"website_url": "<UTM URL>", "display_url": "<bare domain from the item's link>"}],
  "call_to_action_types": ["<cta>"]
}
```

**Probe before trusting this, on the first-ever run and again after any Meta MCP update.**
`asset_feed_spec` support hasn't been round-tripped through every MCP build. This probe creates a
throwaway object in the customer's own account, so it is disclosed and consented like any other
write, never run quietly: name it in SKILL.md § 3's one-screen dry-run before it happens, and run
it only once that same explicit yes has covered it. Once consented, create ONE throwaway PAUSED ad
with this shape, read it back (`ads_get_creatives`), and confirm `bodies` and `titles` came back
with every variant intact, not silently collapsed to one.

- **Passed through?** The MCP path works. Publish the real multi-text ads the same way.
- **Stripped or rejected?** Don't reach for a raw Graph API call to route around it. This build
  doesn't have that escape hatch. Fall back to the single-text `link_data` path using just the
  first `primary_text`/`ad_headline`, note in the report that multi-text isn't available on this
  account or MCP version, and move on.
- Delete the throwaway ad either way, immediately, before doing anything else, and confirm the
  deletion in SKILL.md § 5's final report. It only existed to test passthrough, and it does not
  outlive that test.

## Video and carousel ads

**Video:** `link_data` becomes `video_data`. Use `video_id` plus a thumbnail `image_hash`,
`title` (not `name`), `message`, and **`link_description`** instead of `description` (see
landmines). `call_to_action.value` needs both `link` and `link_caption`.

**Carousel:** `link_data.child_attachments[]`, one object per card, each card's `image_hash`
coming from that card's own staged copy (SKILL.md § 4, step 3), in the same order as the item's
`sealed:` list: `image_hash`, `link` (per-slide, append `-s{N}` to the UTM `utm_content`), `name`
(slide headline), `description` (slide subhead), `call_to_action: {"type": "..."}` (no `value` at
the child level). Top-level `link_data` still carries `link`, `message`, `caption`; top-level
`name`/`description` aren't used on carousels since each card carries its own.

## UTM tags

Build the link from the item's own `link` field, its verified destination, not automatically
config's `landing_page_url`, since one ad in a round can legitimately point somewhere more
specific than the account default:

```
<item's link>?utm_source=facebook&utm_medium=paid&utm_campaign=<round_slug>&utm_content=<ad_code>
```

No `link` on the item at all: fall back to config's `landing_page_url`. Per-slide on carousels,
append `-s1`, `-s2`, etc. to `utm_content`.

## Apply pixel tracking (optional, only if `pixel_or_dataset_id` is configured)

After the ad set exists, call `ads_update_entity` on it. `fb_pixel` is the API's own field name
(unchanged regardless of what the config file calls the value):

```
fields={
  "tracking_specs": [
    {"action.type": ["offsite_conversion"], "fb_pixel": ["<pixel_or_dataset_id>"]}
  ]
}
```

Pass `tracking_specs` as a real JSON array, never a stringified blob (see landmines). If this
update fails, log it and keep going. The ad still exists and tracking can be patched later; a
tracking-only failure never blocks the ad itself.

## After every create

Capture the returned id (`campaign_id` / `ad_set_id` / `creative_id` / ad id) as you go. The ad
id gets written to the item's `meta_ad_id` field AND `publish_ref` the moment `ads_create_ad`
returns, one ad at a time, not batched for later. That write is the idempotency key the whole
skill depends on — but it only earns the `approved -> published` move once SKILL.md's read-back
confirms the ad and the rest of the shipping receipt is complete (SKILL.md § 4). If a create call
fails partway through a round, the ads that already finished that receipt stay published; the
rest — including any that got a `meta_ad_id` but never finished verification — stay `approved`
with whatever honest receipt state they reached (`prepared`, `blocked`, or `needs-verification`),
and the run reports exactly which ones and why.
