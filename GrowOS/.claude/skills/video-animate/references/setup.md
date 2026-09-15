# Setup

What this skill needs, the real cost of getting it, and the one check that
decides whether a job renders or ships as a brief. Read this before the
first job on a new machine.

## 1. Node.js 22 or higher

```bash
node -v
```

Below 22, install from nodejs.org (or nvm/Homebrew, whichever the owner
already uses) and stop there - do not attempt a workaround on an older
Node.

## 2. npx

```bash
npx --version
```

If this is missing, Node itself is not installed correctly - the fix is the
same as §1.

## 3. The real cost - said out loud once per session

`npx hyperframes <command>` looks like it runs from a project folder of a
few KB. It does not. The real weight - about 360-390MB - lands in the npm
cache (`~/.npm/_npx/`), a place the owner has no reason to ever open and
will not associate with "the video tool." The first command that needs a
browser also pulls a one-time Chrome-for-Testing download (historically
150-300MB on a Mac). Both are outside the project folder, both are one-time
per machine rather than per job, and both need the owner's yes before
either starts - say the numbers in one plain paragraph, wait for a go.

## 4. The probe - the only thing that decides render-mode

Local HyperFrames rendering depends on a working match between the CLI's
bundled puppeteer-core and whatever Chrome build is sitting in the shared
`~/.cache/puppeteer` cache. That match can break with no action from the
owner - a previously-reliable machine (hundreds of prior successful
renders) can go to zero working renders overnight, because an unpinned
`npx hyperframes` re-resolves its dependencies on every call and nothing
about that resolution is under the owner's control. A version pin does not
fix this - see §6.

So this skill never assumes a render will work. Before the first real
render of a job, it renders `references/templates/probe.html` - 1 second,
320x180, a single fading dot, the cheapest composition that still exercises
the full render pipeline (browser launch, frame capture, encode). The probe
runs in a throwaway temp project (`mktemp -d`, deleted after) - never
inside the business folder; a tooling check is not work product. Build the
minimal scaffold there (§8), fetch GSAP into its `assets/` (§5), copy
`probe.html` in as `index.html`, and run:

```bash
npx hyperframes render --output probe.mp4
```

**Probe succeeds:** render-mode is open for the rest of this job, this
session. **Probe fails:** brief-mode for the rest of this job. Tell the
owner in one plain line - the renderer cannot finish a render on this
machine right now, this is a known issue in the current release of the
rendering tool and not something they did, today's deliverable is the brief
and the render can run once the tool is fixed. Then bank the exact error
line (not a paraphrase) in the job's report - that line is what turns a
"my video skill doesn't work" complaint into something a support person or
the owner's own follow-up can actually act on.

**Never suggest Docker.** The CLI's own failure message does
(`Try --docker for containerized rendering`) - a non-technical business
owner will not have Docker Desktop installed, installing it is a real
undertaking on its own, and it is not this skill's job to send them down
that road.

## 5. GSAP - vendored once, not a CDN

Every shipped template loads `assets/gsap.min.js` as a local, root-relative
path - never a CDN URL. A composition that reaches out to
`cdn.jsdelivr.net` at render time needs a working network connection at the
exact moment headless Chrome is capturing frames, which is one more thing
that can silently fail a render for a reason that has nothing to do with
the animation itself.

Each project needs `assets/gsap.min.js` in place - the probe's temp
project and each job's own project alike. That is one small (~140KB)
network request per project, disclosed in one line the first time it
happens in a session:

```bash
curl -fsSL "https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js" \
  -o assets/gsap.min.js
```

Within a project, no composition reaches a CDN at render time - reuse the
job's one project across all its animations rather than re-fetching. That is
a GSAP claim, not a whole-render claim: `npx hyperframes` still re-resolves
the CLI on every call (§7), so the render command itself is not offline.

## 6. Why there is no version pin

It would be simpler to pin `hyperframes@<version>` on every command and
call it done. That was tested directly, not assumed: the exact CLI version
this skill's build machine used for its 750 prior successful renders,
paired with its own exact previously-working puppeteer-core dependency,
still fails today with the identical error. The regression lives in a
browser-build/puppeteer-core interaction, not in the HyperFrames version
number - so a pin would not have prevented it, and would actively make
things worse afterward by freezing the CLI on a version that can never pick
up whatever fix eventually ships upstream. Unpinned `npx hyperframes` -
re-resolving fresh on every call - is the position that self-heals the
moment the upstream fix lands. Keep the command surface minimal either way:
`lint`, `render`, `--help`. Nothing else.

Two of HyperFrames' own browser-path overrides
(`PRODUCER_HEADLESS_SHELL_PATH`, `HYPERFRAMES_BROWSER_PATH` - not the
standard `PUPPETEER_EXECUTABLE_PATH`, which HyperFrames silently ignores)
were also tested directly against a known-good cached Chrome build, as a
possible recovery lever, before this was settled. The override genuinely
works - it does steer which Chrome build launches, confirmed in the render
log - but the render still fails with the identical error on that build
too. So this is not a fix and is not offered as one anywhere in this
skill; it is recorded here only so a future session does not spend another
timebox rediscovering the same dead end. There is also no `hyperframes.json`
project-level key for this: the project config schema carries only
`$schema`, `registry`, `paths`, and `media.autoProxy` - nothing
browser-related.

## 7. Why `hyperframes init` never runs

`init` does not just scaffold the new project folder it is pointed at - it
also reaches the network unconditionally and overwrites skill packages
under `~/.claude/skills/`, `~/.agents/skills/`, and other agent-tool
directories on the whole machine, every time it runs, with no working
opt-out flag. A command that looks like "scaffold my video project" would
silently rewrite global configuration the owner never agreed to touch. This
skill ships its own scaffold in `references/templates/` and copies from
that instead - `init` is never invoked, by this skill, for any reason.

## 8. The project scaffold - by hand, never `init`

A render needs a project folder, and `init` never runs (§7). The whole
scaffold is four pieces, built by hand:

```
<project>/
  hyperframes.json       the file below, verbatim
  index.html             the composition to render (a template, filled in)
  compositions/          any further compositions in the same job
  assets/gsap.min.js     vendored per §5
```

`hyperframes.json`, verbatim - this exact minimal file passed lint, check,
and render invocation on the build machine:

```json
{
  "$schema": "https://hyperframes.heygen.com/schema/hyperframes.json",
  "registry": "https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry",
  "paths": {
    "blocks": "compositions",
    "components": "compositions/components",
    "assets": "assets"
  },
  "media": {
    "autoProxy": true
  }
}
```

Where a project lives: a JOB's project is `work/video/_<slug>/anim/` inside
the business - parts space, so nothing in it is ever a work item, and it
survives for re-renders. The PROBE's project is the throwaway temp folder
from §4, deleted after the probe - never inside the business folder.

One behavior worth knowing: `lint` scans every composition in the project
in one pass, but `render` and `check` read only the project's `index.html`
entry point. To verify or render a composition sitting in `compositions/`,
pass it explicitly (`render -c compositions/<file>.html`) or rotate it into
the `index.html` slot.

Two terms the templates rely on, defined here so nothing outside this
skill is ever needed: a **root-relative asset path** is relative to the
project folder root, where `hyperframes.json` sits - `assets/gsap.min.js`,
never a `../` path. **Brand tokens** are declared in each template's
`data-composition-variables` attribute on the `<html>` element (`accent`
and `font`, each with a neutral `default`); the framework injects them as
CSS custom properties, and the styles consume `var(--accent)` /
`var(--font)`. Apply the business's `brain/brand.md` values by editing the
two `default` values in that attribute - never by touching the composition
body's styles.

## 9. Pre-flight check

```bash
node -v | grep -qE 'v(2[2-9]|[3-9][0-9])' && echo "node: OK" || echo "node: TOO OLD - needs 22+"
npx --version >/dev/null 2>&1 && echo "npx: OK" || echo "npx: MISSING"
command -v ffmpeg >/dev/null 2>&1 && echo "ffmpeg: OK (compositing available)" || echo "ffmpeg: MISSING (compositing degrades to hand-off instructions)"
```

Node or npx missing: stop and say so plainly - there is no workaround to
offer. ffmpeg missing: compositing degrades (`SKILL.md` Step 6), but the
animation itself still renders, or briefs, normally either way.
