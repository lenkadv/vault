# Example: a pricing round that changes the unit, not just the number

**Constructed. Not a real business.** Drayhorn Studio is two people drawing
technical illustrations and exploded diagrams for machinery manuals, working for
manufacturers. They bill $65 an hour. The owner asked: *"Should we put our rate
up?"*

**No sentence in this file may appear in a real output.** Every quoted line below
names Drayhorn Studio on purpose, so if one of them ever turns up in real work it
is a copy, and it is wrong.

## The document (shape follows the recommendation: answer first, argument after)

---

**Headline:** Move off the hourly rate to a price per manual — pricing round

### The recommendation

**Restructure, not raise.** Price the manual, not the hour. Two signals say you are
mispriced, and both of them point at the unit rather than the number: an hourly
rate is why you keep losing to a cheaper quote, and it is why getting faster last
year quietly cost you money.

### The current price, and where that comes from

$65 an hour, from `business.md`. A manual runs 30 to 40 hours, from your own
account in this session, recorded today as your statement. No price change is
recorded in `decisions.md` since the studio started.

### The bracket

- **Floor — what the alternative costs the buyer.** Doing it in-house. You told me
  one customer's own engineer spent about three weeks on the last manual before
  they gave up and called you. That is the floor and it is well above your current
  total for the same job.
- **Ceiling — what the outcome is worth.**
  `[PLACEHOLDER: what a late manual actually costs a customer. Their machine
  cannot ship without it, so the number is probably large, but nobody has asked and
  I am not going to invent it. Two questions to one customer would settle it: what
  happens to a shipment if the manual is not ready, and what that has cost them
  before.]`
- **Cost to deliver.** Known, and it is a floor you must not go under — never the
  basis for the number.

### The value argument does not stop at time saved

"We save your engineer three weeks" gets you into the room and does not decide what
anyone pays. The thing worth paying for is what the engineer does with those three
weeks — which, from your own account, is getting the next machine out of the door.
And behind that sits the real one: the manual is what lets the machine ship at all.
That is the argument to make, and the ceiling placeholder above is the number that
would put weight behind it.

### The unit, tested

| Test | Hourly rate | Price per manual |
|---|---|---|
| Does more of the unit mean more value to the buyer? | No. More hours is worse for them, not better | Yes. A finished manual is the thing they want |
| Does the unit punish us for doing the job well? | Yes. You added the process that turns CAD straight into line art (`decisions.md`, dated last year). It cut roughly a third off every job — and your revenue with it | No. Getting faster is yours to keep |

The hourly rate also makes you directly comparable. Two studios quoting an hourly
number are one line in a spreadsheet, and the slower one earns more. That is the
mechanism behind the quotes you have been losing.

### The signals, checked

| Signal | Answer | Source |
|---|---|---|
| Does anyone wince at the price? | No. Nobody has questioned the rate in about a year | Your own report, today |
| Has the offer gained real capability since the price was set, without the price moving? | Yes. The CAD-to-line-art process, last year | `decisions.md`, dated |
| Highest-rated but not highest-priced? | Unknown — `competitors.md` has no entries | Named absence |
| Has the cost to deliver risen? | No | Your own report |

**Two point the same way** — no wincing, and a real capability gain with no price
move. That is the bar for saying the offer is mispriced, and it is met. Say which
two out loud, because one on its own would not be enough.

### The number, and how to say it

**A Drayhorn manual is $2,800 for up to 60 illustrations, and the price will not
be exceeded.** Above 60 illustrations, Drayhorn quotes before starting.

That figure comes from your own arithmetic and nowhere else: 40 hours at your
current rate is $2,600, and you told me 40 hours is the top of your range, not the
middle. So this is your existing top-end job total, made flat, with the cap taking
the risk off the buyer. It is a starting range to test, not a discovered truth.

**The anchor is your own other work, and their own alternative.** Both are real:

> A Drayhorn manual is $2,800, fixed, whatever it takes us. The last one a
> customer tried in house took their own engineer three weeks.

No struck-through "was $3,500". No "you would pay double elsewhere" — nothing in
the folder records what anyone else charges.

**Say it in words, on the page.** Both the figure and the cap, written out. If a
job genuinely has to be quoted — a manual over 60 illustrations — say why in one
line rather than leaving a bare "contact us".

### The migration path

New customers only, from the next quote.

Existing customers stay on $65 an hour until their current manual is finished, then
move to the job price on the next one, and they hear it from you in a call before
they see it on an invoice.

**One check first, and it blocks everything else:** was anyone told their rate was
locked? Never raise on a customer who was promised a lock.

### What to watch, and when

Quote-to-job rate across the next ten quotes. Look again when the tenth is done.
One number, no dashboard.

### Who owns this price

You do. Not the two of you jointly, and not "the studio". If it needs revisiting,
it needs one person to raise it.

---

## What happened next

The owner said yes to the restructure and overruled one part of it: their oldest
customer was told last spring that the rate would hold for the year. So that
customer stays on $65 an hour until next spring, and the concession was taken in
one line and dropped:

> That changes my read — you told me something the Drayhorn folder did not hold.
> They stay on the old Drayhorn rate until spring, and nothing else about the
> recommendation changes for anyone else.

The recommendation flowed into an offer document at
`work/strategy/manual-job-price.md`, `type: offer`, born a draft, carrying the price
wording above. It went through the reviewer gate, then to `review`.

**On approval,** the exact before-and-after for the offer ladder in
`brain/business.md` was shown, applied on the owner's yes, and read back to check
the new lines were really there. Then the receipt was completed and the item moved
to `published`:

```yaml
publish_destination: brain/business.md
publish_ref: drayhorn/brain/business.md
publish_attempted_at: 2026-07-30T16:41:00.000Z
publish_state: prepared
publish_note: Offer ladder updated in brain/business.md and read back to verify.
published_at: 2026-07-30T16:42:00.000Z
```

**And the decision was logged**, on a yes, at the top of `brain/decisions.md`:

> ## 2026-07-30 — Price the Drayhorn manual, not the hour
>
> **Decision:** $2,800 per Drayhorn manual up to 60 illustrations, capped. New
> customers from the next quote; existing customers move on their next manual.
>
> **Why:** The Drayhorn hourly rate made us directly comparable and paid us less
> every time we got faster. Two signals said we were mispriced: nobody has
> questioned the rate in a year, and the CAD-to-line-art process cut a third off
> every job without the price moving.
>
> **Trade-off accepted:** Drayhorn carries the overrun risk on a long manual. The
> cap is what makes the number safe for the buyer to say yes to, so it is the point
> of the change, not a concession.
>
> **Not decided:** What a late manual actually costs a Drayhorn customer. Until we
> ask, the ceiling is unknown and $2,800 is a starting point, not a settled
> price.

## Why this passes the bar

The recommendation is in the first line with its reason. The current price is named
with its source. The floor is sourced, the ceiling is an honest placeholder with
the two questions that would settle it, and cost sits as a baseline rather than the
basis. Both unit tests are answered. Two signals are cited and the aggregation is
said out loud. There is a migration path and the locked-price check fired for real.
One thing to watch, with when. A named price owner. Every figure traces to
`business.md`, `decisions.md`, or the owner's own words this session — and the one
number nobody has is a placeholder, not an estimate.
