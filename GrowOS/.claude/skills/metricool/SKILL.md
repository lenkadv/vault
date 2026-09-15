---
name: metricool
description: "Draft social media posts in your brand voice, then open Metricool's scheduler in your browser so you can review and publish — no API required."
argument-hint: "[topic or 'latest' to use most recent draft]"
user-invocable: true
---

Today: !`date +%Y-%m-%d`

# Metricool — Draft & Schedule

**How it works:** Claude drafts posts using your brand voice, then uses Playwright to open Metricool's New Post page in your browser with the content ready to paste. You review, adjust the schedule, and hit Publish.

**No API required.** Works on any Metricool plan.

---

## Step 0 — Load Context

1. Load `[active-business]/brain/voice.md`, `brain/audience.md`, `brain/business.md` — voice, platforms, audience
2. Load `[active-business]/brain/lessons/` — accumulated rules
3. Note which platforms the business is active on (from brain/business.md or brain/plan.md)

---

## Step 1 — Understand the Request

If an argument was passed (topic, draft name, or "latest"), use that as the starting point.

Otherwise ask via AskUserQuestion:

1. **What's the post about?** (topic, idea, link, or paste content to repurpose)
2. **Which platforms?** (select all that apply: Instagram, LinkedIn, Facebook, X/Twitter, TikTok, Pinterest)
3. **When to publish?** (now / specific date+time / best time suggestion)

---

## Step 2 — Draft the Posts

Write platform-specific versions. Each platform gets its own draft:

| Platform | Max length | Style notes |
|----------|-----------|-------------|
| Instagram | ~2,200 chars | Storytelling, line breaks, 5-10 hashtags at end |
| LinkedIn | ~3,000 chars | Professional but personal, no hashtag spam (3-5 max) |
| Facebook | ~500 chars | Conversational, question or CTA at end |
| X/Twitter | 280 chars | Punchy, one strong idea, 1-2 hashtags max |
| TikTok | ~300 chars | Casual, hooks, trending angle |
| Pinterest | ~500 chars | Descriptive, keyword-rich, action-oriented |

Apply all rules from `[active-business]/brain/lessons/` and `brain/voice.md`.

Run mandatory quality checks:
- Grade 8 or lower reading level
- No AI vocabulary (delve, tapestry, leverage, utilize, etc.)
- No em dashes
- No rule of three unless naturally fits
- Humanizer pass (internal — fix AI patterns before presenting)

Present all drafts clearly with platform labels. Ask for feedback before proceeding to Metricool.

---

## Step 3 — Refine

Apply any requested changes. Ask: "Happy with these? I'll open Metricool now."

Wait for confirmation.

---

## Step 4 — Open Metricool via Playwright

Use the Playwright MCP tools to open Metricool's post scheduler in the user's browser.

### 4a — Navigate to Metricool

```
Navigate to: https://app.metricool.com/
```

Check if already logged in:
- If logged in → proceed to 4b
- If login screen → tell the user: "Metricool is open in your browser. Log in and I'll continue from here." Wait for them to confirm they're logged in, then continue.

### 4b — Go to New Post

```
Navigate to: https://app.metricool.com/app/planning
```

Look for the "New Post" or "+ Create" button and click it. This opens the post composer.

### 4c — Fill in the Content

For the **first selected platform**:
1. Click the platform tab/selector in Metricool's composer
2. Click into the text area
3. Type or fill in the drafted post content for that platform

Tell the user:
> "I've opened Metricool and filled in the [platform] post. The content is in the composer — check it, set your date/time, and add any images. When you're ready, I can fill in the next platform or you can hit Publish."

### 4d — Offer to fill remaining platforms

If multiple platforms were selected, offer to repeat for each one, or guide the user to copy-paste the remaining drafts (show them clearly formatted for easy copy).

---

## Step 5 — Handoff

After filling the composer, display all remaining drafts in a clean copy-paste block:

```
=== INSTAGRAM ===
[draft]

=== LINKEDIN ===
[draft]

=== FACEBOOK ===
[draft]
```

Tell the user: "These are ready to paste into Metricool for the remaining platforms. Let me know when it's published and I'll save a note."

---

## Step 6 — Save Output

In GrowOS 2.0 the draft is a work item. Save to:
`[active-business]/work/social/[YYYY-MM-DD]-metricool-[topic-slug].md` (add `type: social-post` frontmatter, let it be born `draft`, move to `review` when ready — see the item model)

Include:
- Date
- Topic / source
- Platform-by-platform drafts
- Scheduled publish date/time (if known)

---

## Fallback — If Playwright Can't Reach Metricool

If the browser tool fails or Metricool blocks automation:

1. Present all drafts in clean, labelled copy-paste blocks
2. Tell the user to open https://app.metricool.com/app/planning manually
3. Guide them through the UI: "Click '+ New Post', select your platforms, paste each version, set the date, and publish."

---

## Feedback

If the user gives feedback on tone, format, or workflow, apply it and save a lesson to `[active-business]/brain/lessons/`.
