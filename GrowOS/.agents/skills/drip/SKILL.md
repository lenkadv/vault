---
name: drip
description: "Manage Drip email marketing — list broadcasts, manage subscribers, apply tags, and draft newsletters for LCEnglish."
argument-hint: "[action: broadcasts | subscribers | tag | untag | add-subscriber | help]"
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
set -a; . lcenglish/.env; set +a
```

Expects:
- `DRIP_API_KEY` — Drip API key
- `DRIP_ACCOUNT_ID` — 2094497 (LCEnglish)

All API calls use HTTP Basic auth: `curl -s -u "$DRIP_API_KEY:" ...`

Base URL: `https://api.getdrip.com/v2/$DRIP_ACCOUNT_ID`

Never echo, cat, or print `.env` or the key value. If `set -a; . lcenglish/.env`
fails (no file), tell Lenka the Drip key is not set up yet and stop.

---

## Available Actions

When the user runs `/drip` without an argument, present these options:

1. **List recent broadcasts** — Show the last 10 email broadcasts sent
2. **Search subscribers** — Find a subscriber by email or name
3. **Add subscriber** — Add a new subscriber to a list
4. **Tag a subscriber** — Apply a tag to a subscriber
5. **Remove a tag** — Remove a tag from a subscriber
6. **List tags** — Show all tags in the account
7. **Draft a newsletter** → hands off to `/email-write` with Drip context

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
3. When draft is approved, remind the user that Drip's API is read-only for broadcasts — they'll need to paste the content into the Drip web interface to send

---

## Error Handling

- **401 Unauthorized** → API key may be wrong. Check `lcenglish/.env`.
- **404 Not Found** → Subscriber doesn't exist.
- **422 Unprocessable** → Show the full error body to the user and ask how to proceed.
- **Rate limit** → Drip allows 3,600 requests/hour. If hit, wait and retry.

---

## Notes

- Broadcasts are **read-only** via the API. Drafting and sending must be done in the Drip web UI.
- The API uses HTTP Basic Auth: API key as username, empty password.
- All responses are JSON. Use `python -m json.tool` to pretty-print when needed.
