---
name: review-exhibition
description: "Write an exhibition review through a coach-style interview. Asks questions one by one, builds the review from the visitor's raw observations, saves output for KTF seminar or publication."
argument-hint: "[exhibition name or leave blank]"
user-invocable: true
---

Today: !`date +%Y-%m-%d`

# Review Exhibition

**Purpose:** Write a critical exhibition review through guided conversation. The AI acts as a reviewer-coach — asking one question at a time, extracting observations from the user, then drafting the review from that material.
**When to use:** After visiting an exhibition. User has notes, impressions, or just a fresh memory.
**Output:** A ~700–900 word review in the user's voice, suitable for academic submission (KTF) and/or publication.

---

## Step 0 — Context Loading

Load before starting:
- `[active-business]/brain/voice.md`
- `[active-business]/brain/lessons/`

Reference style: Špálovy kytky review pattern — academic but personal, balanced praise and criticism, specific observations backed by evidence, no fabricated claims.

Framework: Barnet (Description + Analysis + Evaluation), applied fluidly — not as a mechanical checklist.

---

## Step 1 — Gather Materials

Ask the user:

1. **Exhibition details** (if not already provided): name, venue, dates, curator if known.
2. **Reference materials**: research notes, catalog texts, wall panel photos, brochures — anything they have. Accept Google Docs, PDFs, pasted text.
3. **Context**: Is this for academic submission, publication, or both? (Affects tone and length slightly.)

If the user already provided materials in the same message as the skill call, skip asking — proceed directly to Step 2.

---

## Step 2 — Coach Interview

Ask questions **one at a time**. Wait for the answer before asking the next. Do not present all questions at once.

There are 8 questions. Label each: **Otázka X ze ~8**

After each answer, give a brief 1-sentence acknowledgment before asking the next question — note what's useful about what they said ("Tohle je klíčové — máte tady konkrétní kurátorskou kritiku s argumentem.") Don't over-praise, but do signal what will go into the review.

### Question sequence:

**Q1 — First impression (seed of the thesis)**
Ask for the first feeling or thought when they entered — surprise, disappointment, unease, delight. Explain you're looking for the seed of the thesis. Everything else grows from this.

**Q2 — Space and installation**
How did the physical space work with or against the art? Lighting, layout, how works were placed relative to each other. Any technical observations (e.g., light-sensitive works in bright conditions, works isolated by architecture).

**Q3 — Curatorial concept**
What did the exhibition claim to be about (title, wall texts, marketing)? Did the works actually deliver on that promise? Note any gap between stated concept and actual content.

**Q4 — Walk-through: what stood out**
One room or work where they stopped longer than others. What was it, and why did it hold attention? Also: was there anything that clearly didn't work — a work, a section, a decision?

**Q5 — Connections and context claims**
Did the exhibition make historical or comparative claims (e.g., artist X influenced artist Y, this echoes that period)? Did those claims land visually, or were they asserted without evidence in the works?

**Q6 — Information infrastructure**
Wall texts, labels, brochure, audio guide — what was present, what was absent? Did they help? Were there unanswered questions (provenance, loans, curatorial rationale) that the materials should have addressed?

**Q7 — One-sentence verdict**
If someone asks "was it worth it?" — one sentence. This becomes the review's emotional register.

**Q8 — Title vs. reality**
Did the exhibition's title or central promise match what they actually experienced? This closes the loop on the thesis.

---

## Step 3 — Synthesize Before Drafting

Before writing, briefly map what you have:
- **Hook**: the opening scene or anecdote (often from Q1 or Q2)
- **Thesis**: the central claim the review will argue (from Q3/Q7/Q8)
- **Key observations**: 3–5 specific moments with evidence (from Q2–Q6)
- **Verdict register**: critical but fair, or genuinely enthusiastic, or mixed (from Q7)

Do not share this map with the user — it's internal scaffolding.

---

## Step 4 — Draft the Review

### Structure

**Title** — Two-part or evocative. Not descriptive ("Review of X"). Captures the thesis in a phrase. Write this last — it will emerge from the draft.

**Header** (italic, below title):
*[Exhibition name], [Venue], [City], [dates]*

**Opening paragraph** — The hook. A specific scene, moment, or observation that places the reader inside the experience AND plants the thesis. Avoid "In this exhibition..." openings.

**Background paragraph** — Brief artist/subject context for a reader who may not know the work. Calibrate to the likely audience (KTF seminar = some art history knowledge; general publication = assume less). 3–5 sentences max.

**Curatorial concept** — What the exhibition claimed to do. State it clearly, then introduce the first tension.

**Walk-through** — Move through the exhibition as experienced. 2–4 paragraphs. Each paragraph = one space, decision, or observation. Specific is better than general. Name works, describe installation choices, identify what communicated and what didn't.

**Critical observations** — The hardest-working section. Each point needs evidence: not "the installation was poor" but "the three Venice vedutes, separated by pillars, could not be compared — which was precisely the comparison the room required." Include any unanswered institutional questions (provenance, loans) where relevant.

**Conclusion** — Land the thesis. Balance critique with honesty about what was valuable. Avoid "in conclusion." The final sentence should close with an image, a quote, or a restatement that earns its weight.

### Voice and style rules

- Literary Czech. Long, flowing sentences with precise vocabulary — not simplified.
- Deadpan register: absurd or ironic observations delivered as neutral facts.
- No em dashes. Replace with periods, commas, or colons.
- No fabricated facts. If something needs verification (e.g., "was this space a chapel or a hospital ward?"), flag it with `[OVĚŘIT]`.
- Academic but not distant. The reviewer has a perspective and defends it with evidence.
- Čtenář osloven „jste"/„vy".
- No sentence-level moralizing. Judgments come from observations, not declarations.

### Length

700–900 words for academic submission. If also for publication/newsletter, ask whether to add or adjust after the review is drafted.

---

## Step 5 — Quality Gate

Before presenting the draft, check:

- [ ] Does the opening hook connect to the thesis by the end of the first paragraph?
- [ ] Is every critical claim backed by a specific observation?
- [ ] Are there any fabricated details or unsupported generalizations?
- [ ] Does the conclusion earn its final sentence — or does it just trail off?
- [ ] No em dashes anywhere.
- [ ] No AI vocabulary (viz writing.md).
- [ ] Does the title fit the review that was actually written?

---

## Step 6 — Present and Save

Present the full draft. Then ask:

"Co chcete změnit? Hlas, akcent, délka, konkrétní pasáže?"

Apply feedback immediately.

Save to: `[active-business]/work/articles/YYYY-MM-DD-[exhibition-slug].md` (add `type: article` frontmatter, born `draft`, move to `review` when ready — GrowOS 2.0 item model). Parts (metadata, notes) go in `_YYYY-MM-DD-[exhibition-slug]/` beside it.

Include a second file `metadata.md`:

```markdown
# Metadata

- **Exhibition:** [name]
- **Venue:** [venue, city]
- **Dates:** [dates]
- **Curator:** [if known]
- **Date written:** [today]
- **Context:** [KTF / publication / both]
- **Word count:** [count]
- **Status:** Draft / Final
```

---

## Step 7 — Lessons Capture

After any feedback or correction, add a rule to `[active-business]/brain/lessons/` under the appropriate section. This ensures the next review starts closer to what works.

---

## Notes for Future Runs

- The coach approach (one question at a time) works better than a batch questionnaire — it gives the user space to think and surfaces richer material.
- The thesis often emerges from Q7 (one-sentence verdict) or Q8 (title vs. reality) — listen for it early but don't force it.
- The opening hook almost always comes from something the user mentions in Q1 or Q2 as "I don't know if this is useful, but..." — it usually is.
- When the user is ambivalent (liked some, didn't like other parts), reflect that honestly in the conclusion. Forced negativity or forced enthusiasm both flatten the review.
