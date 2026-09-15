# Assets

> This folder holds the files your marketing needs but cannot write: your logo,
> headshots, product photos, screenshots, a brand font, a video clip. Beside them
> sits `index.md`, which describes each one in words — because a folder full of
> `IMG_4471.png` is a folder nobody can use. This README explains the folder; the
> index is the part that gets filled in.

## Why the index is the important half

GrowOS reads text. It cannot open a picture and see what is in it, so an
undescribed image is invisible to the system — it will keep asking you for a
photo that has been sitting right there for months.

One line in `index.md` fixes that: what the file is, what is in it, and when it is
the right one to reach for. That line is what turns a pile of files into something
the system can actually pick from.

## How to add an asset

1. Drop the file in this folder. Keep the name it came with, or give it a plainer
   one — either is fine.
2. Add a line to `index.md` describing it.

That is the whole job. If you add a file and skip the index, nothing breaks — the
file is simply never used, and the Doctor will mention it.

## What belongs here

- Logos, in the versions you actually use.
- Photos of you, your team, your product, your place.
- Screenshots worth reusing.
- Video and audio clips.
- Anything a design or a post might need.

## What does NOT belong here

- **Secrets.** Never a screenshot of a password, a key, an invoice, or a customer
  list. Keys live in the business's private `.env` file and nowhere else.
- **Other people's work**, unless you have the right to use it. If a photo came
  from someone else, note that in the index next to it.
- **Work the system made.** Finished drafts and renders live in `work/`, not here.
  This folder is raw material you brought.

## A note on size

Big video files make the folder slow to sync and slow to copy. If something is too
large to keep here, put it somewhere with a **link anyone can open** — a shared
drive, your video host, wherever it already lives online — and give the index line
that link, marked `external`.

Do not point at a path on this computer. A path like a folder on your desktop
works today, on this machine, for you: it breaks on Windows, breaks on your second
machine, and breaks completely the day you hand this business folder to someone
else. The whole point of the folder is that it travels.
