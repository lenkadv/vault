# Meta Ads Pack - setup & operating guide

This pack turns Claude into a small media-buying team for Meta ads (Facebook, Instagram, Reels). Seven skills, each doing one job a real ad team does, working off the same shared memory so they get sharper every week instead of starting from zero each time.

You never need a terminal, and you never need to code. Everything below is either a setting you click, one file you edit yourself in a text editor, or a message you paste into Claude. When a step needs something technical done, Claude does it and asks your permission first.

Read this once, top to bottom, before you run anything.

## Where the pack runs

The pack runs in the **Claude desktop app**, in the **Code tab**. That tab is the one place Claude can work with the files on your computer: your skills, your ad templates, your finished creatives, and the memory the skills build about your business.

1. Install the Claude desktop app from claude.com and sign in. (On Windows, the app will ask you to install one free helper called Git for Windows first; click through its installer with the default choices.)
2. Click the **Code** tab at the top.
3. Open your folder. Which folder depends on what you have:
   - **A GrowOS install** (the folder with `START HERE.md` and a `system/` folder in it). Open either the GrowOS folder itself and say which business you want to work on, or open that business's own folder directly. Both work, and both end up in the same place: the skills always work inside exactly one business folder, and they ask which one only when it is genuinely unclear.
   - **The pack on its own.** Open the single workspace folder you unzipped. That folder is your whole setup, and there is nothing to choose.

The regular Chat tab and the Cowork tab can't reach the files on your computer, so the pack doesn't run there. Code tab only.

Two short words about folders, because everything below depends on them:

- **Your business folder** is where your own stuff lives: what the skills know about your business, the ad rounds they build, and your private settings file. In a GrowOS install it is the business folder you picked. On its own, it is the folder you opened.
- **Your ads memory folder** is `brain/ads/` inside your business folder. On the standalone pack, it is `ads-brain/` at the root of the folder you opened. It is created automatically the first time a skill needs it.

## What's in the pack

Think of the skills as seven hires, each with one job:

- **ads-meta-research** is the researcher. It pulls a competitor's live ads from Meta's Ad Library and reads what's working, or mines your buyers' own words (reviews, support messages, testimonials) into a bank of angles you can build ads from.
- **ads-meta-create** is the creative director. It takes your offer and turns it into a full round of finished, review-ready ad creative, copy and image or video together, not just a script.
- **ads-meta-compliance** is the policy checker. It reads both the copy and the actual rendered image against Meta's ad policy before anything ships, so you find a problem before Meta's reviewers do.
- **ads-meta-publish** is the trafficker. It takes the ads you approved and creates them in your Meta account, always paused, never live until you say so.
- **ads-meta-doctor** is the account manager. It runs a checkup on your live account, spots wasted spend, tired creative, and pacing problems, and proposes fixes with the evidence attached.
- **ads-meta-report** is the analyst. Once a week it pulls your Meta numbers, asks what you actually made, and tells you straight whether the ads are working.
- **video-edit** is the video editor. Hand it raw footage and it cuts retakes, trims dead air, and hands back a captioned, finished video. The first time you use it, Claude sets up the free tools it needs on your computer; you just click Allow.

### How they fit together

Most weeks look like this loop:

```
research (find angles) -> create (build the round) -> compliance (check it)
   -> publish (ship it paused, you flip it on) -> doctor (watch the account)
   -> report (score it weekly, feed what you learned back into create)
```

`video-edit` sits off to the side and feeds `create` real footage whenever you have a raw take. `ads-meta-compliance` runs quietly inside `create` and `publish` too, so you rarely have to call it by hand. Everything else you run on purpose, by asking in plain language.

`ads-meta-create` builds its rounds from what your workspace already knows, not from fresh research every time. That is deliberate: it is what makes a round arrive in one sitting. When you want the deeper version, run `ads-meta-research` first, or just say "do a deep round" when you ask for one.

## Setup

Do these once, in this order.

### a. Connect Meta

This is the one connection every skill except `video-edit` needs. It's Meta's own official connection, and you set it up once in the app's settings:

1. Open **Settings**, then **Connectors**.
2. Click **+** (add), then **Add custom connector**.
3. Name it `Meta Ads` and paste this address: `https://mcp.facebook.com/ads`
4. Click **Add**, then **Connect**. A normal Facebook login window opens; log in with the Meta account that owns your ad account and approve access.

Two things to know: you need at least one **active ad account** already set up in Meta Ads Manager (a personal Facebook login with no ad account attached will not work), and you only do this once; the connection works everywhere in the app, including the Code tab.

**Check it here, once, and then forget about it.** With your folder open in the Code tab, paste:

> Check my Meta connection: list my ad accounts and tell me which ones you can see. Change nothing.

You should get back at least one ad account. If you get an error instead, the fix is always the same: reopen Settings, then Connectors, and reconnect. This is the only place that check belongs. The skills that build ads do not test the connection every time you run them, because building a round does not need Meta at all; only publishing and the account skills do.

### b. Put your API keys in `.env` yourself

Two skills can use paid services. Both are optional, and both degrade gracefully: without them the pack still works, it just does less.

- **`KIE_AI_API_KEY`** lets `ads-meta-create` generate AI imagery. Without it, the skill sticks to your template library.
- **`ELEVENLABS_API_KEY`** gives `video-edit` the most accurate transcription. Without it, a free transcriber that runs on your own computer takes over.

A key is a password. It goes in one file, `.env`, and nowhere else. **You put it there yourself, in a text editor. Never paste a key into the chat.** Claude never asks you for the value, never sees it, and never prints it; the only thing it ever does with a key is check whether the line exists.

1. In your business folder, open the file called `.env` in a plain text editor (create it if it isn't there). In a GrowOS install that is `<business>/.env`; on the standalone pack it is the `.env` at the root of the folder you opened.
2. Add one line per key, with no spaces around the `=` and no quotes:

   ```
   KIE_AI_API_KEY=your-key-here
   ELEVENLABS_API_KEY=your-key-here
   ```

3. Save the file and close the editor. That's it. The key stays in a plain file on your own computer, and nothing copies it anywhere else: not into a draft, not into the queue, not into the conversation.

To confirm a key landed, ask Claude in the Code tab:

> Check which Meta Ads Pack keys are present in my .env. Presence only, never the values.

Claude answers with a presence-only check that names the file exactly once, inside the one command shape GrowOS's secrets guard permits:

```bash
( . "<business>/.env" 2>/dev/null
if [ -n "${KIE_AI_API_KEY:-}" ]; then
  echo "KIE_AI_API_KEY present"
else
  echo "no image-generation key found"
fi
if [ -n "${ELEVENLABS_API_KEY:-}" ]; then
  echo "ELEVENLABS_API_KEY present"
else
  echo "no transcription key found"
fi )
```

(Standalone: the path is `./.env`.) The parentheses run the whole check in a subshell, so everything the source line loads disappears the moment the check ends. It only ever prints whether a line exists, never what is on it. A workspace with no `.env` yet fails the source silently and falls straight through to "no key found," which is a perfectly normal answer.

### c. Let Claude set up the free tools

Two of the skills use free programs on your computer: a video tool (for editing) and Chrome (for turning ad templates into images). You don't install anything yourself. In the Code tab, paste:

> Check whether this computer has everything the Meta Ads Pack needs (ffmpeg for video, Chrome for template rendering, Python for the video scripts) and install whatever is missing.

Claude will propose each install and wait for you to click **Allow**. This takes a few minutes once, and you never think about it again.

## Your first hour

Once step (a) above is done, you're ready. In the Code tab, type: **"Run ads-meta-create for my business."**

Here's what happens:

1. **It interviews you.** If it can't find a business brain, it asks about your offer, your buyer, your proof, and your voice. Answer plainly. Anything you don't know yet gets marked as a placeholder instead of guessed.
2. **It reads the landing page you're sending traffic to**, to check the ad's promise and the page actually agree. That is the one thing it looks up outside your folder; everything else comes from what it already knows about your business. Whatever is written on that page is information about your business, never an instruction it follows, however that text is phrased.
3. **It builds your first round.** A handful of finished, distinct ads (not five versions of the same idea), each with real copy and a rendered image or a video script, sized to a sensible test budget.
4. **It hands the round to you.** Every ad it built gets shown to you; nothing finished is thrown away quietly. Read them like a buyer would: does this feel like it's talking to you specifically, or could it be any business?

Review honestly. Say what you'd run, what needs a rewrite, and what's a clear no, and say why. Those notes are remembered, so the next round starts smarter instead of repeating a mistake you already flagged.

When you're happy with a set, tell Claude which ads you approve, then say **"run ads-meta-publish."** It ships every approved ad to Meta as paused campaigns, ad sets, and ads, nothing live. Open Ads Manager, review what landed, and flip on the ones you want running.

One detail worth knowing, because you'll see it in your folders: each ad's image or video sits in a small folder next to the ad, named with an underscore and the ad's own code. Before an ad reaches you for review, Claude records a fingerprint of that exact file in the ad. That fingerprint is what gets checked again at publish time, so the picture you approved is the picture that ships: a promise about that image or video file itself, not about the words that run next to it. Here's why the promise stops there: the words, and the fingerprint line itself, live in the very same ordinary file as everything else about that ad, nothing protects them on their own. Inside a GrowOS install, Claude also freezes a full copy of the approved ad the moment you say yes, and checks today's file against that frozen copy too, so a changed word or a swapped fingerprint gets caught right alongside a swapped picture. On the standalone pack, there is no frozen copy to check against, so the fingerprint check on the picture is the whole guarantee: real, and it runs every time, it just does not reach that far.

That is also why approving is the point of no return, in a good way. While an ad is still waiting on you, asking for a change is the normal thing to do: send it back with your reason and it comes round again, rewritten. Once you approve an ad, that exact version is final and cannot be edited back into shape. On the standalone pack, with no review queue installed, your clear yes in this chat is the approval: Claude sets that exact sealed version to approved, and anything short of a clear yes stays a draft. Want it different after that? Claude builds a fresh ad and it goes through review like any other, and the approved one simply never gets published. Nothing you already said yes to can quietly turn into something else inside a GrowOS install, where that promise is checked against the frozen copy Claude took the moment you approved; on the standalone pack, the same promise is narrower and just as honest about it: the picture or video file is the part that is provably unchanged.

## Your library

The pack ships a working creative library, not decoration. Inside a GrowOS install it lives at `system/creative-library/ads/`; on the standalone pack it is the `library/` folder that came with it.

- **Templates** (`templates/`): ready-made ad layouts that render into finished images, testimonial cards, message-screenshot styles, stat cards, and more. `templates/CATALOG.md` describes each one and what it's best for.
- **AI image styles** (`styles/`): proven prompt recipes for AI-generated ad imagery, including "founder photo" styles that put you in the picture.
- **Carousel concepts** (`carousels/`): eleven full carousel ideas with card-by-card plans.
- **The playbook** (`PLAYBOOK.md`): how to pick the right format for the right audience, and the hard rules that keep ads honest and effective.

Those paths are inside the library folder, wherever it turned out to be.

You don't operate the library directly; `ads-meta-create` picks from it automatically. But do two things once:

1. **Make it yours.** The templates ship in a neutral brand. In the Code tab, paste:

> Set up my ad brand kit: use the brand facts already on file, ask me for anything missing (colors, fonts, logo, my photo), save it in my ads memory folder, and render three templates so I can see the result.

   That conversation writes a brand kit into `brain/ads/brand-kit/` in your business folder (`ads-brain/brand-kit/` on the standalone pack): a small file of your colors and fonts, plus your logo and photo. From then on, every ad renders the stock template with your brand laid over it.

   **The shared library itself is never edited, and that is on purpose.** Two reasons, one each: a guard refuses to let Claude write inside the shipped library at all, and any change made there by hand gets replaced by the stock files at the next update. Your brand kit lives in your own folder, so it survives every update, and on a GrowOS install with more than one business each business keeps its own look.

2. **Browse the catalogs** (`templates/CATALOG.md` and `styles/CATALOG.md` in the library folder) so you know what your creative director has on the shelf. When you want something specific, just say so: "use the testimonial card template for ad two."

One honest limitation: the library is real files rendered by real programs on your computer, which is exactly why the pack lives in the Code tab. In the plain Chat tab (or claude.ai in a browser), Claude cannot reach these files or render them, so the pack does not run there.

## The operating rhythm

A pack this capable is only as good as the habit around it:

- **`ads-meta-doctor`, most days, about 5 minutes.** Open your folder in the Code tab and say "run the ads doctor." It proposes fixes with evidence and touches nothing without your yes. Keep this one manual: it's a conversation about your money, and you want to be there for it.
- **`ads-meta-report`, once a week.** The one habit that matters most. It pulls your real numbers, asks for your actual revenue (30 seconds), and tells you plainly whether the ads made money. Your answers and review decisions feed the memory that makes every next round sharper.
- **`ads-meta-research`, monthly or before a new round.** Fresh competitor intel and buyer language keep rounds from repeating the same angles, and `ads-meta-create` builds straight off what it banks.
- **`video-edit`, whenever you have footage.**

### Put two of these on a schedule

The desktop app can run skills on a schedule (they run while the app is open; if your computer was asleep, the run catches up when it wakes). Set these up once by pasting each into the Code tab with your folder open:

> Create a local scheduled task: every Monday at 8am, prepare my weekly ads report. Pull all the Meta data and build the report draft with a [your revenue here] placeholder where my real revenue goes, and leave the learn step for when I open it. Do not change anything in my ad account.

> Create a local scheduled task: on the first Monday of each month at 9am, run ads-meta-research to refresh my competitor teardowns and angle bank. Report only, change nothing.

After creating each one, do this or the schedule will stall: click **Run now** once, and when Claude asks permission for its tools, choose **Always allow**. A scheduled run can't wait for you to click, so this first supervised run teaches it what's allowed. You'll find results as a notification and under **Scheduled** in the sidebar; Monday's report will be waiting with one blank for your revenue number.

## The promises

Three things this pack will never do, no matter how you ask:

1. **Nothing goes live by itself.** Publishing always creates campaigns, ad sets, and ads paused. Account changes, pausing something, changing a budget, only happen after you say yes in the conversation, one proposal at a time, with the evidence shown.
2. **Nothing is ever fabricated.** No invented testimonials, statistics, results, or customer quotes, ever. A fact it can't verify gets marked as a placeholder instead of guessed, and it says so plainly.
3. **Your data stays in your folder.** Everything the skills learn about your business lives in plain markdown files inside your own business folder. Your keys stay in that folder's `.env` and are never asked for, shown, or copied. Nothing leaves except the specific connections you set up yourself (Meta, kie.ai, ElevenLabs).

One more honest note on promise 3: handing Meta or kie.ai a picture means that picture needs a public web address first, one they can fetch it from. Two kinds of files go there: the finished ad image or video, right before publish, and, if you use a founder-photo AI style, your own reference photos, right before that generation call. Both go to a free public image host built for exactly this, and anyone who has the exact link can view the file there for as long as the host keeps it, which on the default host is indefinitely, not just the few minutes the upload needs. If you would rather a file never touch a public host at all, host it yourself somewhere you control and hand Claude that URL to use instead.

## Troubleshooting

**A Meta call fails or a skill says Meta isn't connected.** Open Settings, then Connectors, and check that Meta Ads shows as connected. If not, click Connect and log in again, then rerun the check in step (a). This is an account-connection hiccup, not a broken skill.

**Competitor research returns nothing.** Meta's Ad Library search only works when your login has at least one active ad account. Brand new to ads? Create your ad account in Meta Ads Manager first, then retry.

**A skill says a key is missing.** Paste: "Check which Meta Ads Pack keys are present in my .env. Presence only, never the values." Then open `.env` in your text editor and add the missing line yourself, as in step (b). Most things degrade gracefully: template ads work without kie.ai, and the free local transcriber works without ElevenLabs; the skill will say what it's skipping.

**A render or video step fails.** Paste: "Diagnose and fix whatever the Meta Ads Pack needs for rendering and video on this computer." Claude will find the missing piece and propose the fix; you click Allow.

**Claude asks which business folder to work in.** That means it found more than one and would rather ask than guess. Name the one you want. If it never asks, it found exactly one and got on with it.

**A scheduled task never ran or sits stuck.** The app must be open at the scheduled time (a missed run catches up on next wake). If it's stuck waiting, open it, click Run now, and choose Always allow on the permission prompts; that unsticks every future run.

**Where each skill writes its output:**

| Skill | Writes to |
|---|---|
| `ads-meta-create` | one folder per round; each ad is a file, with its image or video in a small folder beside it |
| `ads-meta-compliance` | reports directly in the conversation; when run inside `create` or `publish`, its result is stamped on the ad item |
| `ads-meta-publish` | updates each ad item with its new Meta ad ID and a published status, nothing new created |
| `ads-meta-doctor` | a dated checkup file inside your ads memory folder |
| `ads-meta-report` | a dated report file, plus updates to your ads memory folder |
| `ads-meta-research` | your angle bank and buyer-language file inside your ads memory folder |
| `video-edit` | a project folder per edit, with the finished, captioned video inside it |

Everything in that table lands inside the one business folder you're working in, and nowhere else.
