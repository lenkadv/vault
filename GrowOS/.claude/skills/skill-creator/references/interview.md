# Interview question bank

Use this in SKILL.md step 3. Ask with `AskUserQuestion`, in plain words. You are
not filling in a form; you are hunting the few answers that change what you build.
Stop when another question would not change the skill.

## How many rounds

Size the interview to the job. Do not over-ask a simple skill.

- **One round (simple).** One clear output, no publish, no branching. Example: "a
  skill that writes one product tip as a social post."
- **Two rounds (medium).** Real inputs, edge cases, and a review step. Example: "a
  skill that turns a customer email into a drafted reply."
- **Three to four rounds (complex).** A package, a publish step, or real taste
  calls. Example: "a skill that plans a week of posts, drafts each, and hands the
  approved ones to publishing."

Round 1 is always the core four. Later rounds go deeper only where the answers were
thin or the job is genuinely branchy.

## Round 1 - the core four (always ask)

1. **The job.** In one or two sentences, what should this skill do, start to
   finish? What do you want to stop re-explaining?
2. **The trigger.** What would you actually type or say to start it? (These become
   the description's trigger words.)
3. **The output.** What comes out at the end? A draft waiting for you, a finished
   file, a short answer, a handoff to publishing? (This decides the output shape.)
4. **Who decides.** After the skill runs, do you review and approve, or is the
   output just for you to read? (Confirms whether the reviewer gate and the queue
   apply.)

## Round 2 - inputs, edges, and failure (medium and up)

5. **Inputs.** What does the skill need to start? A topic, a URL, a pasted email, a
   file, a customer name? What if that input is missing or thin?
6. **Failure modes.** When have you seen this job go wrong before? What is the
   output you never want to see? (This is where quality is won.)
7. **Edge cases.** What are the awkward variants? The empty case, the too-long
   case, the wrong-language case, the "no proof exists yet" case?
8. **Brain dependencies.** Which business facts should it read every time (offer,
   price, audience, voice, proof, a past story)? Reminder: these are read from
   `brain/`, never baked into the skill.
9. **The scope line.** Finish this sentence with the owner: "This skill does ___,
   and it does not do ___." A sharp boundary keeps skills from overlapping.

## Round 3 to 4 - taste, packaging, and publish (complex only)

10. **The taste bar.** Show me one output you would love and one you would reject.
    What is the difference in your words? (Turn this into a concrete rule in the
    skill, not a vibe.)
11. **Voice and examples.** Is there an existing piece that nails the tone? Should
    the skill lean on `brain/voice.md`, or is there a sharper reference to save to
    that business's own `library/`?
12. **Packaging.** Is this one output or several at once (a round, a sequence, a
    week)? If several, they become a package with a shared `_brief.md`.
13. **Publish handoff.** Does the skill stop at "waiting for you", or does it also
    prepare the safe outside handoff after you approve? (If it publishes, it is a
    separate publish-shaped skill or a clearly separate step, with the receipt.)
14. **Degradation.** When a connection it needs is down, what is the safe fallback
    you would want? Copy to paste, a saved draft, a flagged placeholder?
15. **Cadence.** Is this something you run by hand when you want it, or should it be
    ready to run on a schedule? (Scheduled skills must degrade quietly and log.)

## Shape-specific probes

Ask only the set that matches the output shape chosen in step 4.

- **Drafting / package:** channel and `type` value, length, how many variants,
  which brain files, what a "done" draft looks like.
- **Publish:** which platform, the safe state you promise (draft, paused, private),
  where the schedule and destination come from, what to do when read-back fails.
- **Report / review:** what counts as worth showing versus staying quiet, what
  never to include, whether it may change status on your say-so.
- **Utility:** the exact input and output, where any saved artifact lives, whether
  it ever hands off a work item.

## When you are done

You should be able to state, in one breath: the job, the trigger words, the output
shape, the brain files it reads, its scope line, and its top failure mode. If you
cannot, ask one more question. If you can, stop and choose the shape.
