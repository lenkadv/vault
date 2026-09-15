# Playbook: pricing

Use this when the question is the number: what to charge, whether to raise, how to
present the price, or how to split it into tiers. Run it inside the method in
`SKILL.md`, which holds the law every mode obeys.

This mode is a structured conversation that ends in one recommendation with
reasons. If the owner takes it, the work flows into a new or sharpened offer
document. **If it ends with "hold the price", it leaves no file.** That is a
complete answer, not a failure, and inventing a work item to have something to show
is padding.

Every business, name and number in this file is made up to show the shape of a good
answer. None of it is a fact about anyone, and no figure here is a benchmark.

## The law that governs this whole playbook

**Never invent market data.** These are banned as facts, without exception:

- a competitor's price that is not recorded in `brain/competitors.md`, with the
  date it was recorded,
- a market size, a willingness-to-pay figure, a price elasticity, or a demand curve
  the business has not measured,
- a benchmark conversion rate, an industry-typical margin, or a "typical" cost per
  customer,
- a revenue projection from a price change, stated as fact,
- any pricing-page or conversion "lift" statistic. There is no trustworthy public
  source for these. Do not reach for one.

Each of those is a `[PLACEHOLDER: what is missing]` or a question to the owner.

**The moment you want a number the folder does not hold: stop.** That moment is the
one this whole playbook exists for, and it does not announce itself. It feels like
being helpful. Naming the gap is not enough on its own — the failure is naming it
and then filling it from memory in the very next sentence.

So, at that moment, write this and nothing else:

`[PLACEHOLDER: what is missing · why it matters here · what would settle it]`

**Never bridge the gap from memory.** "I do not have this" is always followed by the
placeholder, never by an estimate of the market. Not "businesses like yours usually
charge around...", not "the going rate tends to be...", not "most people in your
position price the one-to-one two or three times the group rate". You do not know
that about this business, and a remembered range stated next to their real numbers
reads to the owner as a researched fact.

**This covers illustrations, brackets and ranges too.** A figure does not become
safe by being an example. If you catch yourself writing "say the floor is around
this and the ceiling around that" to show how bracketing works, stop — the owner
will read those two numbers as your answer, because they are the only numbers on
the page. Every money figure in your reply traces to the folder, to the owner this
session, or to arithmetic whose inputs you have shown. Otherwise it does not
appear. Show the shape of the bracket with the placeholder sitting in it, never
with numbers you supplied yourself.

**BAD.** "I do not have competitor pricing in your folder. That said, businesses at
your stage usually hold the premium tier at two to three times the entry price."

**GOOD.** "I do not have competitor pricing in your folder.
`[PLACEHOLDER: what the two alternatives you named actually charge · it sets the
floor for this decision · one look at their public pricing pages, or asking a
customer who compared you.]`"

**Label an estimate as an estimate in the same breath.** If a what-if genuinely
needs a number nobody has, you may use one — inside four fences, all four at once:

1. It appears only inside conditional arithmetic — an "if it is this, then that"
   chain that is visibly working something out.
2. The same sentence that uses it says it is assumed.
3. It names the owner as the person who can confirm it.
4. It says how the conclusion changes if the number is wrong.

**And it never leaves the conversation.** An assumed number may not appear in a
price, in a recommendation line, or in anything durable — not the work item, not
`brain/business.md`, not a decision log entry. Those are the places the owner and
every later skill will read as fact.

**If the what-if's conclusion survives into the document, the assumed number
becomes a `[PLACEHOLDER: ...]` there.** The reasoning carries over; the invented
figure does not. This is the whole point of the fences: thinking out loud with a
made-up number is allowed, shipping one is not.

**GOOD, and here is the full arc.** In the conversation:

> Say a typical customer comes back twice a year — I am making that up, and you
> would know. If it is twice, the higher price still pays for itself in the first
> month. If it is once, it does not, and we should hold.

Then in the document, where it has to last:

> The higher price pays for itself inside the first month if customers return at
> least twice a year, and does not if they return once.
> `[PLACEHOLDER: how often a customer actually comes back · it decides whether this
> rise holds up · a count of repeat names in your last year of invoices.]`

**BAD.** "With a typical repeat rate of twice a year, the higher price pays for
itself in the first month." Assumed, unflagged, stated as fact.

**ALSO BAD.** Flagging it perfectly in the conversation and then writing "based on
a twice-yearly repeat rate" into the work item. The flag does not travel with the
number, so the number does not travel either.

## Step 1: read what the brain actually holds

Open `brain/business.md` (the current prices and the ladder), `brain/audience.md`
(objections, and what buyers compare against), `brain/competitors.md` (recorded
prices only, with their dates), `brain/decisions.md` (any price decision already
made and why), `brain/proof/` (what the outcome is actually worth, in customers'
own words), and `brain/compliance.md` if the trade is regulated.

Name the current price and where that fact came from. If a price is being set for
the first time, say so explicitly — the whole conversation runs differently when
there is no starting point to defend.

## Step 2: bracket the price

Three numbers, in this order. Each is sourced from the brain or the owner, or it is
a placeholder. Never a guess dressed as a figure.

- **The floor: what the buyer's next best alternative costs them.** Include doing
  it themselves and doing nothing. "Their office manager spends a morning a week on
  this" is a floor. So is "the cheapest local quote we have on record, from
  `competitors.md`, dated March".
- **The ceiling: what the outcome is worth to them.** Revenue they gain, plus
  expense they no longer carry, plus risk they avoid, minus the effort it takes
  them to get there. Every input named. If the brain does not hold the customer's
  own numbers, this is a placeholder and the conversation says so.
- **Cost to deliver: a floor you must not go under, never the basis for the
  number.** Pricing up from cost quietly caps what the business can earn at
  whatever it happens to spend, and it punishes the business for getting more
  efficient.

If the brain holds the customer's own numbers, you may run the value arithmetic and
show every input. Treat the result as **a starting range to test, never as the
price**. Do not apply a multiplier or a divisor to it; there is no such rule worth
quoting.

**The honest empty state.** "The floor is `[PLACEHOLDER: what it costs a customer
to keep doing this the current way — nothing in the folder says]`. The ceiling is
the same. Both would be settled by asking two customers what they were doing before
they hired you and what that cost them. Until then this is a price set on cost and
instinct, and it should be treated as provisional."

## Step 3: choose the unit before you choose the number

The unit you charge on is a bigger decision than the number. Run both tests and
write the answers down.

1. **The value test.** As the customer gets more of this unit, do they get more
   value? If not, the unit is wrong by construction.
2. **The perverse-incentive test.** Does the unit punish you for doing the job
   well, or pay you for doing it badly? If getting faster or better shrinks your
   revenue, the unit is wrong.

**The hourly trap.** Charging by the hour makes you directly comparable, and
comparable means the cheapest wins. Two firms quoting an hourly rate for the same
job are one line in a spreadsheet, and the one who is slower earns more. Where the
work is repeatable, quote the job or the package. Where it genuinely cannot be
predicted, add components the buyer cannot line up side by side, and state a cap:
"we bill by the hour, and the total will not exceed X." The cap is what makes an
uncertain job safe for the buyer to say yes to.

**Never stop at time saved.** Time saving gets you into the conversation and does
not drive what people will pay. Say what the customer does with the time or money
that gets freed up — the second van they can run, the evening they get back, the
job they can now take on. An offer whose entire value argument is "saves you hours"
is priced as a convenience.

## Step 4: the raise signals, and the two-or-more rule

Check each one against the brain or the owner's own report of things they
witnessed. Write down which ones you checked and what the answer was.

- Nobody winces at the price when it is said out loud.
- Almost nobody objects, and nearly every quote turns into a job.
- The offer has genuinely gained something since the price was set, and the price
  did not move.
- The business is the highest-rated of the alternatives and not the highest-priced.
- The cost to deliver has risen and the price has not.

**If two or more point the same way, the offer is probably mispriced.** Say which
two. One signal on its own is not enough to move a price.

The same list read backwards is a hold-or-lower signal: constant wincing, frequent
loss on price to a genuinely comparable alternative, and a quote-to-job rate that
has fallen since the last change.

## Step 5: ask about behaviour, not opinion

Owners cannot reliably answer "what is your product worth?" They can answer what
they have seen. Four questions that convert an unmeasurable question into something
reportable — pick the ones that would change your answer, up to three:

- "When you say the price out loud, do you wince?"
- "When did someone last say yes without hesitating?"
- "How did you land on this number in the first place?"
- "Are people pushing back on price, or saying yes too easily?"

Their recollection of what they witnessed is legitimate evidence and gets recorded
as their own statement, with today's date. Their theory about what the market would
bear is the weakest class of evidence and is treated as a hypothesis, not a fact.

## Step 6: make one recommendation

Within the first two lines: **raise, hold, lower, restructure, or set** — that last
one when there is no price yet and this round is putting the first one on the table.
With the reason. Not a menu. At most two or three live options, and one named pick.

**GOOD.** "Raise, to a flat job price. Two signals point the same way: nothing in
`decisions.md` shows the price moving since you added the second fitter, and you
told me nobody has questioned it in a year. The reason to act is the unit, not the
number — hourly is why you keep losing to the cheaper quote."

**BAD.** "There are a few directions you could go. You could raise prices, or
introduce tiers, or bundle a service package, or test a discount for annual
commitment. Each has trade-offs — it really depends on your goals."

## Step 7: present the price honestly

**Say the price, in plain words.** Prices belong in text the buyer can read, with
each option's detail written out. If one option genuinely has to be "talk to us",
say why in one line — "every site is a different size, so this one is quoted after
a visit". An unexplained "contact us" costs deals you never find out you lost,
because buyers increasingly shortlist before they ever speak to anyone.

**Anchor against something true.** People do not judge a price on its own; they
compare it to whatever is next to it. So whatever you put next to it has to be
real. Three legitimate forms:

1. **What the problem costs now**, or what the current alternative costs.
2. **A higher, real tier presented first** — real meaning someone can actually buy
   it.
3. **The business's own other prices.**

It is fine for a middle option's job to be to sell the top one, as long as every
option is real and buyable. It is not fine to invent an option nobody can buy.

**Banned anchors:** a struck-through price that was never charged; "you would pay
X elsewhere" with nothing recorded behind it; a made-up per-item value.

**If the price runs on usage, units or credits, publish the mechanics before the
number.** Say what one unit buys, whether unused units expire, whether they pool
across people, and what happens at the end of the term. Define the billable event
tightly and say who or what decides whether it happened. A price per outcome is
only as good as the referee.

## Step 8: tiers, if there are tiers

For each tier, one sentence: who it is for, and what problem it solves. If you
cannot write that sentence, the tier came from a feature list and it will produce
the same failure every time — a buyer who needs two things from the top tier gets
pushed up and then discounted back down.

Tiers only make sense when demand genuinely graduates: the same buyer wanting more
of the same value as they grow. **Genuinely different buyers with different jobs get
separate packages, not tiers.**

For a small business with one real offer, two tiers is a sound default, with the
higher one presented first and the lower one appearing when the buyer raises
budget. The two must differ in components the business already has.

## Step 9: the migration path

**A price change with no migration path is a wish.** Name one:

- new customers only,
- existing customers kept on the old price, with an end date or explicitly
  indefinitely,
- the rise comes with something genuinely added,
- the packaging is restructured, so the comparison changes.

**Never raise on a customer who was told their price was locked.** If nobody knows
whether that promise was made, say so plainly and make checking it the first step
before anything moves.

Whichever path is chosen, say when existing customers hear about it and from whom.
A price change lands as a relationship event, not an invoice change.

## Step 10: do not test the number on live buyers

In any sale that involves a conversation, do not run different prices at the same
time to see which converts. A buyer several conversations deep who then sees a
different number loses trust in one click, there are rarely enough deals for the
result to mean anything, and the outcome you actually care about shows up much
later.

Presentation is safe to change: the order of the tiers, their labels, the one-line
description of who each is for. The number is not. If the owner wants to test a
number, use a contained rollout instead — new customers only, one segment, or one
region — and say what would count as it working.

## Step 11: decide the discounts in advance

Pick the three to five things this business will discount for, and the limit on
each. Buying more, buying more than one thing, and committing for longer are the
common three. Write the matrix into the document. A discount given for a reason
that is not on the list is a leak.

And read the pattern as a diagnosis: if the business has to discount to close, the
packaging or the positioning is wrong, and the number is the wrong thing to be
changing. `playbooks/sharpen.md` covers that route.

## Step 12: name the owner and one number to watch

Name who owns this price. For a small business that is almost always the owner
themselves, and saying it out loud matters, because a price with no owner has
nowhere for problems to be raised.

Name one thing the change is meant to move, and where it will be seen, and when to
look again. One number, not a dashboard.

## Step 13: offer to log the decision

If the owner states a real decision, offer to write it to the top of
`brain/decisions.md`, dated today, and write it only on a yes. The entry holds four
things:

- **the decision**,
- **the why**,
- **the trade-off accepted**,
- **what was not decided**.

The most common pricing question a year later is "why did we set it there?" This is
the only thing that answers it. Never rewrite an entry that is already there.

## Where the work lands

- **The owner takes the recommendation** → it flows into the offer document as
  `SKILL.md` describes: a work item at `work/strategy/<slug>.md`, `type: offer`,
  born a draft, carrying the price presentation as shippable wording. It goes
  through the Editor gate and the queue like any other offer round.
- **The owner holds** → no file. Confirm the decision in one line, and offer the
  `decisions.md` entry.
- **The owner wants to think** → no file, no chasing. Leave them the recommendation
  and the one number to watch.

## Banned in pricing

- Any competitor price not recorded in `brain/competitors.md` with its date.
- Willingness-to-pay figures, elasticities or demand curves the business has not
  measured.
- Revenue projections from a price change stated as fact.
- Industry benchmarks presented as facts about this business.
- Conversion or pricing-page "lift" statistics of any kind.
- Fake anchors: a struck-through price never charged; "you would pay X elsewhere"
  with nothing behind it; a made-up per-item value.
- Recommending research the business will never run — a formal willingness-to-pay
  study, a conjoint exercise, a four-hundred-response survey — to a business with a
  few dozen customers.
- A price change with no migration path, or a rise on a customer who was promised a
  locked price.
- A tier whose buyer and problem cannot be stated in one sentence.
- Live price testing on buyers in a considered sale.
- A named framework used to brand the method to the owner. The reasoning stands on
  its own.
- **Any sentence lifted from `examples/`.** Those are written for invented
  businesses and every one of them names the business it belongs to. A real price
  page that contains one is a copy, not a draft.

## The pass bar for a pricing recommendation

Every line must pass. Each has an honest route for a business whose folder is
nearly empty.

**Write the bar out line by line, with a pass or a fail against each line**, in your
reply, before you hand the recommendation over — including when the round produces
no file. A bar you ran in your head did not run, and "all eleven pass" is not the
bar. Show which line said what.

1. States one recommendation — raise, hold, lower, restructure, or set (a first
   price) — within the first two lines, with the reason.
2. Names the current price and where that fact came from — **or**, when a price is
   being set for the first time, says so explicitly.
3. Names the floor (the buyer's next best alternative, including doing nothing) and
   the ceiling (what the outcome is worth), each sourced **or** placeholdered. Cost
   to deliver, where known, is stated as a baseline and not as the basis.
4. States the unit charged on and answers both unit tests: does more of the unit
   mean more value, and does the unit punish us for doing the job well?
5. Cites at least one raise or hold signal with its evidence, and says explicitly
   whether two or more point the same way — **or**, when the price is being set for
   the first time, says so, says the signals do not apply yet because nothing has
   been quoted, and names the first one to watch for.
6. Zero invented market data. Any what-if number is labelled assumed in the same
   breath, names the owner as the person to confirm it, and shows how the
   conclusion changes if it is wrong.
7. If the recommendation changes a price for existing customers, names a migration
   path and confirms nobody was promised a locked price — **or** flags that this is
   unknown and must be checked before anything moves.
8. Names one thing to watch and when to look again.
9. Names who owns the price.
10. If tiers are proposed, each tier's buyer and problem are stated in one
    sentence.
11. Nothing recommended that the business cannot actually do.

When the recommendation becomes an offer document, the full offer bar in
`playbooks/shape.md` applies to that document as well.
