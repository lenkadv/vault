# Render or brief

This is the one decision every image-producing skill in GrowOS makes the same
way: render the real file when the business has its own image-generation key,
or hand over a design brief precise enough that the file can still get made -
by a human, or by a render later. `image-create` owns this file.
`carousel-create` and `youtube-thumbnail` point back to it instead of solving
the same problem twice. If you are building or changing one of those skills,
edit this file, not a copy of it.

This file is provider-neutral by design. It names the exact `.env` keys to
look for, the fixed order to check them in, and the request/response shape
for the providers documented so far. Adding a provider later means adding to
this file - see the last section.

## The rule, in one paragraph

Check `.env` for an image-generation key. Never read what the key's value
*is* - only whether the line is there. Key found: call that provider, wait
for the real file, save it to disk, and say so. Key missing, or the call
fails for any reason: ship the design brief instead, and say plainly why.
A brief is never a lesser thing to apologize for - it is the honest result
when there is no way to render. What is never acceptable is saying "here is
your image" when what actually happened is a brief, or when a render was
attempted but never actually finished and saved.

## The env key convention

Two ways a business can turn rendering on. Either is fine; check both.

**1. The generic pair (recommended default to tell an owner about):**

| Key | Holds |
|---|---|
| `IMAGE_API_KEY` | The API key itself |
| `IMAGE_API_PROVIDER` | Which provider that key belongs to: `kie`, `openai`, or `replicate` |

**2. A provider-specific key, used directly (no second variable needed - the
name says which provider it is):**

| Key | Provider |
|---|---|
| `KIE_AI_API_KEY` | kie.ai - the same key `ads-meta-create` already uses for AI ad imagery, if this business has one set up |
| `OPENAI_API_KEY` | OpenAI's image API |
| `REPLICATE_API_TOKEN` | Replicate |

Check in this fixed order, and stop at the first one found:

1. `IMAGE_API_KEY` - if present, also read `IMAGE_API_PROVIDER` to know which
   provider to call. If that second variable is missing or not one of `kie` /
   `openai` / `replicate`, treat it the same as "no usable key": say so in one
   line (key found, provider not set or not recognized) and fall back to the
   brief. Do not guess a provider.
2. `KIE_AI_API_KEY`
3. `OPENAI_API_KEY`
4. `REPLICATE_API_TOKEN`
5. None found - brief only, no need to explain further than that.

If more than one of these happens to be set, the order above decides which
one gets used. Say which one, so it is never a silent choice.

## Step 1: check for a key (presence only, never the value)

**Never name the `.env` path in any other command.** GrowOS's secrets guard
denies every command segment that names it unless the segment's first word
is `.` or `source` - that catches a silent `grep -q`, a `test -f`, even a
bare `ENV_FILE="<business>/.env"` sitting alone on its own line. The
subshell below is the one sanctioned shape; do not split the path out into
its own line or check it any other way.

```bash
( . "<business>/.env" 2>/dev/null
if [ -n "${IMAGE_API_KEY:-}" ]; then
  echo "IMAGE_API_KEY present, provider: ${IMAGE_API_PROVIDER:-not set}"
elif [ -n "${KIE_AI_API_KEY:-}" ]; then
  echo "KIE_AI_API_KEY present"
elif [ -n "${OPENAI_API_KEY:-}" ]; then
  echo "OPENAI_API_KEY present"
elif [ -n "${REPLICATE_API_TOKEN:-}" ]; then
  echo "REPLICATE_API_TOKEN present"
else
  echo "no image-generation key found"
fi )
```

The parentheses run the whole check in a subshell, so every variable the
source line loads disappears the moment the check ends - nothing leaks into
the rest of the session. This only ever prints whether a line exists and,
for the generic pair, which provider name follows it - never the key
itself. A business with no `.env` file yet just fails the source silently
(`2>/dev/null`) and falls straight through to "no image-generation key
found," so there is no separate file-existence check to write. That is the
whole check.

## Step 2: render (a usable key was found)

What this step needs from the calling skill before it starts: the prompt (built
from the design brief - see the calling skill's own steps for how that brief
gets made), the target dimensions, and the exact file path to save to. This
file only does the render and the save; it never decides where the output
belongs - that is the calling skill's job (parts folder placement, sealing,
all of it).

Source the key into the shell first, so it exists as an environment variable
and never has to be typed, printed, or pasted anywhere:

```bash
set -a; source "<business>/.env"; set +a
```

Then resolve whichever key was found into ONE variable, `$IMG_KEY`, so the
calls below never depend on which env name the owner happened to use. This
matters: the recommended generic pair puts the key in `$IMAGE_API_KEY` (with
`$IMAGE_API_PROVIDER` naming the provider), while a provider-specific name puts
it in its own variable. Without this step, a call that hardcodes one name sends
an EMPTY token whenever the owner used the other convention.

```bash
# $IMG_KEY = the actual key, whatever env name held it (never printed).
if [ -n "$IMAGE_API_KEY" ]; then IMG_KEY="$IMAGE_API_KEY";
else IMG_KEY="${KIE_AI_API_KEY:-${OPENAI_API_KEY:-$REPLICATE_API_TOKEN}}"; fi
```

The PROVIDER is `$IMAGE_API_PROVIDER` when the generic pair was used, otherwise
it is implied by which provider-specific key was present (from the fixed order
above). Then call that provider, always passing `$IMG_KEY` — never a
provider-specific name — so both conventions work. The three documented so far:

### Never put prompt text through the shell

The prompt is marketing copy, and copy is never safe to drop straight into a
shell command. A single ordinary apostrophe - "today's sale," "here's why" -
closes a single-quoted string early and turns the rest of the line into
commands the shell runs next. This is not an edge case; it fires on
completely normal copy, and even more so on anything pasted in from a
testimonial or a fetched page. So the prompt's actual text never appears
literally inside a `curl` or `bash` command line. Instead, for every
provider below:

1. Save the prompt text itself to `<save path>.prompt.txt` (same folder as
   the image, using the Write tool - never a shell heredoc or `echo`, since
   the Write tool never hands the text to a shell to interpret).
2. Build the JSON request body with a small `python3 -c` script. It takes
   only file PATHS and fixed values (model name, size, ratio) as its
   arguments - safe, because those are chosen by the skill, not pasted from
   copy - reads the actual prompt bytes out of the file from step 1, and
   writes the finished JSON to `<save path>.request.json` using
   `json.dump`, which escapes anything that needs it automatically.
3. POST that file with `curl ... -d @<save path>.request.json` - the `@`
   tells curl to read the body from the file, so the prompt's bytes never
   cross the shell's quoting or word-splitting rules at all.
4. Once the call has finished - image saved, or the render has definitely
   failed - delete both `.prompt.txt` and `.request.json`. They are scratch
   working files, not something that needs to stick around.

### kie.ai (`KIE_AI_API_KEY`, or `IMAGE_API_KEY` + `IMAGE_API_PROVIDER=kie`)

Same base and call shape `ads-meta-create` already uses for ad imagery - kept
identical on purpose so a business with one kie.ai key gets both skills for
free.

```bash
python3 -c '
import json, sys
model, prompt_path, ratio, out_path = sys.argv[1:5]
prompt = open(prompt_path, encoding="utf-8").read()
json.dump({"model": model, "input": {"prompt": prompt, "output_format": "png",
           "aspect_ratio": ratio}}, open(out_path, "w"))
' "<image model name>" "<save path>.prompt.txt" "<e.g. 1:1>" "<save path>.request.json"

curl -s -X POST "https://api.kie.ai/api/v1/jobs/createTask" \
  -H "Authorization: Bearer $IMG_KEY" \
  -H "Content-Type: application/json" \
  -d @"<save path>.request.json"
```

Returns a `task_id`. Poll until done:

```bash
curl -s "https://api.kie.ai/api/v1/jobs/recordInfo?taskId=<task_id>" \
  -H "Authorization: Bearer $IMG_KEY"
```

Poll every few seconds until `data.state` is `success` (or `fail` - that is a
failed render, go to Step 3). The image URL(s) are in
`data.resultJson.resultUrls`. Download the file and save it to the path the
calling skill gave you.

### OpenAI (`OPENAI_API_KEY`, or `IMAGE_API_KEY` + `IMAGE_API_PROVIDER=openai`)

```bash
python3 -c '
import json, sys
prompt_path, size, out_path = sys.argv[1:4]
prompt = open(prompt_path, encoding="utf-8").read()
json.dump({"model": "gpt-image-1", "prompt": prompt, "size": size, "n": 1},
          open(out_path, "w"))
' "<save path>.prompt.txt" "<nearest supported preset>" "<save path>.request.json"

curl -s -X POST "https://api.openai.com/v1/images/generations" \
  -H "Authorization: Bearer $IMG_KEY" \
  -H "Content-Type: application/json" \
  -d @"<save path>.request.json"
```

OpenAI's image sizes are fixed presets, not arbitrary width x height - pick
the closest supported preset to the target dimensions and say plainly in the
report if it does not match exactly (the calling skill can crop or pad after
saving if the exact size matters). The response carries base64 image data
(`data[0].b64_json`) or a URL depending on the API version in use - decode or
download it, then save to the given path.

### Replicate (`REPLICATE_API_TOKEN`, or `IMAGE_API_KEY` + `IMAGE_API_PROVIDER=replicate`)

```bash
python3 -c '
import json, sys
version, prompt_path, w, h, out_path = sys.argv[1:6]
prompt = open(prompt_path, encoding="utf-8").read()
json.dump({"version": version, "input": {"prompt": prompt, "width": int(w),
           "height": int(h)}}, open(out_path, "w"))
' "<model version id>" "<save path>.prompt.txt" "<w>" "<h>" "<save path>.request.json"

curl -s -X POST "https://api.replicate.com/v1/predictions" \
  -H "Authorization: Token $IMG_KEY" \
  -H "Content-Type: application/json" \
  -d @"<save path>.request.json"
```

Note the header says `Token`, not `Bearer` - Replicate is the one exception.
Returns a prediction id. Poll `GET /v1/predictions/<id>` until `status` is
`succeeded` (or `failed`/`canceled` - go to Step 3). Output URL(s) are in the
`output` field. Download and save.

### Any other provider

Same shape every time: submit the prompt and size, poll or wait for the
result, download the real file, save it to the given path. Verify the exact
endpoint and field names against that provider's own current docs before the
first call - API surfaces drift; this file documents the pattern, not a
frozen contract.

### A caution worth repeating: on-image text

Most image models mangle small baked-in text. If the brief calls for exact
overlay copy (a headline, a specific word), either keep the generation prompt
free of that text and plan for it to be added separately, or generate the
image and say plainly in the report that the on-image text may not read
exactly as written - never present a render with garbled text as if it
matches the brief.

### If the render fails

A non-success status, a timeout, an empty result, a network error, a file
that will not download - all of these mean the render failed. Do not retry
silently forever; try once more if the failure looks transient (a timeout,
a 5xx), then stop and go to Step 3. Say what broke, in one plain line.

### Verify the download before calling it Rendered

A file sitting at the target path is not proof it is a real image - a
provider error page or a transfer that died partway through both leave a
file there too. Before this counts as Rendered, check all three:

- **Non-empty.** The file is not 0 bytes.
- **A plausible size.** At least a few KB - a real render, an error page,
  and a truncated transfer land in very different size ranges.
- **The right magic bytes.** The file starts with the signature for its
  format: PNG starts with `\x89PNG`, JPEG with `\xFF\xD8\xFF`. `file <path>`
  or reading the first few bytes both work.

Any of these fail: this was not a render, whatever the provider's status
said. Treat it exactly like a render that failed - go to Step 3 for the
brief, and say plainly what broke. Never seal a file that fails this check.

## Step 3: ship the brief (no key, or the render failed)

The brief is not a stub - it has to be precise enough that someone could
build the exact image from it without asking a follow-up question. Use this
shape:

```markdown
## Design Brief

**Made for:** [platform or use, e.g. Instagram feed post]
**Dimensions:** [width] x [height] px ([aspect ratio])

### Copy overlay
- Headline: "[exact text]"
- Subhead: "[exact text, or "none"]"
- Any other on-image text: "[exact text]"

### Brand tokens
- Background: [hex or named color, from brain/brand.md's Colors section]
- Text: [hex or named color]
- Accent: [hex or named color]
- Heading font: [name, weight]
- Body font: [name, weight]

### Layout
[Where each element sits, specifically - "headline top-left, 80px margin,
logo bottom-right" not "nice clean layout." A designer should be able to
place things from this alone.]

### Mood and style
[One or two lines, pulled from brand.md's Image style and Look-and-feel
sections - bright/moody, real photos/illustrations, busy/clean.]

### Visual elements
[Background treatment, shapes, photo or illustration direction, icons]

### Why this is a brief and not a render
[One honest line: no image-generation key found in .env, or the render was
attempted and failed - say what broke.]
```

Any brand token the brief needs but `brain/brand.md` does not have gets
`[PLACEHOLDER: what's missing]` - never an invented hex code or font name.

## What this step hands back

Exactly one of these two, never both, always stated plainly:

- **Rendered:** the saved file's path, which provider made it, and the
  prompt/spec used - only after it has passed the verification check above -
  so the calling skill can hash and seal it if it is going to publish.
- **Briefed:** the full brief text above, plus the one-line reason it was a
  brief instead of a render.

Never say a render happened unless the file is actually sitting on disk at
the path reported. Never say "here's your image" for a brief.

## Setup guidance for the owner

If the owner asks how to turn rendering on, walk them through this in plain
words - never ask them to paste the key into chat:

1. Pick a provider. kie.ai is the easiest starting point (and doubles as the
   same key `ads-meta-create` uses for ad imagery, if that is already set
   up); OpenAI or Replicate both work fine too if the owner already has an
   account there.
2. Get an API key from that provider's own site (kie.ai, platform.openai.com,
   or replicate.com).
3. Open the business's `.env` file and add one line - either the generic pair:
   ```
   IMAGE_API_KEY=their-key-here
   IMAGE_API_PROVIDER=kie
   ```
   or a provider-specific line instead:
   ```
   KIE_AI_API_KEY=their-key-here
   ```
4. Save the file. Nothing needs restarting - the next `image-create` run
   checks for it fresh.
5. This is a paid API, billed per image by the provider. Point the owner at
   that provider's own pricing page rather than guessing a number.

If the owner pastes a key into chat anyway, do not repeat it back or write it
anywhere except telling them it belongs in `.env` - confirm it is saved and
move on.

## Adding a new provider later

Pick its env key name (provider-specific and self-describing, the same
pattern as the three above - e.g. `STABILITY_API_KEY`), add it to the
presence-check order in "The env key convention," and add its submit / poll /
download shape under Step 2. Every skill that points to this file picks up
the change automatically - do not fork this logic into another skill's own
reference file.
