---
name: drip
description: "Manage Drip email marketing — list broadcasts and series, pull email stats (opens, clicks, revenue), manage subscribers and tags, create draft broadcasts, and draft newsletters for LCEnglish (also reads the AI lektoři and publicspeaking.cz accounts)."
argument-hint: "[action: broadcasts | stats | series | workflow | draft | subscribers | tag | untag | add-subscriber | help]"
user-invocable: true
---

Today: !`date +%Y-%m-%d`

# Drip Email Marketing

**Purpose:** Connect to your Drip account (LCEnglish) to list broadcasts, manage subscribers, and prepare newsletter content.
**Account:** LCEnglish — account ID 2094497

---

## Credentials

Secrets live only in `lcenglish/.env` (GrowOS 2.0 rule). Load them into the shell
before any call — **sourcing is allowed by the guard, printing a `.env` is not**:

```bash
eval "$(grep -E '^DRIP_(API_KEY|ACCOUNT_ID)=' lcenglish/.env | sed 's/^/export /')"
```

(Loading only the Drip lines avoids breaking on other `.env` values that contain
spaces. Never print the result.)

Expects:
- `DRIP_API_KEY` — Drip API key
- `DRIP_ACCOUNT_ID` — 2094497 (LCEnglish)

All API calls use HTTP Basic auth: `curl -s -u "$DRIP_API_KEY:" ...`

Base URL: `https://api.getdrip.com/v2/$DRIP_ACCOUNT_ID`

Never echo, cat, or print `.env` or the key value. If `set -a; . lcenglish/.env`
fails (no file or empty `DRIP_API_KEY`), tell Lenka the Drip key is not set up yet and stop.

---

## Accounts the key can read

The same API key reaches three accounts (`GET https://api.getdrip.com/v2/accounts`):

| ID | Account |
|---|---|
| 2094497 | LCEnglish (default, `DRIP_ACCOUNT_ID`) |
| 8879539 | AI lektoři (webinář ChatGPT → AI workshop / AI sborovna) |
| 5405406 | publicspeaking.cz |

Use another account only when Lenka asks for it; override with
`DRIP_ACCOUNT_ID=8879539` for that call. Never write to a non-default account
without her explicit yes in the conversation.

---

## Available Actions

When the user runs `/drip` without an argument, present these options:

1. **List recent broadcasts** — Show the last 10 email broadcasts sent
2. **Search subscribers** — Find a subscriber by email or name
3. **Add subscriber** — Add a new subscriber to a list
4. **Tag a subscriber** — Apply a tag to a subscriber
5. **Remove a tag** — Remove a tag from a subscriber
6. **List tags** — Show all tags in the account
7. **Email stats** — opens, clicks, unsubscribes, orders, revenue per email
8. **List email series** — multi-email campaigns and their emails
9. **Workflow structure** — steps and email titles of an automation
10. **Create a draft broadcast** — put an approved newsletter into Drip as an unsent draft
11. **Draft a newsletter** → hands off to `/email-write` with Drip context

---

## Step 1 — Identify the action

If an argument was passed (e.g. `/drip broadcasts`), skip to the relevant section.
Otherwise present the menu above as a numbered list and wait for the user's choice.

---

## Action: List Broadcasts

Run:
```bash
curl -s -u "$DRIP_API_KEY:" \
  "https://api.getdrip.com/v2/$DRIP_ACCOUNT_ID/broadcasts?status=sent&per_page=10" \
  | python -m json.tool
```

Parse and display results as a clean table:

| # | Subject | Status | Sent at | Opens | Clicks |
|---|---------|--------|---------|-------|--------|

Fields to pull from each broadcast object:
- `subject` — email subject line
- `status` — sent / draft / scheduled
- `send_at` or `created_at` — date
- `open_rate`, `click_rate` — if available

If `status=sent` returns nothing, try without the status filter:
```bash
curl -s -u "$DRIP_API_KEY:" \
  "https://api.getdrip.com/v2/$DRIP_ACCOUNT_ID/broadcasts?per_page=10" \
  | python -m json.tool
```

After displaying results, ask: "Would you like to see the full content of any of these, or do something else?"

---

## Action: Email Stats

```bash
curl -s -u "$DRIP_API_KEY:"   "https://api.getdrip.com/v2/$DRIP_ACCOUNT_ID/metrics/email?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD"
```

Limits (checked 2026-09-27): the date range may be **at most 366 days**; the
answer holds a `summary` plus **only the 10 most recent emails** in the range;
**20 requests per hour per account**; data exist from 2020 on. For a longer
history, walk the range in windows of a few send dates and pause ~3 minutes
between calls. Each email has `sends, opens, open_rate, clicks, click_rate,
bot_clicks, unsubscribes, orders, revenue_in_cents`; `broadcast_id` is empty
for workflow and series emails. The `open_rate`/`click_rate` fields on
broadcasts and series emails themselves are always 0 — use this endpoint.

Show as a table: date · subject · sends · open % · click % · unsubscribes.

---

## Action: List Email Series

```bash
curl -s -u "$DRIP_API_KEY:" "https://api.getdrip.com/v2/$DRIP_ACCOUNT_ID/campaigns?per_page=100"
curl -s -u "$DRIP_API_KEY:" "https://api.getdrip.com/v2/$DRIP_ACCOUNT_ID/campaigns/CAMPAIGN_ID/emails?per_page=100"
```

The emails endpoint returns subject, `sending_delay`, `html_body`, `text_body`.
It occasionally answers with an HTML error page — retry once.

---

## Action: Workflow Structure

```bash
curl -s -u "$DRIP_API_KEY:" "https://api.getdrip.com/v2/$DRIP_ACCOUNT_ID/workflows?per_page=100"
curl -s -u "$DRIP_API_KEY:" "https://api.getdrip.com/v2/$DRIP_ACCOUNT_ID/workflows/WORKFLOW_ID/details"
```

`details` shows triggers, tags, delays and the **titles** of workflow emails.
Their body text is not available through the API — only in the Drip web UI.

---

## Action: Create a Draft Broadcast

Only for a newsletter that is `approved` in the GrowOS review queue.

```bash
curl -s -u "$DRIP_API_KEY:" -H "Content-Type: application/json" -X POST   "https://api.getdrip.com/v2/$DRIP_ACCOUNT_ID/broadcasts"   -d '{"broadcasts":[{"name":"INTERNAL NAME","subject":"SUBJECT","html_body":"<p>…</p>","from_name":"Lenka z LCEnglish","from_email":"lenka@lcenglish.cz"}]}'
```

A broadcast created through the API always starts as a **draft**. Choosing the
audience, scheduling and sending stay in the Drip web UI with Lenka. Tell her
the draft is waiting there.

---

## Action: Search Subscribers

Ask: "What's the email address or name you're looking for?"

Then run:
```bash
curl -s -u "$DRIP_API_KEY:" \
  "https://api.getdrip.com/v2/$DRIP_ACCOUNT_ID/subscribers?email=EMAIL_HERE" \
  | python -m json.tool
```

Display subscriber details: name, email, status, tags, subscribed date.

---

## Action: Add Subscriber

Ask for:
1. Email address (required)
2. First name (optional)
3. Last name (optional)
4. Tags to apply (optional, comma-separated)

Then run:
```bash
curl -s -u "$DRIP_API_KEY:" \
  -H "Content-Type: application/json" \
  -X POST \
  "https://api.getdrip.com/v2/$DRIP_ACCOUNT_ID/subscribers" \
  -d '{
    "subscribers": [{
      "email": "EMAIL",
      "first_name": "FIRST",
      "last_name": "LAST",
      "tags": ["TAG1", "TAG2"]
    }]
  }'
```

Confirm success: "Subscriber added."

---

## Action: Tag a Subscriber

Ask: "What's the subscriber's email?" and "What tag(s) do you want to apply? (comma-separated)"

Run:
```bash
curl -s -u "$DRIP_API_KEY:" \
  -H "Content-Type: application/json" \
  -X POST \
  "https://api.getdrip.com/v2/$DRIP_ACCOUNT_ID/tags" \
  -d '{"tags": [{"email": "EMAIL", "tag": "TAG"}]}'
```

---

## Action: Remove a Tag

Ask: "What's the subscriber's email?" and "Which tag do you want to remove?"

Run:
```bash
curl -s -u "$DRIP_API_KEY:" \
  -X DELETE \
  "https://api.getdrip.com/v2/$DRIP_ACCOUNT_ID/subscribers/EMAIL/tags/TAG"
```

---

## Action: List Tags

Run:
```bash
curl -s -u "$DRIP_API_KEY:" \
  "https://api.getdrip.com/v2/$DRIP_ACCOUNT_ID/tags" \
  | python -m json.tool
```

Display as a simple list.

---

## Newsletter Drafting

When the user wants to draft a newsletter:
1. Note the Drip context (LCEnglish account, subscribers, any recent broadcasts for reference)
2. Hand off to `/email-write` — it will handle the full drafting flow
3. When the draft is approved, offer to put it into Drip as an unsent draft broadcast (action above). Scheduling and sending stay with Lenka in the Drip web UI

---

## Error Handling

- **401 Unauthorized** → API key may be wrong. Check `lcenglish/.env`.
- **404 Not Found** → Subscriber doesn't exist.
- **422 Unprocessable** → Show the full error body to the user and ask how to proceed.
- **Rate limit** → Drip allows 3,600 requests/hour in general, but `/metrics/email` only **20 per hour per account**. If hit, wait and retry.

---

## Notes

- The API can **create a draft broadcast** but never schedules or sends one — that is done in the Drip web UI.
- Drip MCP (`https://api.getdrip.com/mcp`, OAuth) exposes the same v2 API; nothing extra beyond what is here.
- The API uses HTTP Basic Auth: API key as username, empty password.
- All responses are JSON. Use `python -m json.tool` to pretty-print when needed.
