# last30days v3.0.0 - Research Skill Documentation

## Overview

This is a comprehensive Claude agent skill for researching any topic across Reddit, X, YouTube, TikTok, Instagram, Hacker News, Polymarket, and the web. It surfaces what people are actively discussing and recommending in real-time across social platforms.

## Core Capabilities

**Multi-source research** spanning eight major platforms with intelligent query planning. The skill operates in two modes:

- **Standard mode**: Interactive research with synthesis and follow-up prompts
- **Agent mode** (`--agent` flag): Non-interactive report output for autonomous workflows

## First-Run Setup

The skill includes a mandatory setup wizard that runs once to configure authentication:

- **X/Twitter**: Browser cookies (auto-scan), xAI API key, or manual AUTH_TOKEN+CT0
- **YouTube**: Installs yt-dlp (open source, no key required)
- **TikTok/Instagram**: Optional ScrapeCreators API key (10,000 free calls)
- **Reddit**: Works out-of-the-box with public JSON; ScrapeCreators serves as backup
- **Web search**: Optional Brave, Exa, or Serper API keys

All credentials remain local (`~/.config/last30days/.env`). No API keys are logged or shared between providers.

## Research Methodology

### Pre-Research Intelligence (Step 0.55)

The skill performs targeted WebSearches to resolve:
- X handles (primary entity + related accounts + commentators)
- Reddit subreddits (3-5 communities discussing the topic)
- TikTok hashtags and creators (inferred from topic knowledge)
- Current events context (for timely subquery generation)

### Query Planning (Step 0.75)

You generate a JSON query plan specifying 1-4 subqueries with:
- Intent classification (breaking_news, comparison, how_to, etc.)
- Freshness mode (strict_recent, evergreen_ok, balanced_recent)
- Cluster mode (story, debate, market, workflow, none)
- Per-subquery ranking logic and source routing

The primary subquery MUST include all sources: Reddit, X, YouTube, TikTok, Instagram, Hacker News, Polymarket.

### Synthesis Strategy

Results are grouped by story/theme clusters rather than individual sources. Each cluster shows:
- Cross-platform validation (multi-source clusters are highest confidence)
- Uncertainty tags ("single-source", "thin-evidence")
- Engagement metrics (likes, upvotes, views, retweets)

### Source Weighting

- **Highest confidence**: Reddit + X + YouTube clusters with engagement data
- **High confidence**: TikTok and Instagram viral signals
- **Supporting evidence**: Hacker News developer commentary, Polymarket odds
- **Supplemental**: Web articles and blog posts (lowest priority)

## Query Type Handling

| Type | Output Format | Examples |
|------|---------------|----------|
| **RECOMMENDATIONS** | Specific product/tool names with mention counts | "best AI tools", "top Claude skills" |
| **COMPARISON** | Side-by-side analysis of both entities | "Claude Code vs Codex", "Tella vs Loom" |
| **NEWS** | Current developments with dates and sources | "what's happening with Anthropic" |
| **PROMPTING** | Technique-focused synthesis with copy-paste patterns | "UI design prompts for Midjourney" |
| **GENERAL** | Broad narrative with top 3-5 insights | "artificial intelligence 2026" |

## Output Structure

**What I Learned** section synthesizes findings with sparse citations (per @handle or r/subreddit preferred over URLs). Direct quotes from top Reddit comments and YouTube transcripts are embedded naturally throughout.

**Stats block** displays actual counts:
- Platform metrics: thread/post count, engagement totals
- Top voices: highest-engagement @handles and subreddits
- Raw data location: ~/Documents/Last30Days/{slug}-raw.md

**Invitation** offers 2-3 specific follow-up suggestions based on actual research findings (not generic prompts).

## Follow-Up Workflow

After initial research:
- Answer topic questions from cached research (no new searches)
- Write targeted prompts when user describes what they want to create
- Support conversational preference flags: `FUN_LEVEL`, `ELI5_MODE`
- Provide multiple prompt variations only if explicitly requested

## API Dependencies

| Service | Purpose | Cost |
|---------|---------|------|
| ScrapeCreators | TikTok, Instagram, Reddit backup | 10K free calls, then PAYG |
| xAI API | X/Twitter search | api.x.ai key required |
| yt-dlp | YouTube search/transcripts | Free, open source |
| Brave/Exa/Serper | Web search (optional) | Various PAYG models |
| Polymarket Gamma | Prediction markets | Free, no auth |
| Algolia HN Search | Hacker News | Free, no auth |

Hacker News and Polymarket are always available without API keys.

## Security Model

- Local .env file stores all credentials (never logged or shared between providers)
- Browser cookies scanned at search time, not persisted to disk
- No posting, modifying, or liking content on any platform
- Research outputs saved locally to ~/Documents/Last30Days/
- Skill can run autonomously via `--agent` flag with non-interactive output

---

**Note**: This documentation reflects v3.0.0 functionality. The skill requires Python 3.12+ and resolves available interpreters at runtime via the `LAST30DAYS_PYTHON` environment variable.

---

## Skill Instructions

When this skill is invoked via `/last30days [topic]`:

1. **Parse the topic** from the user's input after `/last30days`
2. **Run Pre-Research Intelligence**: Use WebSearch to find relevant X handles, Reddit subreddits, and current context for the topic
3. **Search across available sources**:
   - Reddit: Search r/[relevant subreddits] for recent posts and top comments
   - Hacker News: Use Algolia HN Search API (https://hn.algolia.com/api/v1/search?query=[topic]&numericFilters=created_at_i>TIMESTAMP) for posts from last 30 days
   - Web: Search for recent news and discussions
   - YouTube: Search for recent videos if yt-dlp is available
4. **Cluster and synthesize** results by theme/story rather than by source
5. **Output** the What I Learned section with:
   - Top 3-5 insight clusters with cross-platform validation
   - Engagement metrics where available
   - Sparse citations (@handle or r/subreddit format)
   - Stats block with platform coverage
   - 2-3 specific follow-up suggestions

**Freshness**: Focus on content from the last 30 days. Flag anything older.

**Always available without API keys**: Hacker News (Algolia) and web search via WebSearch tool.
