# Craft - the taste law

The rules that decide whether an animation gets built at all, and how long
it runs once it does. Read this at Step 2 of `SKILL.md`, before touching a
template - taste decisions are cheap on paper and expensive once rendered.

## Concrete over abstract

This is the one rule every other rule in this file serves. Given a real
library of 175 rendered, approved compositions to draw from, the owner
rejected every single one of the 20 abstract, non-representational art
loops in it outright - marble veins, phyllotaxis blooms, murmuration
particle fields, ferrofluid, god rays. The verdict, in his own words:
"abstract art loops do not earn their place; concrete explainer shots do."

Generalize that as the shipped rule, not a one-time preference: build the
thing that shows a real step, a real number, a real word - a 3-step flow, a
stat counting up to a verified figure, a keyword landing on the beat it
supports. Never a generative texture, a particle field, or a shader loop
that looks impressive but is not actually about anything. When a job asks
for "something in the background" with no message behind it, that is the
signal to say so and recommend zero animations, not to reach for
`broll-accent.html` as a default.

## An animation earns its place, or it does not get built

Every animation in a job must carry one specific message beat - a claim, a
step, a number, a name - not decorate a cut that is already working without
it. Before building anything, Step 2 of `SKILL.md` states the beat each
animation carries in one sentence. If that sentence would just be "makes it
look nicer," that animation does not get built.

**Zero animations is a valid recommendation.** Say so plainly when nothing
on the ask actually earns its place - this is not a failure to produce
something, it is the taste law working as intended.

## Duration bounds

| Type | Bound |
|---|---|
| Single accent (one keyword pop, one stat pill) | 3 seconds or under |
| Overlay sequence / lower-third (the text-overlay template) | 6 seconds or under |
| Diagram / stat callout | 10 seconds or under |
| B-roll accent loop | 6-8 seconds, seamless |
| Transition | 1 second or under |

The shipped `text-overlay.html` is the worked example of the split: the
SEQUENCE runs 6 seconds (a lower-third holding while two pops land), and
each individual pop inside it still honors the 3-second single-accent
bound.

A longer duration is not a more impressive animation - it is more time for
the eye to notice the loop, the timing, or the copy is wrong. Run against
the low end of the bound whenever the message beat still lands.

## Safe zones and minimum text sizes

| Element | Landscape (16:9) | Vertical (9:16) | Square (1:1) |
|---|---|---|---|
| Keyword pop (display - 1-3 words alone) | 72-96px | 110-140px | 90-110px |
| Headings | 48-72px | 64-80px | 56-72px |
| Body | 28-36px | 38-50px | 32-42px |
| Labels | 20-24px | 28-36px | 24-30px |

A keyword pop is display type, glanced at rather than read in context, so
it legitimately runs bigger than any heading - the shipped template's 132px
vertical pop sits inside this band. Everything else on the canvas stays in
its own row's range.

Vertical (1080x1920) carries the tightest constraint: keep everything the
viewer actually needs above y=1632 (the bottom ~15% is where platform UI -
captions, the like/share rail - sits on top of the video). Keep content
below y=96 (the top ~5%) too, clear of notch/status-bar overlap on a phone
screen. Landscape and square have more room but the same instinct applies -
nothing load-bearing crammed into the outer edge.

## Formats

Three standard sizes: 1920x1080 (landscape), 1080x1920 (vertical),
1080x1080 (square). When an animation composites into an existing
`video-edit` cut, match that cut's format exactly rather than picking one -
a mismatched aspect ratio is a compositing problem this skill should never
hand `video-edit`, or the owner, to solve after the fact.
