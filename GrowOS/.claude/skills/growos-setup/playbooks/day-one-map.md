# Playbook: the Day-One Map

The last thing onboarding produces is a personal "your marketing, starting today"
page. It turns everything you just learned into a plain plan the owner can act on
tomorrow without you sitting beside them. Write it to `<business>/start-here.md`
and show it on screen.

This is a plain file the owner reads, not a work item. It carries no status label
and never enters the review queue. Nothing in it is a terminal command; the owner
never touches a command line.

---

## 1. Take stock of what is actually installed

Do not promise a skill that is not there. Look at the skills this install actually
has (the folders under `.claude/skills/`) and describe the team by what is really
present. On a fresh chassis that may be a small set; on a full install it is the
whole marketing team. Either way, describe real capabilities in plain words, and be
honest that more of the team arrives as skills are added.

Match capabilities to the owner's goals and the plan you just wrote. A LinkedIn-only
owner and a video-first owner get different first weeks from the same install.

---

## 2. Propose the starter set (2 to 3 skills)

Nothing is "on" by default; the owner pulls what they need. So propose a small
starter set, chosen from what is installed and pointed at their bottleneck and
goal:

- If the bottleneck is reach or awareness, lead with a content or posting skill.
- If it is "people visit but don't buy", lead with a page or offer skill.
- If it is "no time", lead with the review queue — everything lands in one
  place and waits — and a single small weekly habit.

Name 2 to 3, say in one line what each does for them, and make clear the rest of
the team stays quietly available for when a moment calls for it. Keep it a menu,
not a switchboard; overwhelm is a failure.

---

## 3. What is worth a deeper look this week

Onboarding's research burst ran fast and, on the Quick path, shallow by design.
Some of what landed in the brain is marked unchecked or rough, or came from a
short pass rather than a deep one. Point at what a re-run would sharpen, so the
owner knows the option exists and it is a one-line ask, not a new setup:

- If `brain/research/` has an audience dossier that is thin, or the interview
  left the audience section mostly unchecked marks, propose a fresh
  `research-audience` pass: "I could dig deeper into what your customers
  actually say. Just ask, any time."
- If the competitor dossier only sketched the top two or three (the Quick
  default), propose a fuller `research-competitors` teardown once there is time
  for it.
- Say plainly that both are standalone skills the owner can ask for whenever it
  is useful, not only during onboarding: "who are my customers" or "research my
  competitors" reaches them directly.

Keep this to a short, honest note, not a sales pitch for more research. If the
In-depth path already ran both skills deep, say so instead, and skip proposing a
re-run.

---

## 4. Write `start-here.md`

Write it in warm, plain, grade-8 words, no jargon, no dashes. Use this shape, filled
from the real brain, plan, and installed skills:

```markdown
# Your marketing, starting today

A quick map of what your team can do, what turns on more, and where to start.

## What we can do right now (nothing to connect)
- <plain capability tied to an installed skill, in their terms>
- <another>
- Everything you make waits in your review queue for your yes. Nothing goes out
  on its own.

## What each connection unlocks
- **Your email tool:** <what connecting it lets the team do, e.g. push ready-to-send
  drafts to your list>
- **A scheduler:** <e.g. line up approved posts to go out on time>
- **Your ad account:** <e.g. build ad drafts, always paused, for your yes>
- (List only the connections that fit this business. A key for any of these lives
  in <business>/.env, never in chat.)

## Your first week
Built from your plan and the time you have.
- <day or slot>: <one small, concrete action, e.g. "approve this week's two posts">
- <slot>: <action>
- <slot>: <action>

## Your starter set
The 2 to 3 skills to reach for first. The rest of the team is here when you want it.
- **<skill>** - <what it does for you, one line>
- **<skill>** - <one line>

## What I'll research deeper this week
- <e.g. "A closer look at what your customers actually say. Just ask: research my audience.">
- <e.g. "A fuller look at your top competitors. Just ask: research my competitors.">
- (Skip this section, or say so plainly, if the In-depth research already ran deep.)

## When you want more
- Ask me "what should I work on this week?" any time; I answer from your plan.
- Ask me "what does a calm week look like?" and I will lay one out for you.
```

Keep the first week genuinely small and doable. The goal is that the owner closes
the session knowing exactly what to do next, not staring at a blank week.

---

## 5. Show it and close

Show the finished map in chat (or point them to open `start-here.md`), then return
to the skill at Step 11 to confirm health and close. Checkpoint
(phase: `day-one-map-written`) before you hand back.
