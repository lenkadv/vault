# Creative check

Read by `../SKILL.md` § Process step 2. This is the pixel half of the compliance gate. It exists
because of a hard, repeatedly-proven fact: **the copy can be perfectly clean and the ad still gets
rejected, because Meta reviews the finished creative, not the brief that produced it.** A star rating,
a "verified" badge, or a fake notification burned into a template is invisible to any check that only
reads text: it never appears in the hook, the primary text, or the headline. Rejections come from
pixels. A text-only compliance gate is structurally blind to the thing that actually gets ads pulled.

`references/meta-policy.md` says as much itself: its own scope note states plainly that it "does not
see the rendered image, the video, or the live landing page," and its "What cannot be checked from
text alone" section names pinched-fat framing, fake interface elements, strobing, safe-zone text
placement, nudity, and Meta brand misuse as exactly the rules only a pixel check can close. Their
tier and their `Test:` condition still come from the rulebook; this file is where the second half,
actually looking at the render, happens. The severity table below carries all of them alongside the
checks this file already ran.

Two layers. Layer 1 is a cheap triage before you spend a render. Layer 2 is the one that actually
closes the check: never skip it, and never let Layer 1 stand in for it.

## Layer 1: pre-render source scan (free, not a gate)

Run this on the template HTML or the AI-image prompt text before you render, whenever a template is
going to be reused across ads. AI photo generation with no fixed source (a fresh prompt each time)
has nothing to scan here; send it straight to Layer 2 once it renders.

```bash
rg -n '★|⭐|&#9733;|class="stars"|out of 5|[0-9][.,][0-9]\s*/\s*5|Verified|class="tick"|class="verified"' <template-or-prompt-file>
```

**A hit is a prompt to look, not an auto-fail.** This grep pattern is a triage tool, not a verdict.
It produces false positives (a checkmark used as a plain bullet point matches `class="tick"` without
being anywhere near a verification badge) and it produces false negatives (fake notification chrome,
fake platform UI, and a play-button overlay on a still image carry no stars and no badge text at all,
so this pattern won't catch them). Every hit gets judged against the Layer 2 banned list below before
you decide anything. Never treat a clean grep result as a clean creative: it only means nothing
*obvious* showed up in the markup; Layer 2 is still mandatory.

### One-time library audit

If you're going to reuse a template library across many ads, don't re-run this grep cold every single
time and re-litigate the same template from scratch. Run it once across the whole library, actually
look at every hit (both the true and false positives), and record what you found: template name,
what it ships, and the verdict for ads specifically (a template can be fine for organic and still
banned for paid), in a durable note in your ads memory (`taste-profile.md` or equivalent). From then
on, a new ad pulling from an already-audited template can skip straight to confirming the render
matches the audited version, instead of re-deriving the verdict. Re-run the audit whenever the
library changes or a template gets edited.

## Layer 2: post-render vision pass (mandatory)

Actually look at the rendered file. Not the prompt, not the template source, not the payload sent to
the renderer, the pixels that will ship. Every creative, every time, before it reaches a reviewer or
a publish call. This is the step that catches what Layer 1 structurally can't.

### Images

Open the rendered PNG/JPG and check it against the severity table below.

### Video and animation

Check the **thumbnail** (it usually becomes the creative's still image in the ad unit) plus sampled
frames across the video: a violation baked into an end card is invisible to a thumbnail-only check.

```bash
V=<video-file>
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V")
for p in 0.02 0.25 0.50 0.75 0.98; do
  ffmpeg -loglevel error -ss "$(echo "$DUR * $p" | bc -l)" -i "$V" -frames:v 1 -q:v 3 "frame-$p.jpg" -y
done
```

Look at all five frames against the table below. Weight the **last frame** (0.98) heaviest: end
cards are where ratings, badges, and CTAs tend to live, because they're the frame designed to hold
the viewer's eye the longest.

## Severity table

Maps directly onto the result enum in `../SKILL.md`. This is deliberately the *only* severity
system in this skill. Don't layer a second HIGH/MEDIUM/LOW scale on top of it; the enum already
carries the priority information a separate scale would duplicate.

| What's on the pixels | Examples | Result |
|---|---|---|
| Simulated rating | Star rows, "5.0 out of 5", "4.9/5", a numeric score badge not tied to a real, linkable review platform | `fail`, block |
| Fake verification / trust seal | "Verified customer" pill, checkmark tick used as a seal, a shield icon, "Certified" badge | `fail`, block |
| Platform-logo imitation and Meta brand misuse | Fake FB/IG notification chrome, fake like/comment UI, a play-button overlay on a still, any Meta/FB/IG logo at all, or the Meta/Facebook/Instagram wordmark recolored, restyled, animated, or made the dominant element of on-image text (logo and mark misuse is a platform-policy violation on its own, not just a trust-signal problem) | `fail`, block |
| Fake interface elements | A fake checkbox, fake progress bar, fake close X, fake video scrubber, or a drawn-on cursor or tap indicator implying functionality the ad doesn't have (no Meta branding needed for this one; see the row above for the branded case) | `fail`, block |
| Pinched or altered body imagery | A close-up crop with fat pinched, grabbed, or squeezed, or an isolated "problem area" body shot, in a weight-loss or weight-gain creative | `fail`, block |
| Nudity or sexual activity in imagery | Nudity, or an explicit or sexually suggestive position or activity. Swimwear, lingerie, and undergarments shown as fashion or product content are not a violation on their own; see "What's fine at the normal bar" below | `fail`, block |
| On-image viewer-behavior claim | Text on the image asserting the viewer's own behavior or state ("you've been putting this off", "you're stuck at 10%") | `fail`, block |
| Outcome + timeframe pairing | "3 hrs to 90 min", "doubled in 2 months", an earnings or analytics screenshot presented as a typical result | `fail`, block |
| Before/after split | A visual split or sequence implying transformation, without the disclosure and typicality context from `copy-policy.md` § Before/after checklist | `fail`, block |
| Strobing or flashing (video only) | Hard strobing, rapid full-frame color inversion, or a simulated screen glitch used to stop the scroll. Watch actual playback for this one; the five sampled frames above can land between flashes and miss it | `fail`, block |
| A testimonial card whose quote itself states an outcome | "This solved it completely" as the quoted line, with no other trust-signal furniture | `pass-with-note`: real testimonials are legal; flag it so the reviewer sees the outcome-in-quote pattern and can judge whether it needs a disclaimer |
| Text or logo outside the safe zone | Key text or a logo sitting in the crop-risk margins: top, bottom, or side edges on 9:16; bottom or side edges on non-9:16 Feed; the bottom 40% of a Reels placement that needs a disclaimer | `pass-with-note`: this is `references/meta-policy.md` M56, tier `best-practice`. Advise on moving it inside the safe zone; never block on it, and never on text density or a percentage-of-image rule, that threshold is retired |
| Unsubstantiated competitor pricing in the visual | A dollar figure attributed to "an agency" or "a competitor" with no source | `pass-with-note`, or `fail` if the claim ledger has no source at all |
| A regulated-category visual claim that can't be quickly verified | A health, finance, or legal visual claim where the current rule is genuinely unclear | `needs-specialist-review` |
| Clean: real testimonial (no badge, no stars, no number), real product screenshots, real founder photo, accurate pricing/guarantee shown as-is | none of the above | `pass` |

## What's fine at the normal bar

Don't over-flag these; they're exactly the kind of thing a maximum-safe gate wrongly strips, per
`../SKILL.md` § Bar:

- A real, attributed testimonial quote about how the product feels or works, no badge, no stars, no
  fabricated number attached to it.
- The founder's or business owner's real photo. Real product or dashboard screenshots.
- The real price and the real terms of a real guarantee, shown accurately.
- A checkmark used as a plain bullet point in a feature list, nowhere near a verification claim.
- Stars rendered as part of an obviously fictional UI mockup (a demo screen, not a claim about the
  advertiser's own rating): judge the fake-UI angle on its own merits before flagging.
- Swimwear, lingerie, or undergarments shown as fashion or product content, not sexually suggestive
  activity or positioning.
- A high ratio of text to image alone, with nothing actually sitting in the safe-zone margins. There
  is no text-percentage threshold to fail on; that rule is retired.
- A fitness or training photo with normal muscle definition or midsection visible. Only a close-up
  crop that isolates and pinches or grabs a "problem area" in a weight-loss or weight-gain context is
  the violation, not exercise imagery generally.

## Report requirement

Every compliance report that includes a creative names the exact file inspected (the PNG path, or the
frame files for video) and states plainly whether Layer 2 ran. Per `../SKILL.md`: if Layer 2 didn't
run on a creative that exists, the result cannot be `pass` or `pass-with-note`. An uninspected
creative is unchecked, not compliant, no matter how clean the copy is.
