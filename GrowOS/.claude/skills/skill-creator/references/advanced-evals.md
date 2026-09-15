# Advanced testing (optional)

This is for power users who want a stricter, measurable way to test a skill than
the light loop in SKILL.md step 6. You do not need it. The light loop (run a real
prompt, look at the output, fix the skill, repeat) is enough for almost every
marketing skill. Reach for this only when a skill is high-stakes, runs often, or
keeps regressing and you want proof it improved.

Keep it lightweight even here. The goal is a small, honest signal, not a research
pipeline.

## The idea

Compare the skill against no skill on the same prompts, and judge both against a
short rubric you wrote first. If the skill does not clearly beat the baseline, it
is not ready.

## A simple loop

1. **Write 3 to 5 real prompts.** Draw them from real requests the owner made, not
   invented ones. Include at least one awkward case (thin input, missing proof, an
   edge from the interview).

2. **Write the rubric first, before you look at any output.** Three to five plain
   yes-or-no lines that define a good result for this skill. Example for an ad
   skill: reads in the owner's voice; makes one clear claim; every number traces to
   `brain/proof/`; ends with one call to action; no fake urgency. Writing the
   rubric after seeing output is how you fool yourself.

3. **Run each prompt twice:** once with the skill, once as a plain request with no
   skill (the baseline). Keep both outputs.

4. **Score both against the rubric,** blind to which is which if you can. Count the
   yes lines. The skill should win on most prompts and never lose badly on the
   awkward one.

5. **Read the misses, fix the skill, re-run.** A low score points at a weak step or
   a missing rule in the skill, not just a bad output. Fix the playbook.

## Keep the artifacts small

- Save the prompts and the rubric in that business's own `library/` (they are the
  customer's, and updates never touch it). A plain markdown file is fine.
- Do not build a scoring harness, an HTML viewer, or a benchmark database. If you
  find yourself writing tooling, you have left "lightweight" behind. Fold the
  finding back into the skill and stop.

## When to stop

Stop when the skill wins the rubric on your real prompts and holds up on the
awkward case. More runs past that point measure noise, not quality.
