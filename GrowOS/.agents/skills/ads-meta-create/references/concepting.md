# Concepting: over-generate, then cull

The heart of the skill. Meta's ranking systems retrieve and cluster near-duplicate creatives as one
entity and throttle it, so sameness is punished mechanically. Genuinely distinct concepts, each
with a different visual world and a different reason to believe, each earn their own shot at
delivery. A round built from a single generation pass and a closed menu tends to converge on the
same shape by default. The fix is to over-generate from multiple, deliberately narrow angles so
diversity comes from construction, not luck, then run a disciplined cut.

A "different" concept changes the visual world and the underlying message, not just the copy. Two
ads that say the same thing with a new headline are one entity to the ranking system. Two ads with
a different angle family, a different build, and a different feeling are two entities.

**Default pool: roughly twice the funded round size**, then keep the round-size number from
`references/operating-model.md`. The multiple scales with the round rather than sitting at a fixed
count: a 4-ad round generates about 8 concepts, a 12-ad round about 24. Two passes cut the pool, not
four. A pool that size still gives every stance room to lose an idea, and the culls below are what
protect diversity, not sheer volume. A deep round restores the wider pool and the longer cull; see
"The deep path" at the end of this file.

## The concept schema

Every concept, from every stance, fills this out:

```
- one_line: <the concept in one sentence a human could picture>
- persona: <the audience segment this targets, named from the workspace's own audience file>
- awareness: <unaware | problem | solution | product | most>
- angle_family: <the promise category, for example speed, proof, transformation, ease, contrarian,
  pain-moment, authority, curiosity, mechanism, value, movement, or niche-fit; keep this list open,
  do not force a concept into the nearest label>
- method: <the closest lens from references/strategy-methods.md>
- format_build: <template:<id> | custom-html:<name> | ai-image | video-script>
- world: <2-4 words: the visual world, scene, surface, or composition>
- hook: <the opening line or, for video, the Qualifier / Main / Twist beats>
- lane: <signal | adjacent | explore>
- lever_changed: <the one big lever this moves versus recent history: angle, desire, awareness,
  sophistication, or persona>
- proof: <proof id, documented authority, or none>
```

`world` drives the near-duplicate check and the never-shipped quota below; two concepts sharing a
world are one entity even with different copy. `lane` is judged against this account's own history,
not the market in general: a shape only earns `signal` when `brain/ads/dna-log.md` or the latest
report shows this account was rewarded for it. A signal-lane concept reuses only the proven
promise. Its world, build, and hook device must all be new versus the ads that proved it. A true
re-skin (same world, template, or hook device as the proof) does not qualify as signal and is not
exempt from any diversity rule below.

## The five stances

Give each stance the loaded context: the offer profile, VOC entries, a dna-log summary, taste
hard rules, the banked research the round drew on, the audience file(s),
`references/strategy-methods.md`, and this schema. Each stance returns several structured concepts.
Run them as parallel passes (subagents where the host supports them, sequential otherwise). The
point is that each pass is deliberately narrow, and the diversity comes from combining narrow views
rather than asking one generalist for variety. All five stances run on every round, deep or not; the
pool size is what changes, never the number of viewpoints.

**Real-buyer-language literalist.** Build every hook from real market language: `brain/ads/voc.md`
entries, trigger events, past-tense "I" statements, objections, identity phrases. The hook should
read like a line the buyer has basically already said to themselves. No marketer-speak, no
invented scenarios. If no VOC file exists yet, pull language directly from the audience file and
any documented reviews or support notes instead.

**Method-lens player.** Work the method menu in `references/strategy-methods.md`, one method per
concept, never repeating a method inside this stance's own output. When `references/archetypes.md`
exists in this skill's references folder, give one concept an archetype lens as a wildcard instead
of a method lens. See "Using archetypes.md" below for what that file should contain.

**Fresh-signal translator.** Turn the newest signal on file into concepts, naming which finding each
one rides: the most recently dated entries in `brain/ads/angles.md`, the latest doctor or report
observation, and on a deep round whatever `ads-meta-research` just refreshed. The job is
translation, not copying: never lift a competitor's claim, proof, or number as your own. If nothing
on file is genuinely new, use the offer's angle territories and VOC instead, and say so in the
concept notes.

**Coverage-gap hunter.** Read `brain/ads/dna-log.md` for angle families, personas, awareness
stages, and builds that are thin or missing. Take bold-but-honest big swings; every concept must
move at least one big lever versus recent history (state it in `lever_changed`). Bold means a real
point of view, never a fabricated claim or a fake scarcity play. Expect a higher kill rate from this
stance; that is the cost of finding new territory.

**Form-first.** Ideate from the visual form, not the message: pick a form off the production menu
in `references/creative-system.md` first, then find the message it serves. This is the direct
antidote to every concept defaulting to the safest, cheapest execution (a template, or a plain
statement card). Expect strong, unusual visuals from this stance; a novel form with a weak message
still earns a spot in the pool for the cull to judge honestly.

### Using `references/archetypes.md`

This skill's references folder may ship an `archetypes.md` file: a small catalog of named,
originally-written idea-generation lenses (not method lenses, but sharper, more structural patterns
like "show the mechanism nobody else shows" or "invert the expected before-state"). If present,
each entry gives a name, the situation it wins in, its beat structure, one worked example, and its
main pitfall. Treat it as an additional stimulus for the method-lens player stance, never as a
requirement; a round with no archetype file simply runs on the method menu alone.

## Cull pass 1: similarity and beat cooldown

One pass over the whole pool: the pairwise similarity check and the beat cooldown together, since
both are read against the same two things (the rest of the pool and `brain/ads/dna-log.md`) and
neither needs the other's result first.

Judge each concept against `brain/ads/dna-log.md` and against every other concept still in the
pool. There is no embedding model behind this, so use this explicit checklist. Two concepts are
"too similar," so kill the weaker one, when they match on **3 or more** of these axes:

1. same `angle_family`
2. same `persona`
3. same promise shape (the core thing promised: a deliverable, a feeling, a number, an identity)
4. same method or structural archetype
5. same hook device (pain-scene, quote, named-output, contrarian, question, mini-story, stat,
   callout)
6. same headline shape (the first few words rhyme in structure) or the same on-image line
7. same `world`

Also kill outright anything a tired, skeptical reader would call a re-skin of a recently shipped
ad; scan dna-log rows from roughly the last 30 days for this. Keep the version with the stronger
hook and the clearer one-second read; drop the other. Do not force-fill the vacated slot; fewer,
stronger concepts beat a padded pool.

**Beat cooldown, a hard kill, not a similarity score.** A "beat" is a world plus scene plus hook
combination. Default: any beat that appears 2 or more times in `brain/ads/dna-log.md` within the
last 60 days, under any verdict, published or not, is banned from this round. A beat the reviewer
has explicitly flagged as overused is dead immediately and permanently, regardless of how well it
performed. Reviewer fatigue outranks market data here, because a queue that keeps rhyming is
itself the failure, and a proven-but-seen beat cannot fix that. The 60-day window and the count
threshold are defaults; a workspace may tighten or loosen them in `brain/ads/config.md`.

## Cull pass 2: taste gate, then quota selection

The second and last pass over the survivors: apply the taste gate, then select the round against
the quotas, in that order, in one sitting. The taste gate decides what is allowed to survive; the
quota selection decides which survivors make the round.

### Taste gate

Apply `brain/ads/taste-profile.md`. Its Hard rules are pass/fail and travel with every workspace by
default (never synthesize a non-founder likeness, no fabricated data, AI imagery only at the two
poles from `references/creative-system.md`, documented proof only). Its Rejects section holds
patterns this specific business has learned to avoid, each with a cited example.

The gate is **build-class-blind**: a kill must cite a specific execution pattern from
`taste-profile.md`, never the build class itself. "AI imagery is risky" or "custom-html is
unproven" is not a valid kill reason; the quotas below deliberately demand volume from every build
class, and a taste gate that quietly re-imposes a build bias defeats that on purpose. Fix the
concept if the underlying angle is good and only the execution offends; otherwise kill it and record
which rule fired.

### Select with quotas

Choose the round-size set from the survivors, honoring all of the following. Every ratio below is a
sensible default for the first few rounds; once `brain/ads/dna-log.md` has real history, treat these
as the floor and cap to keep, and record any override in `brain/ads/config.md` with a reason:

- **build mix**, expressed per 10 image-format slots and scaled to the round's actual size: at most
  3 template builds, at least 4 custom-html builds, at least 3 AI-image builds (when the AI-image
  capability preflight in `references/creative-system.md` passes)
- **no template id used twice** in one round; a template id used in either of the last 2 rounds is
  on cooldown
- **no visual `world` repeats** within the round
- **at least 60% of image ads are never-shipped**: the build x world x angle combination is absent
  from `brain/ads/dna-log.md`. The signal lane is exempt from this specific quota, but not from the
  world-repeat rule above.
- **signal:explore split** follows the posture in `references/strategy-methods.md` (lean explore
  with no winners yet, roughly half-and-half once winners exist)
- **at least 4 angle families**, **at least 2 personas** when the workspace has more than one
  documented, **at least 2 awareness stages**
- **the video-script share** from Phase 0 intake

**Cold start.** When `brain/ads/dna-log.md` has fewer than roughly 10 rows for this offer, the
never-shipped and beat-cooldown checks have nothing to compare against. Relax the quota system to
format and build diversity only, and say so explicitly in `_selection.md` rather than silently
skipping a check the file format still lists.

If a quota cannot be met from the surviving concepts, say so in `_selection.md` and either promote
the strongest near-miss or ship a smaller round. Never fabricate a concept to fill a quota. The pass
1 beat cooldown overrides every quota here: never satisfy a floor with a banned beat.

**Every produced ad is shown.** This whole cull happens before anything renders. Once a concept is
selected and actually produced into a finished creative, it goes to the round for review; nothing
finished is ever discarded silently after the fact. If a rendered asset genuinely fails the
final-pixel gate in `references/creative-system.md`, that failure and the kill reason belong in the
handoff report, not a quiet deletion.

## The buyer-panel pass (optional)

Optional, and unchanged by the merge above. It sits between the taste gate and the quota selection
either way: inside pass 2 on a default round, as its own stage 3 on a deep one. Skip it when the
round has no room for it. Run a small number of skeptical-persona
passes drawn from the workspace's own audience file. Each pass reads the surviving concepts as a
tired buyer looking for reasons not to click, and votes buy or bounce with a one-line reason.
Compare votes **within a build class**, never across classes, so a familiar template cannot
out-score a fresh concept purely on format familiarity. This is advisory only: it surfaces friction
to fix before production, and it never auto-cuts a concept.

## The deep path

A deep round (`research_mode: deep` in `brain/ads/config.md`, or the owner asked for one; see
"Drawing from the brain" in `references/operating-model.md`) trades time for coverage and restores
the wider shape:

- **Over-generate roughly three times the funded round size**, same five stances, same schema. The
  extra third exists to be thrown away: it buys the coverage-gap hunter and the form-first stance
  room for swings that a 2x pool cannot afford to lose.
- **Run the cull as four separate stages, in this order**, each a full pass over what survived the
  one before it: (1) the memory check, pairwise similarity plus the beat cooldown; (2) the taste
  gate; (3) the buyer-panel pass, still advisory and still never auto-cutting; (4) the quota
  selection. Every rule in each stage is the one written above; only the passes are split apart, so
  each judgment gets the whole pool in front of it rather than sharing a pass.
- Record the kill stage as `stage 1` through `stage 4` in `_concepts.md`, and say in `_selection.md`
  that this was a deep round, so the audit trail matches what actually happened.

## Files to write

Both files are underscore-prefixed so they carry no `status` and stay out of any review queue.

**`_concepts.md`**: the full pool, for the audit trail.

```markdown
# Concepts pool (<round-slug>): <N> generated

| id | one_line | persona | angle_family | method | build | world | never-shipped | lane | lever_changed | panel | verdict |
|----|----------|---------|--------------|--------|-------|-------|----------------|------|----------------|-------|---------|
```

List every generated concept. For a cut, give the one-line kill reason and which pass produced it
(for example `pass 1: re-skin of <ad_code>`, `pass 2: uncanny-middle AI`, `pass 2: quota not met, no
near-miss`). On a deep round, name the stage instead (`stage 1` through `stage 4`).

**`_selection.md`**: the chosen set and the reasoning.

```markdown
# Selection (<round-slug>): <round-size> of <N>

- Signal / adjacent / explore split: <counts>
- Build mix (per 10 image slots): template <n> / custom-html <n> / ai-image <n>. Template ids
  used: <list, no repeats, none on cooldown>
- Never-shipped: <k of m image ads = XX%> (target >= 60%, or "relaxed: cold start" with why)
- Angle families: <list> · Personas: <list> · Awareness stages: <list> · Video scripts: <n>

| ad_code | concept id | build | world | persona | lane | never-shipped | why chosen |
|---|---|---|---|---|---|---|---|

## Quota notes, near-misses, and anything that could not be met
## Panel fixes to apply during production
```

The `ad_code` assignment happens here so production and the dna-log append agree with each other.
