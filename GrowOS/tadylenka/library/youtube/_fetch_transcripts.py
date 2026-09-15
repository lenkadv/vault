"""
Batch YouTube transcript fetcher with rate limit handling.
Run: python _fetch_transcripts.py

Downloads 3 top videos per channel for 10 channels (30 transcripts total).
Skips already downloaded files. Retries on rate limits.
"""
import sys, os, json, time, re
sys.stdout.reconfigure(encoding='utf-8')

from youtube_transcript_api import YouTubeTranscriptApi

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DELAY = 15  # seconds between requests
RETRY_DELAY = 180  # seconds to wait after rate limit (3 min)
MAX_RETRIES = 3  # give up after this many rate limits on same video

ytt = YouTubeTranscriptApi()

# ============================================================
# FINAL 10 CHANNELS — selected for quality, not reach
# ============================================================
# 4 English, 2 Spanish, 1 French, 1 Italian, 1 Czech
# (Great Art Explained already transcribed separately — 5 videos)
#
# Selection criteria:
# - Research depth & accuracy
# - Production quality
# - Treats audience as intelligent adults
# - Distinctive voice or angle
# - Best-in-class for their language market
# ============================================================

VIDEOS = [
    # ── ENGLISH ────────────────────────────────────────────────

    # 1. Nerdwriter1 (Evan Puschak) — 3.2M subs
    #    Video essays on art. Short, punchy, analytical.
    #    Best art-specific titles selected.
    ("g15-lvmIrcg", "nerdwriter1", "nerdwriter1-most-disturbing-painting",
     "The Most Disturbing Painting (Goya's Saturn)", "2.8M views"),
    ("nKNAZr0QJzs", "nerdwriter1", "nerdwriter1-van-gogh-ugliest-masterpiece",
     "Van Gogh's Ugliest Masterpiece", "1.6M views"),
    ("Q1irNBh2qg8", "nerdwriter1", "nerdwriter1-how-art-arrived-at-pollock",
     "How Art Arrived At Jackson Pollock", "1.4M views"),

    # 2. The Canvas (Shawn Grenier) — 257K subs
    #    Art + politics/society. Stanczyk got 4.7M views.
    #    Unique angle: art as political commentary.
    ("v6Z8S8A41qI", "the-canvas", "the-canvas-prison-art-political",
     "When Prison Art Gets Political", "~500K views"),
    ("61WgL8BmtYs", "the-canvas", "the-canvas-antifascist-portraits",
     "History's Best Antifascist Portraits", "~400K views"),
    ("o8VaDY2vkVw", "the-canvas", "the-canvas-execution-anarchists",
     "Painting The Execution of Two Anarchists - Ben Shahn", "~350K views"),

    # 3. Art History School (Paul Priestley) — ~300K subs
    #    Dedicated art history. Consistent 15-18 min format.
    #    Covers artists beyond the obvious (Hilma af Klint, Klee).
    ("_QezvWUxiwI", "art-history-school", "art-history-school-paul-klee",
     "Paul Klee the Playful Genius", "600K views"),
    ("NVJQ04OJSoI", "art-history-school", "art-history-school-egon-schiele",
     "Egon Schiele's Short Scandalous Life", "465K views"),
    ("6ab_QfeL4u4", "art-history-school", "art-history-school-hilma-af-klint",
     "The Visionary Genius Hilma af Klint", "448K views"),

    # 4. The Canvas (already above) — replaced with:
    #    Inspiraggio — newer channel, strong clickable format, art analysis
    ("lwk6NUUfyjo", "inspiraggio", "inspiraggio-most-remarkable-painting",
     "This Might Just Be The Most Remarkable Painting Ever Made", "1.9M views"),
    ("QBXhx5El_i4", "inspiraggio", "inspiraggio-cant-unsee",
     "You Can't Unsee This Painting", "195K views"),
    ("672Ft_w8KSw", "inspiraggio", "inspiraggio-cruelest-painting",
     "The Cruelest Painting in Art History", "158K views"),

    # ── SPANISH ────────────────────────────────────────────────

    # 5. Dosis Heroica (ES) — ~100K subs
    #    Serious research, cinematic, 15-20 min deep dives.
    #    Goya's Black Paintings at 495K. Covers art + philosophy.
    ("3MNmCG2tNUY", "dosis-heroica", "dosis-heroica-goya-black-paintings",
     "Las Pinturas Negras de Goya (nunca debimos verlas)", "495K views"),
    ("4LDFsAqkAwY", "dosis-heroica", "dosis-heroica-bosch",
     "Algo extraño le pasó al Bosco... y ESTO podría explicar todo", "285K views"),
    ("OBACKTQGE3U", "dosis-heroica", "dosis-heroica-conocete-nietzsche-jung",
     "Conócete a ti mismo - Nietzsche y Carl Jung", "162K views"),

    # 6. Ter (ES) — 2M+ subs
    #    Architecture/art/design with pop culture connections.
    #    Proves unexpected angles work. Massive Spanish reach.
    ("WKiU0dSpH5A", "ter", "ter-3000-anos-arte",
     "3000 años de arte en 11 minutos", "1.9M views"),
    ("MgOZa9UZmug", "ter", "ter-moscas-cuadros",
     "Por qué pintaban las moscas ASÍ en los cuadros", "1.2M views"),
    ("tb1dd4242_k", "ter", "ter-arquitectura-chihiro",
     "La arquitectura de El Viaje de Chihiro", "1.3M views"),

    # ── FRENCH ─────────────────────────────────────────────────

    # 7. Vincent K. Joly (FR) — ~150K subs
    #    Deep art analysis in French. 1.1M on Mona Lisa analysis.
    #    Proper research, 15-25 min, accessible but serious.
    ("93VXoyRYoBI", "vincent-k-joly", "vincent-k-joly-joconde",
     "La Joconde de Léonard de Vinci, expliquée (Analyse)", "1.1M views"),
    ("IR6ZGO5LHSo", "vincent-k-joly", "vincent-k-joly-david-michelangelo",
     "Why is Michelangelo's David so special? (Analyse)", "356K views"),
    ("SaOa4IGGGGU", "vincent-k-joly", "vincent-k-joly-nuit-etoilee",
     "La Nuit Étoilée de Van Gogh, expliquée (Analyse)", "346K views"),

    # ── ITALIAN ────────────────────────────────────────────────

    # 8. La Zebra Arte (IT) — ~50K subs
    #    Fun, accessible Italian art history. Good energy.
    #    Best Italian art history creator found.
    ("bT4GaFKdZh0", "la-zebra-arte", "la-zebra-arte-greca",
     "ARTE GRECA: il riassunto che stavate aspettando!", "104K views"),
    ("bq1QtfG84Ak", "la-zebra-arte", "la-zebra-art-nouveau",
     "Riassunto ESTREMO dell'Art Nouveau", "49K views"),
    ("2HYEJ8h4FQ0", "la-zebra-arte", "la-zebra-arte-cretese",
     "L'Arte Cretese (e Micenea) come non ve l'hanno mai raccontata!", "30K views"),

    # ── CZECH ──────────────────────────────────────────────────

    # 9. Životy slavných (CZ) — ~80K subs
    #    Czech biographical format. Not art-specific but proves
    #    the Czech audience exists for this kind of content (300K+ views).
    ("nSePRrX3Z4E", "zivoty-slavnych", "zivoty-slavnych-churchill",
     "Winston Churchill: Legendární politik", "383K views"),
    ("aF_8qzo-aOw", "zivoty-slavnych", "zivoty-slavnych-caligula",
     "Caligula: Šílený a zvrhlý císař", "352K views"),
    ("dJvj8FSVzZ0", "zivoty-slavnych", "zivoty-slavnych-solzenicyn",
     "Alexandr Solženicyn", "260K views"),
]

# Note: Great Art Explained (5 videos) already transcribed in this folder.
# Total with GAE: 35 transcripts across 10 channels.


def fetch_and_save(vid_id, channel_slug, file_slug, title, views):
    filepath = os.path.join(BASE_DIR, f"{file_slug}.md")
    if os.path.exists(filepath) and os.path.getsize(filepath) > 500:
        print(f"  SKIP (exists): {title}")
        return True

    # Try language in order of likelihood per channel
    lang_map = {
        'ter': [['es'], ['en']],
        'dosis-heroica': [['es'], ['en']],
        'vincent-k-joly': [['fr'], ['en']],
        'la-zebra-arte': [['it'], ['en']],
        'zivoty-slavnych': [['cs'], ['en']],
        'art-comptant-pour-rien': [['fr'], ['en']],
    }

    lang_attempts = lang_map.get(channel_slug, [['en']])
    # Always add a fallback with all languages
    lang_attempts.append(['en', 'cs', 'es', 'fr', 'de', 'it', 'pt'])

    for langs in lang_attempts:
        try:
            result = ytt.fetch(vid_id, languages=langs)
            text = '\n'.join([s.text for s in result.snippets])
            if len(text) < 100:
                continue

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(f"# {title}\n\n")
                f.write(f"**Channel:** {channel_slug}\n")
                f.write(f"**URL:** https://www.youtube.com/watch?v={vid_id}\n")
                f.write(f"**Views:** {views}\n")
                f.write(f"**Language:** {result.language} ({result.language_code})\n")
                f.write(f"**Auto-generated:** {result.is_generated}\n\n---\n\n")
                f.write(text)

            print(f"  OK: {title} ({len(text)} chars, {result.language_code})")
            return True
        except Exception as e:
            etype = type(e).__name__
            if 'IpBlocked' in etype or 'RequestBlocked' in etype:
                raise  # Re-raise to trigger retry
            continue

    print(f"  FAIL: {title} - no transcript in any language")
    return False


def main():
    total = len(VIDEOS)
    done = 0
    failed = 0

    print(f"=" * 60)
    print(f"tadylenka YouTube Transcript Fetcher")
    print(f"=" * 60)
    print(f"Videos to fetch: {total}")
    print(f"Delay between requests: {DELAY}s")
    print(f"Retry delay after rate limit: {RETRY_DELAY}s")
    print(f"Output directory: {BASE_DIR}")
    print()

    i = 0
    retries = 0
    while i < total:
        vid_id, channel, slug, title, views = VIDEOS[i]
        print(f"[{i+1}/{total}] {channel}: {title}")

        try:
            success = fetch_and_save(vid_id, channel, slug, title, views)
            if success:
                done += 1
            else:
                failed += 1
            i += 1
            retries = 0  # reset on success
            if i < total:
                time.sleep(DELAY)
        except Exception as e:
            etype = type(e).__name__
            if 'IpBlocked' in etype or 'RequestBlocked' in etype or '429' in str(e):
                retries += 1
                if retries >= MAX_RETRIES:
                    print(f"\n  IP still blocked after {MAX_RETRIES} retries.")
                    print(f"  Stopping. Try again in 1-2 hours.")
                    print(f"  The script skips already-downloaded files,")
                    print(f"  so just run it again later.")
                    break
                print(f"  RATE LIMITED — attempt {retries}/{MAX_RETRIES}, waiting {RETRY_DELAY}s...")
                time.sleep(RETRY_DELAY)
                # Don't increment i — retry same video
            else:
                print(f"  ERROR: {etype}: {e}")
                failed += 1
                i += 1
                retries = 0
                time.sleep(DELAY)

    print(f"\n{'=' * 60}")
    print(f"DONE: {done} transcripts saved, {failed} failed")
    print(f"Files in: {BASE_DIR}")
    print(f"\nRemember: 5 Great Art Explained transcripts were")
    print(f"already downloaded separately in this folder.")
    print(f"Total coverage: {done + 5} transcripts across 10 channels.")


if __name__ == '__main__':
    main()
