# Playbook: readability

Make it effortless to read without sanding the person off. Run inside the SKILL.md
method.

## The number is computed, never guessed

The reading grade comes from the scorer (`--json`, the `readability` block). Never
estimate a grade by feel; the tool does the math. Channel ceilings:

- Sales or direct-response copy: about grade 5-6.
- Landing or home page: about grade 6.
- Articles and interior pages: about grade 8.

Pass `--channel sales|landing|article` so the report shows the right ceiling.

## Two dials (the whole judgment of this playbook)

- **Grade is a ceiling.** Above the band: shorten sentences, swap fancy words for
  plain ones, cut clauses.
- **Voice is a floor.** If a simplification made the copy choppy, babyish, or
  stripped the owner's personality, it went too far. Revert that edit. A grade-6
  line that no longer sounds like anyone is a worse outcome than a grade-7 line
  that sounds like the owner.

## Rhythm

Mixed sentence lengths are what human reading feels like: short punch, longer
build, a fragment when it lands. The scorer's burstiness detector flags the
metronome (every sentence the same length); fix it by varying, not by chopping
everything short.

## Structure and scanning

- Short paragraphs, one idea each. A wall of text loses the skimmer.
- Headings in sentence case, and only where they help someone find their place.
- Lists are allowed when they carry real items; prose is better when it is
  actually an argument.
- The first line earns the second line. Cut warm-up openings (E31, E34).
- Bold at most one thing per screen, and only the thing that must not be missed.
