# Meta advertising policy rulebook

**Version: 2026-07-30.** Every rule here was read off a Meta-published page on
that date. This is the dated file the `compliance-checker` agent checks against,
and the file its verdict names. When the agent and its own memory disagree, this
file wins.

**Scope.** Written for a reviewer that sees **ad text** (primary text, headline,
description, CTA) plus a **written creative brief**. It does not see the rendered
image, the video, or the live landing page. See
[What cannot be checked from text alone](#what-cannot-be-checked-from-text-alone).

**Re-fetch by 2026-10-28** - about 90 days. Six of the source pages carried change
entries within weeks of the fetch, so this file ages fast. Past that date the
agent still uses it and says in its verdict that the rulebook is overdue a check.

## How to use this rulebook

1. Run every rule in sections A-I against the ad and the brief. Section J is
   advice only.
2. A rule **fails only if the draft trips the stated test**. Never fail on a
   feeling. Quote the exact offending span or there is no finding.
3. **Over-blocking is a failure too.** A clean ad that gets failed costs the owner
   a real ad and teaches them to ignore the gate. Read the safe harbours as
   carefully as the rules; they are Meta's own words about what is allowed.
4. If a rule's answer depends on something not in the text or the brief, do not
   guess. Mark it `CANNOT VERIFY` and list it under limits.
5. **House caution is not policy.** The drafting skill has its own extra caution -
   for example it will not brief a before/after image split, because nobody can
   check a picture that does not exist yet. That is a drafting choice, written in
   `SKILL.md`. It is **not** a rule in this file and it is never a finding here.

### Severity tiers

| Tier | Meaning | What the reviewer does |
|---|---|---|
| `reject-risk` | Meta's review would likely disapprove this ad or throttle it. The fix is a copy or brief edit. | Block until fixed. |
| `account-risk` | The violation class is one Meta ties to enforcement on the business asset - ad account, Page, business portfolio. Repeats can disable the account, not just the ad. | Block **and** tell the owner plainly. Never "try it and see". |
| `best-practice` | **Not policy.** Meta's own performance or clarity guidance. Cannot cause a rejection. | Advise only. Never block. |

An ad going live is not a verdict. Meta re-reviews ads after approval and acts
separately on business accounts, up to removing the ability to advertise.

---

## Section A - Personal attributes and privacy

The single highest-frequency trap for a small business, and almost entirely
decidable from text alone.

**The governing rule.** Ads must not contain content that asserts or implies
personal attributes - directly or indirectly - about a person's race, ethnicity,
religion, beliefs, age, sexual orientation or practices, gender identity,
disability, physical or mental health (including medical conditions), vulnerable
financial status, voting status, trade union membership, criminal record, or name.

### The mechanic to internalise

The rule is not "do not mention diabetes". It is **"do not tell the reader you
know something about them."** The same noun passes or fails depending on whether
the sentence points at the product or at the reader.

| Grammar move | Effect | Verdict |
|---|---|---|
| Attribute + product or service, third person or no person | Describes the offer | **Pass** |
| Attribute + `you` / `your` | Asserts the reader has it | **Fail** |
| Attribute + `?` (question form) | Asks the reader to confirm it | **Fail** |
| Attribute + `other` / `fellow` / `too` / `also` / `like you` | Implies the reader is already in the group | **Fail** |
| Attribute + the reader's family (`your spouse`, `your child`) | Asserts knowledge of the family | **Fail** |

Meta says this outright: `you` and `your` are fine on their own. The violation is
`you` **plus** a prohibited attribute.

### Safe harbours - do NOT flag these

- Broad references to attributes that are **not** on the prohibited list, such as
  nationality or city-dweller framing.
- A **passing reference** to an attribute, including gender, age groups, or age
  ranges.
- Names of celebrities or fictional characters.
- `you` and `your` where no prohibited attribute is present.
- Public service announcements about health topics, as long as they do not assert
  that the reader or their family has the condition.

### Contrasting pairs

| Attribute | Fails | Passes |
|---|---|---|
| Physical health | "Do you have diabetes?" | "New diabetes treatment now available." |
| Physical health | "Struggling with your back pain? We fix it." | "Our clinic treats chronic back pain." |
| Mental health | "Anxiety keeping you up at night? Talk to us." | "Therapy for anxiety, booked online in two minutes." |
| Age | "Turning 60 this year? Here's your retirement plan." | "Retirement planning for people approaching 60." |
| Age | "Ready to make your skin look younger?" | "Our night cream targets fine lines." |
| Religion | "Are you Catholic? Join our community." | "A community for Catholic families." |
| Sexual orientation | "Meet other gay men in your city." | "Gay dating, now in your city." |
| Gender identity | "Questioning your gender?" | "Support groups for trans and non-binary people." |
| Disability | "Are you disabled? We can help." | "Mobility equipment fitted at home." |
| Financial status | "Drowning in debt? We'll clear it." | "Debt consolidation, explained in plain language." |
| Criminal record | "Does your record stop you getting hired?" | "We place people with past convictions into skilled work." |
| Name | "Sarah, get this mug with your name on it." | "We print custom mugs with any name." |

### M01 - No asserting or implying a protected attribute of the reader
**Tier:** `reject-risk`
**Test:** Scan for the 14 protected attributes. If one appears **and** the sentence
positions it as something the reader has or is, fail. If it only describes the
product, service, or the business's audience in the abstract, pass.
**Fails:** "You deserve relief from your psoriasis."
**Passes:** "A new topical treatment for psoriasis."

### M02 - `you` / `your` attached to a protected attribute
**Tier:** `reject-risk`
**Test:** Find every `you`, `your`, `yours`, `yourself`. For each, check whether a
protected attribute sits in the same clause or the clause it modifies. If yes,
fail. `you` alone is never a violation.
**Fails:** "Your hearing loss doesn't have to slow you down."
**Passes:** "Hearing aids that don't slow anyone down."

### M03 - Group-membership implication
**Tier:** `reject-risk`
**Test:** Search for `other`, `others`, `fellow`, `too`, `also`, `like you`, `join
the rest of`. If the adjacent noun names a protected group, fail - the word implies
the reader already belongs. Removing that one word usually fixes it.
**Fails:** "Connect with other single parents in recovery."
**Passes:** "A community for single parents in recovery."

### M04 - Question form aimed at a protected attribute
**Tier:** `reject-risk`
**Test:** Extract every question (ends in `?`, or opens with `Are`, `Do`, `Have`,
`Is`, `Did`, `Struggling with`, `Tired of`, `Sick of`, `Ready to`). If it invites
the reader to confirm a protected attribute, fail. Rhetorical framing is no excuse.
**Fails:** "Tired of living with eczema?"
**Passes:** "Eczema relief in three days, or your money back."

### M05 - Attributing a protected characteristic to the reader's family
**Tier:** `reject-risk`
**Test:** Look for `your spouse`, `your partner`, `your mother`, `your father`,
`your child`, `your kids`, `your family`, `a loved one`. If a protected attribute -
especially a medical condition - is predicated of them, fail.
**Fails:** "Get your father treated for dementia this month."
**Passes:** "Specialist dementia care, with places open this month."

### M06 - Implying knowledge of the reader's name or identifiers
**Tier:** `reject-risk`
**Test:** Fail on a first-name token addressed at the reader (`{{first_name}}`,
"Hi [Name]"), or on asking for an identification number. Personalisation offered as
a **product feature** is fine; addressing the reader by name is not.
**Fails:** "Marcus - your custom hoodie is ready."
**Passes:** "Custom hoodies, printed with any name you choose."

### M07 - Implying knowledge of the reader's finances
**Tier:** `reject-risk`
**Test:** Fail on any claim or question presuming the reader's debt, bankruptcy,
credit score, income, arrears, or inability to pay. Describing the **service** that
addresses those situations is allowed.
**Fails:** "Behind on your mortgage? We can stop the repossession."
**Passes:** "We negotiate with lenders to halt repossession proceedings."

### M08 - Implying knowledge of the reader's voting status
**Tier:** `reject-risk`
**Test:** Fail on anything implying the advertiser knows whether the reader has
registered, has voted, or how - "records show", "your ballot", "you haven't voted
yet". Generic civic information passes.
**Fails:** "Your registration is still incomplete - fix it today."
**Passes:** "Check your voter registration status here."

### M09 - Implying knowledge of the reader's medical information
**Tier:** `reject-risk`
**Test:** Fail if the copy states or presupposes that the reader or their family has
been diagnosed with, is suffering from, or is being treated for a condition. Test:
*could a person without this condition read this sentence and find it accurate?*
If no, fail.
**Fails:** "Since your diagnosis, everything has changed. We can help."
**Passes:** "A diagnosis changes everything. Our nurses guide families through the first year."

### M10 - Implying the reader's age, life stage, or appearance-by-age
**Tier:** `reject-risk`
**Test:** Fail on a specific age or birthday addressed at the reader ("now that
you're 65"), on age-bracket second person ("seniors like you"), and on the "look
younger" framing aimed at the reader, which Meta treats as an age implication.
Neutral age-range descriptions of the offer pass.
**Fails:** "Want your face to look ten years younger?"
**Passes:** "This serum reduces the appearance of fine lines in four weeks."

### M11 - No soliciting private information in the ad copy
**Tier:** `account-risk`
**Test:** Fail if the copy asks the reader to reply, comment, or DM with a private
datum: date of birth, address, ID number, bank or card details, health details,
login credentials.
**Fails:** "Comment your postcode and date of birth and we'll check eligibility."
**Passes:** "Check eligibility with our two-question form."

---

## Section B - Health, weight, body image

### Safe harbours - do NOT flag these

Targeting adults 18+, advertisers **can** promote dietary weight-loss and
weight-gain supplements and pills, may show the product in use and its impact, and
may state how long results take. Cosmetic products, procedures and surgeries -
**including before-and-after transformation depictions** - are permitted for 18+.
The 18+ requirement does **not** apply to general wellbeing (fitness services,
gyms, equipment), general food including protein products, non-permanent cosmetics
(creams, makeup, hair products, editing apps), or dental products like whitening.

### M12 - No statements of inferiority about physical appearance
**Tier:** `reject-risk`
**Test:** In weight-loss, weight-gain, or cosmetic copy, fail on terms,
descriptions, or questions that attack a person's appearance, a body part, or
their hygiene. Shorthand: if the sentence would be an insult said to a stranger,
fail.
**Fails:** "Hate your flabby arms? Fix them by June."
**Passes:** "A four-week arm and shoulder programme, built for beginners."

### M13 - No pinched-fat or isolating body-part shots in weight creative
**Tier:** `reject-risk`
**Test:** Read the brief. Fail if it asks for a close-up of a body area with fat
pinched, grabbed, or squeezed, or an equivalent "problem area" isolation shot in a
weight context.
**Fails (brief):** "Tight crop on a waistline, hands pinching a roll of stomach fat."
**Passes (brief):** "Full-body shot of a person mid-workout, gym setting, natural light."

### M14 - No claim that results come from wearing a product alone
**Tier:** `reject-risk`
**Test:** Fail if a weight claim credits a wearable on its own - belt, patch, ring,
band, garment, sticker - with no diet or activity component.
**Fails:** "Wear the band. Lose the weight. That's it."
**Passes:** "Our band tracks activity and pairs with a coached 12-week plan."

### M15 - No cure claims for the named incurable conditions
**Tier:** `reject-risk`
**Test:** Meta's list is exhaustive: diabetes, herpes, thyroid, psoriasis, Ebola,
cancer, autism, Alzheimer's, Parkinson's, ALS, HIV. Fail on any claim to *cure*,
*heal*, *reverse*, *eliminate*, or *get rid of* one of these, including when a
doctor or clinic says it. **Claims about treating or managing symptoms are
explicitly allowed.**
**Fails:** "Our protocol reverses type 2 diabetes for good."
**Passes:** "Our protocol helps people manage blood-sugar swings day to day."

### M16 - No clickbait or unqualified timed outcomes in a health context
**Tier:** `reject-risk`
**Test:** In health or weight copy, fail on sensational language with exaggerated
claims, and on a promise of a specific outcome inside a set timeframe with no
qualifier. **A stated timeframe is allowed when it is qualified** - typical
results, individual variation, alongside diet and exercise.
**Fails:** "Drop 12kg in 14 days. Guaranteed."
**Passes:** "Members lose 4-7kg in their first 12 weeks on average, alongside a calorie-controlled diet. Results vary."

### M17 - No permanent skin whitening or bleaching
**Tier:** `reject-risk`
**Test:** Fail if the product is described as whitening, lightening, or bleaching
skin in a way that permanently changes skin colour.
**Fails:** "Permanently lighten your skin tone in one course."
**Passes:** "Brightening serum that evens out sun spots and dullness."

### M18 - Diet, weight, and cosmetic ads must target 18+
**Tier:** `reject-risk`
**Test:** If the offer is a dietary, health, weight, or cosmetic product,
procedure, or surgery, the ad set must target 18+. From text alone, flag the
**requirement** as a setup instruction and mark the actual targeting unverifiable.
**Fails (brief):** "Weight-loss shake, target 16-45, broad."
**Passes (brief):** "Weight-loss shake, target 18+ only."

---

## Section C - Deception, claims, urgency, ad quality

### M19 - No deceptive or exaggerated claims about success
**Tier:** `account-risk`
**Test:** Fail on a performance claim stated as certain, universal, or
extraordinary and not attributable to a named, checkable basis. Trigger words:
*guaranteed*, *proven to*, *never fails*, *100%*, *everyone*, *overnight*,
*effortless*, *secret*.
**Fails:** "Guaranteed to double your bookings in 30 days."
**Passes:** "Our clients booked 32% more appointments in their first quarter with us."

### M20 - No deceptive or exaggerated health-benefit claims
**Tier:** `account-risk`
**Test:** Fail on health benefits asserted without qualification where the
mechanism is implausible or the benefit is sweeping - "boosts immunity instantly",
"detoxes your organs", "cures fatigue".
**Fails:** "One capsule a day flushes every toxin from your body."
**Passes:** "A daily capsule with vitamin C, zinc, and magnesium."

### M21 - No promised benefit resting on a misrepresented entity or news outlet
**Tier:** `account-risk`
**Test:** Fail if the copy or brief implies endorsement, affiliation, coverage, or
approval by a bank, regulator, government body, trade association, or news
organisation that has not been shown to have granted it - including "as seen on",
press logos, and news-styled creative.
**Fails (brief):** "Creative styled as a news article, masthead reading 'Financial Daily'."
**Passes (brief):** "Plain branded card, our logo, headline stating the service and its monthly price."

### M22 - No unrealistic outcomes or guaranteed results, income claims especially
**Tier:** `reject-risk`
**Test:** Fail on any earnings, revenue, or savings figure presented as an
expectation rather than an illustrated case, and on any outcome framed as
guaranteed or risk-free. Concrete pattern: `[number] + [currency or %] +
[timeframe]` aimed at the reader with no qualifier fails.
**Fails:** "Make £10,000 a month from your spare room. No experience needed."
**Passes:** "Hosts on our platform earned a median of £430 a month last year. Earnings depend on location and availability."

### M23 - No celebrity image plus misleading tactics as bait
**Tier:** `account-risk`
**Test:** Fail if the brief uses a recognisable public figure's image, likeness, or
voice to draw engagement where that figure is not a disclosed, actual endorser -
including AI-generated likenesses and "you won't believe what X said" framing.
**Fails (brief):** "Thumbnail of a well-known TV presenter looking shocked, next to our product."
**Passes (brief):** "Thumbnail of our founder holding the product, name and title on screen."

### M24 - No imagery portraying functionality that does not exist
**Tier:** `reject-risk`
**Test:** Read the brief for fake interface: a play button on a static image, a
fake checkbox, a drawn-on cursor or tap indicator, a fake progress bar, a
simulated notification badge, a fake close X, a fake video scrubber. Meta names the
play button explicitly.
**Fails (brief):** "Static product photo with a large white play triangle overlaid in the centre."
**Passes (brief):** "Static product photo, headline text in the lower third."

### M25 - No withholding information to force the click
**Tier:** `reject-risk`
**Test:** Fail if the ad hides what is being sold so the reader must click to find
out. Test: after reading the ad, can you name the product or service category? If
not, fail. Withholding the **reason** is fine; withholding the **category** is not.
**Fails:** "This one change saved our clients thousands. Click to find out what it is."
**Passes:** "Switching to our fixed-fee bookkeeping saved clients an average of £2,100 a year."

### M26 - No sensationalised or exaggerated language
**Tier:** `reject-risk`
**Test:** Fail on copy that commands a reaction the landing page cannot meet.
Markers: *shocking*, *insane*, *you won't believe*, *doctors hate this*, *banned*,
*they don't want you to know*, plus stacked exclamation marks.
**Fails:** "SHOCKING!! The trick accountants don't want you to see!!!"
**Passes:** "A tax allowance most freelancers miss. Here's how it works."

### M27 - No engagement bait
**Tier:** `reject-risk`
**Test:** Fail if the ad explicitly asks for likes, shares, comments, tags, votes,
or reactions for a purpose other than a genuine call to action. **Carve-outs are
narrow but real:** finding missing people or property, fundraising, sharing a
petition, and time-sensitive disaster or life-threatening information. A genuine
question to readers is not bait.
**Fails:** "LIKE if you agree, SHARE to enter, tag three friends to win!"
**Passes:** "Tap Learn More to see the full range."

### M28 - No fabricated scarcity or false urgency
**Tier:** `reject-risk`
**Test:** **Genuine, accurate deadlines and stock counts are permitted.** Fail when
the scarcity claim cannot be substantiated or resets forever: "only 3 left" on an
unlimited digital product, an always-on countdown, "today only" on an evergreen
campaign, "price goes up at midnight" repeated weekly. Ask the brief: *is this
deadline real and does it actually expire?* If the brief cannot answer, mark
`CANNOT VERIFY` rather than pass.
**Note:** Meta publishes no rule named "false scarcity"; it is enforced as
deception when the claim is untrue. Say that when citing this rule.
**Fails:** "Only 2 spots left - ends at midnight!" on an evergreen digital course.
**Passes:** "Enrolment for the March cohort closes on 28 February."

### M29 - No shocking, sensational, or excessively violent content
**Tier:** `reject-risk`
**Test:** From the brief, fail on imagery that shocks, scares, or disgusts; graphic
violence or torture; highlighted suffering; brandished firearms. Also fail on
visible internal anatomy - organs, bone, muscle tissue - **even in a health
context**, and on weapons pointed at the viewer.
**Fails (brief):** "Extreme close-up of an infected wound with visible tissue."
**Passes (brief):** "Clean product shot of the dressing on a clear background."

---

## Section D - Prohibited content categories

### M30 - No tobacco, nicotine, vapes, or related paraphernalia
**Tier:** `account-risk`
**Test:** Fail on the sale or use of tobacco or nicotine products, related
paraphernalia, or electronic nicotine delivery devices. **The one permitted
adjacent category is cessation products approved by the WHO or the US FDA**, which
must also meet local law.
**Fails:** "Our refillable vape kit - 40 flavours, free delivery."
**Passes:** "FDA-approved nicotine patches, 12-week quit programme included."

### M31 - No illicit or unsafe drugs, supplements, or paraphernalia
**Tier:** `account-risk`
**Test:** Fail on soliciting, selling, or encouraging illicit, recreational, or
potentially unsafe drugs, products, or supplements; on drug paraphernalia; and on
merchandise depicting high-risk drugs. Meta decides "unsafe" at its discretion, so
treat borderline nootropics, SARMs, peptides, and unregulated research chemicals as
failing. **Advocacy, news, and awareness content referencing these substances is
allowed** as long as it does not promote sale or consumption.
**Fails:** "Lab-grade peptides shipped discreetly, no prescription needed."
**Passes:** "A magnesium and B-complex supplement, third-party tested."

### M32 - No weapons, ammunition, explosives, or weapon modification accessories
**Tier:** `account-risk`
**Test:** Fail on promoting the sale or use of weapons, ammunition, or explosives,
including accessories that modify a weapon.
**Fails:** "Drop-in trigger kits, cuts your pull weight in half."
**Passes:** "Steel gun safes with biometric locks."

### M33 - No adult nudity or sexual activity
**Tier:** `reject-risk`
**Test:** From the brief, fail on nudity, explicit or sexually suggestive positions,
or sexually suggestive activity. **Lingerie, swimwear, and undergarments are
permitted** where they do not cross into the above.
**Fails (brief):** "Model on a bed, camera lingering on her body, suggestive posture."
**Passes (brief):** "Model standing, front-on studio shot showing the swimsuit's cut and fabric."

### M34 - No adult sexual arousal products or services
**Tier:** `reject-risk`
**Test:** Fail on sex toys, erotic products, adult entertainment venues,
instructional sexual services, and genital procedures focused on pleasure.
**Sexual and reproductive health products pass** when the focus is health and
medical efficacy and targeting is 18+ - contraception, condoms, lubricant, erectile
dysfunction, menopause, fertility, IVF, femtech apps.
**Fails:** "Our couples' toy, built for better orgasms."
**Passes:** "Clinically-formulated lubricant for comfort during sex after menopause."

### M35 - Other outright-prohibited categories (roll-up)
**Tier:** `account-risk`
**Test:** Fail if the offer falls into any of these: child sexual exploitation;
coordinating harm and promoting crime; dangerous organisations and individuals;
hateful conduct; human exploitation; locally illegal products or services;
misinformation debunked by fact-checkers; vaccine discouragement; sale of human
body parts or fluids; endangered species and peer-to-peer live-animal sales;
historical artifacts; third-party IP infringement and counterfeits; bullying and
harassment; suicide, self-injury and eating disorders; commercial exploitation of
crises; adult sexual exploitation; adult sexual solicitation.
**Fails:** "Limited-run replica handbags - identical to the designer original."
**Passes:** "Our own-design leather tote, made in Spain."

### M36 - No profanity, obscene language, or profane gestures
**Tier:** `reject-risk`
**Test:** Fail on profanity even when obscured, misspelled, or partly censored
inside the word, and on symbol or emoji stand-ins. **Meta permits fully blurred
profanity, bleeped or covered audio when not excessive, and acronyms that do not
themselves spell a profane word.** Read the brief for profane gestures.
**Fails:** "Stop wasting money on sh*tty software."
**Passes:** "Stop wasting money on software that doesn't work."

---

## Section E - Restricted categories needing authorization or extra care

Meta gates several categories behind an application in the **Authorizations and
Verifications tab in Meta Business Suite**. Authorization is per-account and, for
gambling, per-jurisdiction. Running the ad first and applying later is the reliable
way to collect a violation.

### M37 - Alcohol: age and country gating, plus a country blocklist
**Tier:** `reject-risk`
**Test:** If the ad promotes or **references** alcohol - including venues whose
business model depends on alcohol sales, brand or logo depiction, consumption, or
cocktail recipes - it must be age- and country-targeted per local law, minimum 18+.
Meta blocks alcohol ads entirely in a published country list (includes Afghanistan,
Bangladesh, Brunei, Egypt, Gambia, parts of India, Kuwait, Libya, Lithuania, Nepal,
Norway, Pakistan, Russia, Saudi Arabia, Thailand, Turkey, UAE, Yemen) and sets
country minimum ages (US 21, Canada 19, Sweden 25, Japan 20). **No prior written
permission is required.** Flag the requirement; mark actual targeting unverifiable.
**Fails (brief):** "Cocktail bar launch, target 18+, all English-speaking countries."
**Passes (brief):** "Cocktail bar launch, target 18+, UK only."

### M38 - Online gambling and gaming: prior authorization, per jurisdiction
**Tier:** `account-risk`
**Test:** Fail unless the brief confirms the account holds Meta authorization.
Scope is broad: betting, lotteries, raffles, casino games, fantasy sports, bingo,
poker, skill-game tournaments, sweepstakes; any game where something of monetary
value is both entry and prize; and ads whose landing page merely promotes
gambling, including affiliates. 18+ minimum, plus an unsupported-markets list
(Azerbaijan, Bangladesh, Cambodia, Egypt, Hong Kong, India, Indonesia, Korea,
Kyrgyzstan, Malaysia, Mongolia, Myanmar, Pakistan, Philippines, Saudi Arabia,
Singapore, Taiwan, Thailand, Vietnam). **Social casino games with no monetary prize
need no authorization**, but are barred in the same markets and must target 18+.
**Fails:** "Spin to win real cash - new players get £20 free." (no authorization stated)
**Passes:** "Our free puzzle game - compete for leaderboard places, no prizes."

### M39 - Financial and insurance products: 18+, licensing, no data capture in the ad
**Tier:** `reject-risk`
**Test:** Ads for credit cards, loans, or insurance must target 18+ and must not
request personally identifiable or financial information - bank account, card, or
routing numbers. Advertisers may have to verify identity and regulatory
authorization. **Exempt from the authorization burden:** brand ads for banks and
insurers, news articles making no offer, educational content about loans, and ads
that merely mention a product without a route to obtain it.
**Fails:** "Enter your sort code and account number to see your rate instantly."
**Passes:** "See your indicative rate in two minutes. No account details needed."

### M40 - Prohibited loan products and deceptive financial instruments
**Tier:** `account-risk`
**Test:** Fail outright - no authorization exists for these - on payday loans;
paycheck advances; bail bonds; **short-term loans of 90 days or less**; misleading
student-loan consolidation, forgiveness, or refinancing; binary options; contracts
for difference; initial coin offerings; and penny or bidding-fee auctions. For ads
targeting the **United States**, also fail if an investment product invites the
reader into direct messaging with the advertiser.
**Fails:** "Cash in your account by tomorrow, pay it back on payday."
**Passes:** "Personal loans from 24 to 60 months. Representative APR 9.9%."

### M41 - Cryptocurrency: written permission plus a recognised licence
**Tier:** `account-risk`
**Test:** Fail unless the brief confirms written permission from Meta. Required for
exchanges and trading platforms, crypto borrowing or lending, wallets that add
buying, selling, swapping or staking, mining software, and any solicitation to
invest - including affiliates. **Permission is NOT required for:** crypto tax
services; events, education, or news that offer no product; blockchain news;
non-currency blockchain products such as NFTs; storage-only wallets; crypto
products that cannot buy, sell, or trade; and mining **hardware**.
**Fails:** "Stake your coins with us and earn 14% APY."
**Passes:** "A free weekly newsletter explaining blockchain terms in plain English."

### M42 - Dating services: prior written permission, 18+, content limits
**Tier:** `reject-risk`
**Test:** Fail unless the brief confirms written permission via Meta's dating
application form. Covered: online and offline dating, matchmaking, dating
facilitation including profile management and aggregators. Ads must not promote
dating based on monetary transactions, offers to facilitate affairs, or connections
with fictitious people, and creative must not carry sexually suggestive emphasis.
**Not covered, so no permission needed:** relationship-themed entertainment or
literature, and social or meetup apps without matchmaking.
**Fails:** "Discreet affairs. Nobody has to know."
**Passes:** "A walking-and-coffee meetup app for people new to the city."

### M43 - Prescription drugs, over-the-counter medicines, and cannabis
**Tier:** `account-risk`
**Test:** Prescription drugs: fail unless the advertiser is LegitScript-certified
(or a manufacturer cleared by Meta), holds Meta authorization, targets only the US,
Canada, or New Zealand, and targets 18+. OTC medicines: 18+ and local law. THC and
psychoactive cannabis: prohibited. CBD and similar: prior written authorization
plus LegitScript certification, **US only**, 18+. **Education, advocacy, PSAs about
prescription drugs, and general telehealth promotion need no authorization.**
**Fails:** "Full-spectrum CBD gummies, shipped worldwide."
**Passes:** "Book a video consultation with a registered GP."

### M44 - Drug and alcohol addiction treatment
**Tier:** `account-risk`
**Test:** Fail unless the brief confirms LegitScript certification **and** Meta
permission, for any addiction-treatment ad targeting people in the United States.
**Fails:** "Residential detox, beds available this week." (US targeting, no certification stated)
**Passes:** "A free podcast series on what recovery actually looks like."

---

## Section F - Special ad categories

An ad falls into a Special Ad Category when it concerns **housing**, **employment**,
**financial products and services**, or **social issues, elections or politics**.
Credit was folded into the broader financial category, mandatory from 21 January
2025 for advertisers based in the US or showing ads to US audiences.

**What changes.** For housing, employment, and financial ads reaching the US,
Canada, and parts of Europe, these become limited or unavailable: age, gender,
ZIP or postal code, exclusion targeting, lookalike audiences, saved audiences, and
some interests. City or pin-drop locations get an expanded radius. For social
issues, elections or politics: identity authorization, a verified "Paid for by"
disclaimer, and seven years in the public Ad Library.

**A detected special category never blocks an ad by itself.** It is reported so the
owner and the publishing step know what it changes.

### M45 - Housing, employment, and financial ads must declare the category
**Tier:** `reject-risk`
**Test:** Classify the offer. Housing (sale, rent, listings, mortgages, home
insurance), employment (jobs, internships, recruitment, placement services), or
financial products (credit cards, loans, banking, insurance, investment) - and the
advertiser is US-based or reaching US audiences, or reaching Canada or parts of
Europe for credit - then the campaign must be flagged as a Special Ad Category.
Meta says ads may be rejected if no category is chosen. Flag as a build
instruction; the campaign setting is unverifiable from text.
**Fails (brief):** "Recruitment ad for warehouse staff, US, target men 20-35 within 10 miles."
**Passes (brief):** "Recruitment ad for warehouse staff, US, Special Ad Category = Employment, broad audience."

### M46 - Social issue, electoral, or political ads need authorization and a disclaimer
**Tier:** `account-risk`
**Test:** Fail if the ad is by, on behalf of, or about a candidate, political
figure, party, or PAC; advocates an election outcome; is about an election,
referendum, or ballot initiative including get-out-the-vote; **is about any social
issue in the place the ad runs**; or is regulated as political advertising - unless
the brief confirms authorization and a verified "Paid for by" disclaimer. The trap:
a commercial business posting advocacy content about a social issue is caught by
this rule.
**Fails:** "Sign our petition to change the immigration rules." (no disclaimer stated)
**Passes:** "Our new range, made in the UK."

### M47 - Generative-AI content in political ads must be disclosed
**Tier:** `account-risk`
**Test:** For a social issue, electoral, or political ad, fail if the brief
indicates a photorealistic image, video, or realistic audio made or edited with
third-party generative AI that depicts a real person saying something they did not,
depicts a realistic person or event that does not exist, or alters footage of a
real event - and no disclosure is stated.
**Fails (brief):** "AI-generated footage of the local MP appearing to endorse the campaign."
**Passes (brief):** "Filmed statement from our own spokesperson, disclosed as AI-upscaled audio."

### M48 - No discriminatory content or wrongful exclusion
**Tier:** `account-risk`
**Test:** Fail on content that discriminates or encourages discrimination on race,
ethnicity, colour, national origin, religion, age, sex, sexual orientation, gender
identity, family status, disability, or medical or genetic condition - and on
briefs that wrongfully target or wrongfully **exclude** groups. Bites hardest on
housing, employment, and financial offers.
**Fails:** "Ideal for young professionals only - no families."
**Passes:** "Two-bedroom flat, close to transport links and the primary school."

### M49 - Political ads cannot run in the European Union
**Tier:** `account-risk`
**Test:** Fail if the brief targets the EU with social issue, electoral, or
political content. The only carve-out is time, place, and manner of voting
information placed by EU election authorities.
**Fails (brief):** "Awareness campaign on national energy policy, target Germany and France."
**Passes (brief):** "Awareness campaign on our own energy tariff, target Germany and France."

---

## Section G - Relevance, landing page, systems, formatting

### M50 - The landing page must offer what the ad promotes
**Tier:** `reject-risk`
**Test:** Compare the product or service named in the ad against the destination in
the brief. Fail if they differ in kind - different product, a bridge page, a
generic homepage when a specific offer was advertised, or a page whose price
contradicts the ad.
**Fails:** Ad reads "£29 starter kit"; brief says the link goes to the homepage where the kit is £49.
**Passes:** Ad reads "£29 starter kit"; brief says the link goes to the starter-kit page at £29.

### M51 - The ad must clearly represent the business, and every component must be relevant
**Tier:** `reject-risk`
**Test:** Fail if the brand or business is not identifiable from the ad, or if any
component - text, image, video, music - is unrelated to what is being sold.
**Fails (brief):** "Stock photo of a sports car, to stop the scroll. We sell accounting software."
**Passes (brief):** "Screenshot of our dashboard with the monthly-close view open."

### M52 - The post-click experience must not be low quality
**Tier:** `account-risk`
**Test:** From the brief's description of the destination, fail on: thin or
unoriginal content; a disproportionate volume of ads to content; pop-ups or
interstitials that disrupt (legally required disclosures and paywall logins are
exempt); content split across pages to force clicks; and misleading
representations of the product, shipping times, support, or customer feedback.
**Fails (brief):** "Landing page shows 3-5 day delivery; actual fulfilment is 3-4 weeks from overseas."
**Passes (brief):** "Landing page states 3-4 weeks delivery, shipped from our overseas warehouse."

### M53 - The destination domain must not be restricted
**Tier:** `account-risk`
**Test:** Fail and escalate if the brief indicates the domain has had ads rejected
for promoting restricted domains, or is a newly registered redirect or cloaking
domain. Meta blocks identified domains for 60 days at a time and rejects every ad
pointing at them.
**Fails (brief):** "Link through a fresh redirect domain because the main site keeps getting flagged."
**Passes (brief):** "Link direct to our primary domain."

### M54 - No circumventing systems or inauthentic assets
**Tier:** `account-risk`
**Test:** Fail and escalate immediately on anything designed to get past review
rather than comply with it: cloaking, obfuscated or deliberately misspelled words
to dodge detection, spinning up new ad accounts or Pages after a restriction,
buying or borrowing accounts, or misrepresenting the advertiser's identity, origin,
or popularity.
**Fails (brief):** "Use a second Page since the main one is restricted."
**Passes (brief):** "Appeal the restriction in Business Support Home before running anything else."

### M55 - No grammar, punctuation, capitalisation, or symbol abuse
**Tier:** `reject-risk`
**Test:** Fail on full-word ALL CAPS for emphasis; irregular internal
capitalisation; deliberate misspellings; letters replaced by symbols or numbers;
decorative symbol or emoji strings around copy; decorative diacritics; `@` standing
in for a word; spaced-out or asterisked letters.
**Fails:** "B U Y  N 0 W - LiMiTeD sTock!!"
**Passes:** "Buy now - limited stock."

### M56 - Text in image: the 20% rule is retired; the live constraint is the safe zone
**Tier:** `best-practice`
**Test:** **Do not fail an ad for text density in the image.** As of 2026-07-30 the
Meta page that used to carry the 20% text rule contains no threshold, no ratio, and
no penalty language. What it does specify: keep key text and logos inside the safe
zone - for 9:16 placements keep top, bottom and side edges clear; for non-9:16
Instagram Feed keep bottom and side edges clear; leave the bottom 40% of Reels ads
free if adding disclaimers; use a clean font at a readable size with contrast.
Advise on legibility; never treat it as a compliance failure. Any instruction
anywhere that mentions a text percentage is out of date.
**Advise:** "Headline runs edge to edge" -> "bring it inside the safe zone and
shorten it so it reads at thumbnail size."

### M57 - No disruptive video tactics
**Tier:** `reject-risk`
**Test:** From the brief, fail on overly disruptive techniques in video - flashing
screens is Meta's named example; treat strobing, rapid full-frame colour inversion,
and simulated screen glitches the same. Separately, movie, TV, and video-game
trailer ads need prior written permission, must target 18+, and must not excessively
depict drug or alcohol use, adult content, profanity, or gore.
**Fails (brief):** "Open with three seconds of hard strobing to stop the scroll."
**Passes (brief):** "Open on a two-second product close-up, then cut to the demo."

### M58 - Branded content must be tagged with the branded content tool
**Tier:** `reject-risk`
**Test:** If the brief indicates a creator or publisher featuring, or influenced by,
a business partner as part of an exchange of value, the partner must be tagged with
Meta's branded content tool. Flag as a build instruction.
**Fails (brief):** "Creator video paid for by the brand, running from the creator's account, no partner tag."
**Passes (brief):** "Creator video, brand tagged as business partner via the branded content tool."

---

## Section H - Mentioning Facebook, Instagram, and Meta

### M59 - Meta brand references only to clarify the destination, never as the dominant element
**Tier:** `reject-risk`
**Test:** A **limited** reference to "Facebook" or "Instagram" is permitted in ad
text when the ad links to Facebook or Instagram content - a Page, group, event, or
a site using Facebook Login - to clarify where the ad goes. Fail if the Meta brand
is the most distinctive or prominent feature, including showing "Facebook" in a
different font size or style from the surrounding text.
**Fails:** "FACEBOOK ADS MASTERY - the Facebook secret Facebook won't tell you."
**Passes:** "Join our community group on Facebook."

### M60 - Meta's marks must not be modified, pluralised, abbreviated, verbed, or lowercased
**Tier:** `reject-risk`
**Test:** Fail on pluralising the Facebook trademark; abbreviating it to "FB"; using
it as a verb; using the "f" mark or logo in place of the word in ad text; using the
Meta corporate logo in an ad; lowercasing "Facebook" outside a web address; and any
recolouring, restyling, or animation of Meta brand assets.
**Fails:** "Just FB us, or facebook me - we reply in minutes."
**Passes:** "Message us on Facebook - we reply in minutes."

---

## Section I - Lead ads

### M61 - Instant forms must not request the prohibited information types
**Tier:** `reject-risk`
**Test:** If the brief includes lead-form questions, fail on any of Meta's
prohibited types: account numbers (loyalty, cable, telephone); criminal or arrest
history; financial information (card or bank numbers, routing numbers, credit
score, net worth, income, bankruptcy or debt status); government identifiers
(social security, driving licence, photo ID, passport, military ID); health
information about the person or their family; insurance information; political
affiliation or voting intent; race or ethnicity; religious or philosophical
beliefs; sexual orientation or sexual life; information substantially similar to
the prefill fields; trade union membership; login credentials; a child's date of
birth. An offending form means the lead ad will not run.
**Fails (brief):** "Form fields: name, email, current medications, approximate household income."
**Passes (brief):** "Form fields: name, email, which service you're interested in, preferred callback time."

### M62 - Ad copy must not ask readers to submit personal or financial details
**Tier:** `account-risk`
**Test:** Distinct from M61, this covers the **ad text**. Fail if the copy directs
the reader to supply personally identifiable or financial information - in a
comment, a DM, or a form reached from the ad.
**Fails:** "DM us your card details and we'll reserve your place."
**Passes:** "Tap Book Now and pay securely at checkout."

---

## Section J - Best practice (advice only, never blocking)

### M63 - Keep branding cohesive across Page, ad, and landing page
**Tier:** `best-practice`
**Test:** Advise if the business name, logo, or tone differs noticeably between the
Page, the ad, and the landing page.

### M64 - One message, one call to action
**Tier:** `best-practice`
**Test:** Advise if the creative carries several competing messages or CTAs. Meta's
own guidance: an ad usually has only one call to action.

### M65 - Set realistic expectations in both ad and landing page
**Tier:** `best-practice`
**Test:** Advise where the ad's description of features outruns what the brief says
the product does - short of the deception threshold in M19 and M22.

---

## What cannot be checked from text alone

The reviewer echoes this list, or the relevant part of it, in every verdict.
Passing this rulebook is **not** the same as passing Meta's review.

1. **The rendered image or video.** Nudity, suggestiveness, gore, visible anatomy,
   weapons, profane gestures, pinched-fat framing, fake play buttons, strobing, and
   text position relative to the safe zone are all decided on the pixels. A brief
   describes intent; the render decides. Every rule here sourced to a brief is
   provisional.
2. **The live landing page.** M50, M52, and M53 depend on what actually loads: real
   price, real stock, real delivery time, real pop-ups, whether the page works.
3. **Campaign and ad-set settings.** Age and country targeting (M18, M37, M38, M42,
   M43), Special Ad Category selection (M45), exclusion and lookalike audiences
   (M48), and the branded content tag (M58) live in Ads Manager, not in copy.
4. **Authorization and certification status.** Whether the account holds Meta
   permission for gambling, crypto, dating, prescription drugs, CBD, addiction
   treatment, or political ads (M38, M41, M42, M43, M44, M46), and whether a licence
   is on file (M39), is account state.
5. **Truth of factual claims.** M19, M22, and M28 test *form*, not *fact*. Whether a
   figure is real, whether a deadline actually expires, whether a testimonial is
   genuine - none of that is decidable from a draft. Where truth is load-bearing,
   return `CANNOT VERIFY` and ask the owner.
6. **Account and domain history.** M52, M53, and M54 turn on prior enforcement and
   prior low-quality signals attached to the Page, domain, or ad account.
7. **Local law.** Meta requires compliance with local law and industry codes on top
   of its own standards. This file encodes no national advertising law and is not
   legal advice.
8. **Policy drift.** Meta revises these pages continuously. Several carried change
   entries within weeks of the 2026-07-30 fetch: Health and Wellness 22 Jul 2026,
   Social Issues 1 Jul 2026, Gambling 18 May 2026, Financial Services 30 Apr 2026,
   Crypto 15 Apr 2026, Unacceptable Business Practices 20 Mar 2026. **Re-fetch
   before relying on this file after roughly 90 days.**
9. **Review is probabilistic and repeats.** Meta says its review may not catch every
   violation, and that ads stay subject to review after going live. A clean pass
   here lowers risk; it does not create an approval.

---

## Rule count by tier

| Tier | Count | Rule ids |
|---|---|---|
| `reject-risk` | 39 | M01-M10, M12-M18, M22, M24-M29, M33, M34, M36, M37, M39, M42, M45, M50, M51, M55, M57, M58, M59, M60, M61 |
| `account-risk` | 22 | M11, M19, M20, M21, M23, M30, M31, M32, M35, M38, M40, M41, M43, M44, M46, M47, M48, M49, M52, M53, M54, M62 |
| `best-practice` | 4 | M56, M63, M64, M65 |
| **Total** | **65** | M01-M65 |

## Where these came from

All pages fetched 2026-07-30 from Meta's own Transparency Center (Advertising
Standards) and the Meta Business Help Center. No third-party source is the basis
for any rule here. The starting points for a re-fetch:

- Advertising Standards index: `https://transparency.meta.com/policies/ad-standards/`
- Privacy Violations and Personal Attributes (Section A)
- Health and Wellness (Section B)
- Unacceptable Business Practices, and the Advertising policy basics checklist (Section C)
- Restricted goods and services pages: alcohol, gambling, financial services,
  cryptocurrency, dating, drugs and pharmaceuticals (Section E)
- Ads about Social Issues, Elections or Politics, and the Special Ad Category help
  pages (Section F)
- Ad quality, text overlays and the safe zone, brand usage, prohibited instant-form
  questions (Sections G-I)

Three known quirks in the sources, kept so nobody re-discovers them the hard way:

1. `transparency.meta.com` is JavaScript-rendered and geo-redirects. A plain fetch
   returns nothing. Force the `/en-us/` locale in a real browser session.
2. Meta's own Personal Attributes example table carried a copy-paste error on
   2026-07-30: the "allowed" example under vulnerable financial status is the same
   sentence used as a violation elsewhere. Do not treat it as a safe harbour.
3. The retirement **date** of the 20% text rule is not verified against any Meta
   page. What is verified is that the rule is **absent** from the current page.

Every violating and clean example phrase in this file is invented for illustration.
None is any real advertiser's copy.
