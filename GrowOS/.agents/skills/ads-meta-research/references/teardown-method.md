# Teardown method

How to turn a pile of `ads_library_search` results into a teardown that actually tells you
something. Read this when mode 1 (competitor teardown) starts.

## Why running duration works as a signal

Nobody has to see a competitor's dashboard to know roughly how an ad is doing. Pausing a losing ad
costs nothing and takes one click; leaving a losing ad running costs real money every single day it
stays up. An advertiser who lets an ad run for weeks is, in effect, voting with cash that it's
working well enough to keep paying for. That's the whole mechanism: duration is a cheap, indirect
proxy for "this is probably profitable," available without ever seeing their numbers.

Use the Ad Library's start date (and, when the tool surfaces it, an "active since" or duration
figure) as your primary strength ranking. The ad that's been live the longest across your search
pull is your best candidate for "figure out what this is doing right."

## Where the signal lies

Longevity is directional, not proof. Watch for these specific ways it misleads:

- **Evergreen trickle spend.** A retargeting ad or brand-safety ad can sit at a tiny daily budget
  for months regardless of how well it converts. Duration alone can't tell you the budget behind it;
  a long-running ad with an obviously generic, low-effort creative is more likely trickle spend than
  a proven winner.
- **Deep-pocketed brand plays.** A well-funded competitor can afford to run a structurally weak ad
  for image or awareness reasons, at a loss, indefinitely. Don't assume budget size out of a page's
  ad count; use it as a caveat when the advertiser is clearly a bigger player.
- **Variant inflation.** Five ads that share the same hook, offer, and structure with only a color or
  crop changed are one concept, not five winners. Group by concept before you count how many "long
  runners" a competitor has. Counting raw ad IDs overstates how much is actually working.
- **New-launch penalty.** A newly launched ad is short-running by definition, even if it becomes a
  long-term winner next month. Don't read "short" as "bad" on its own; only read "short AND already
  stopped" as a real negative signal.
- **Start-date drift across countries and placements.** The same underlying concept can show
  different start dates in different country/placement pulls. Check more than one country filter
  before concluding a concept is new.
- **No spend or result numbers, ever.** The Ad Library shows presence and a start date, not spend or
  conversions. Write findings as "likely working" or "worth studying," never as "this converts at
  X" or any invented number.

## Reading the format mix

Across the pull for one competitor, tally format (single image, single video, carousel), production
style (polished/produced vs. UGC-style handheld or talking-head), and, for video, roughly how long
the opening beat runs before the first cut or claim. A competitor leaning hard on one format across
their longest-running ads is telling you what their audience responds to on that platform right now,
more reliably than a single standout ad would.

## Classifying the hook

Read the first line of copy, the first on-screen text, or (for video) the first three seconds, and
place it in one of these buckets:

- **Pain-scene**: opens inside the buyer's frustrating moment, no narration needed to explain it.
- **Quote**: opens with a spoken or written line, real or dramatized, that carries the hook.
- **Named-result**: opens with the specific outcome the offer produces, stated plainly.
- **Contrarian**: opens by contradicting the audience's assumption or the category's convention.
- **Question**: opens by putting a question directly to the reader.
- **Mini-story**: opens partway into a small narrative arc that resolves later in the ad.
- **Stat or callout**: opens with a number, fact, or bold on-screen claim.
- **Comparison**: opens by putting the offer next to an alternative (before/after, us/them, old
  way/new way).
- **Other**: doesn't fit cleanly; describe it in one phrase instead of forcing a bucket.

Tally which buckets dominate the competitor's long-running set. That's the pattern worth naming in
the report, more useful than any single ad's classification on its own.

## Extracting the offer structure

For each ad worth a closer look, note: price anchor visible or not, discount or urgency mechanism
(and whether it looks evergreen or genuinely time-boxed), guarantee language, bundle vs. single item,
lead-magnet-first vs. direct-to-cart, and free trial if any. This tells you how the competitor is
structuring the deal, not just how they're talking about it.

## Extracting the CTA

Note both the literal CTA button (Shop Now, Learn More, Sign Up, Get Offer, etc.) and what the last
line of copy is actually pushing the reader to do, since the two don't always match. A "Learn More"
button paired with copy that reads like a hard close is worth flagging on its own.

## Learning from an angle vs. copying a claim

This is the line that matters most in the whole method. A competitor's exact wording, their specific
numbers, their proof, their promises: none of that is verified true for the business you're doing
this teardown for, and using it anyway is fabrication with someone else's name still on it. It's also
often an IP or compliance risk in its own right.

What you can take is the **angle**: the underlying buyer tension or promise the ad is built around,
and the **structure**: which hook device it uses, which format, how the offer is put together. Name
both explicitly in the "what to steal" section of the report, then rebuild them from this business's
own facts and its own proof. If the business has no proof for the angle you want to borrow, say so
and route it to angle mining (mode 2) or flag it for the business to gather before an ad round uses
it.

## Running the search

- `ads_library_search` needs at least one of `search_terms`, `page_ids`, or `countries`. For a named
  competitor, search their Page name first; fall back to `search_terms` if the Page isn't findable
  directly.
- Filter by the business's own country or countries so you're comparing against the actual market,
  not global noise.
- Use `ad_active_status: ALL`, not just `ACTIVE`. An ad that stopped recently is informative too: a
  competitor pulling a concept fast after launch is a real (negative) data point, and you'd miss it
  entirely on an active-only filter.
- The call returns a limited page of results (up to 50) plus an estimated total. If the estimate says
  there's more, pull additional pages before concluding you've seen the competitor's real pattern
  from a handful of ads.
- Cite every finding to its `snapshot_url`. That link is what makes a teardown checkable instead of
  a guess with a confident tone.
- If a snapshot URL is worth a closer read for format or on-screen text the returned fields don't
  capture, open it directly rather than inferring from text fields alone.

## What this earns in the angle bank

A competitor's ad copy is their marketing, not a buyer's own words, so it never counts as an
`angles.md` evidence quote or a `voc.md` entry on its own, no matter how long it's been running.
What it earns: a dated corroboration note on an angle that already has real buyer evidence behind
it, or a named candidate in the report worth sending to angle mining next. See `angle-bank.md` for
the evidence bar this file's findings have to clear before they become a tracked angle.

## Deliverable shape

Per competitor: format mix, hook pattern, offer structure, CTA pattern, and the 3-5 strongest
(longest-running) ads named individually with their snapshot URL. Across the set: what pattern
repeats across every competitor pulled (worth taking seriously), what's unique to one (worth testing
cautiously), and a "what to steal" list of angles and structures paired with a "what to avoid" list
of patterns that showed up and then disappeared fast.
