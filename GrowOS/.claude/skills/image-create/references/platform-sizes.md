# Platform sizes

Standard dimensions by platform and use. Pick the row that matches the need;
if the user names a custom size, use that instead. If the platform is not
listed, ask, or use the closest aspect ratio below and say plainly which one
was picked.

| Platform / use | Dimensions (px) | Aspect ratio | Notes |
|---|---|---|---|
| Instagram feed post (square) | 1080 x 1080 | 1:1 | The safest cross-placement size |
| Instagram feed post (portrait) | 1080 x 1350 | 4:5 | Takes up more feed height than square |
| Instagram / Facebook Story or Reel | 1080 x 1920 | 9:16 | Keep key text and faces inside the middle ~60% - the top and bottom get covered by platform UI |
| Facebook feed post | 1200 x 630 | ~1.91:1 | |
| Facebook / Instagram feed ad | 1080 x 1080 | 1:1 | If the same ad also runs in Stories/Reels, make a second 1080x1920 (9:16) version too - do not stretch the square into it |
| LinkedIn feed post | 1200 x 627 | ~1.91:1 | |
| LinkedIn ad | 1200 x 627 | ~1.91:1 | |
| X (Twitter) post | 1200 x 675 | 16:9 | |
| Pinterest pin | 1000 x 1500 | 2:3 | |
| TikTok video cover | 1080 x 1920 | 9:16 | |
| YouTube thumbnail | 1280 x 720 | 16:9 | For A/B concept pairs to test against each other, see the `youtube-thumbnail` skill |
| Blog / article header | 1200 x 630 | ~1.91:1 | |

A carousel (multiple slides, one arc) is not a single image - that is
`carousel-create`'s job, not this skill's.
