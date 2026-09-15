# The board view (optional, and the owner turns it on)

Some owners want their work shown as columns they can drag work across, instead
of a list. Obsidian cannot do that on its own. The columns come from a free
community add-on called Base Board. GrowOS ships with no community add-ons at
all, so this is always something the owner switches on for themselves, and never
something GrowOS installs, downloads, or copies in for them.

## Three rules that do not bend

1. **Never put a board view inside `GrowOS Queue.base`.** It is one of GrowOS's
   own files, so your editing tools are blocked there anyway — but the real
   reason is that every owner WITHOUT the add-on would then open their queue to
   an error message instead of their work. The board always lives in its own,
   separate file.
2. **Never install the add-on for them.** They install it inside Obsidian, where
   Obsidian's own "do you trust this" prompt covers the decision. That prompt is
   theirs to answer, not yours to work around.
3. **Never tell them the board works until they say they can see it.** You cannot
   see their screen, and the add-on may not be switched on yet.

## What to say when they ask for a board

Tell them plainly: the board needs one free add-on inside Obsidian, they turn it
on themselves in three steps, and you will build the board the moment it is on.

1. Open Settings, go to Community plugins, and turn off Restricted mode.
2. Choose Browse, search for **Base Board**, then Install, then Enable.
3. Come back and tell you it is on.

If their Obsidian is older than **1.10.2**, the add-on will not run. Ask them to
update Obsidian first, then start again at step one.

If they would rather not add anything, that is a fine answer. The queue already
groups their work by status in the **Board** view — same information, stacked
instead of side by side. Say so and leave it there.

## Building the board file

Once they confirm the add-on is on, write a NEW file at the top level of their
GrowOS folder, called `GrowOS Board.base`:

```yaml
filters:
  and:
    - file.ext == "md"
    - file.path.contains("/work/")
    - status.isTruthy()
    - '!file.path.contains("/_")'
    - '!file.path.startsWith("_")'
properties:
  note.business:
    displayName: Business
  note.channel:
    displayName: Channel
  note.type:
    displayName: Type
  note.headline:
    displayName: Headline
  note.project:
    displayName: Round
  note.note:
    displayName: Your note
  note.created:
    displayName: Created
views:
  - type: kanban
    name: Board
    groupBy:
      property: status
      direction: ASC
    boardColumns:
      - draft
      - review
      - changes
      - approved
      - published
      - rejected
    cardTitleProperty: note.headline
    cardCoverProperty: note.creative
    order:
      - business
      - channel
      - type
      - project
      - note.note
      - created
    sort:
      - property: created
        direction: DESC
```

The cover line follows the add-on's current property naming — if covers stay
blank after install, check the add-on's own documentation for the cover
property name. Covers only show on items with a `creative:` field (today, ad
items); every other card just shows no image.

The `filters` block must stay identical to the one in `GrowOS Queue.base`. If the
queue's filters ever change, change the board's to match — otherwise the two
surfaces disagree about what is waiting, and the owner cannot tell which one is
lying.

## After you write it

Ask them to open `GrowOS Board.base` and tell you what they see:

- **Columns of cards** — done. Their work is on the board.
- **"Unknown view type: kanban"** — the add-on is not enabled yet. Walk them back
  through the three steps, and check they enabled it after installing.
- **An empty board** — nothing is in `work/` yet. That is not a fault; say so.

The board is a second way to look at the same work. Approving on the board and
approving in chat are the same act, and the queue stays the surface this skill
reads.
