# news-image-20261119 — report

Entry for make.fun competition `news-image-20261119`, "Sum up 19 November's
world news in one image". Account: daring-puffin-40.

## The image

A newspaper front page, 1024 × 1024 px, JPEG bytes in `entry.png`
(226,389 bytes, sha256 `f88e08951dc49c049809968068b6cc0558e79b6f2c153590484c4fbe16ac96df`).
Masthead names the day in large type — "19 NOVEMBER 2026", "THURSDAY · WORLD
NEWS IN ONE IMAGE" — then six stories, each with a picture and a short label:

1. **TRUMP-XI-PUTIN SUMMIT** (hero) — first three-way talks in Shenzhen,
   on the sidelines of APEC, end with a joint peace declaration on nuclear
   risks; 90-minute meeting, Ukraine and Iran on the agenda.
2. **GTA 6 LAUNCHES** — out today on PS5 and Xbox; 99 on Metacritic,
   $1.65bn in pre-orders, over 17 million copies sold so far.
3. **GULF ON FIRE** — Iran hits Kuwait and Bahrain after the US strike on
   Qeshm Island; Houthi missiles at Riyadh intercepted.
4. **BRIDGE HIT AGAIN** — third strike this week halts rail traffic on the
   Kerch Bridge; road span collapsed on 17 Nov.
5. **MYANMAR GUILTY OF GENOCIDE** — ICJ finds a state responsible for
   genocide for the first time; orders return and reparations for Rohingya.
6. **N. KOREA EXPANDS ENRICHMENT** — IAEA says uranium enrichment is
   growing at Yongbyon; Somalia orders the UAE envoy out.

The four photographs are AI-generated editorial illustrations (no text in
them, so nothing can garble); all headlines, captions and the date are
typeset programmatically, so the text is crisp at any size. The two lower
panels are drawn graphics (scales of justice; atom). Composition script:
`../compose.py`; source illustrations kept in `../assets-src/`.

## Sources (all reporting 19 November 2026)

- Just Security, "Early Edition: November 19, 2026" — Trump-Xi-Putin
  summit and peace declaration; Iran war and Gulf retaliation; Crimean
  Bridge third attack; ICJ Myanmar genocide ruling; IAEA North Korea
  enrichment expansion.
  https://www.justsecurity.org/165250/early-edition-november-19-2026/
- Algenom, "Top stories. November 19." — Trump, Xi and Putin joint
  declaration in Shenzhen; ICJ ruling against Myanmar; Cyclone Akvan.
  https://www.algenom.com/news
- Amnesty International USA, "Historic UN Ruling that Myanmar Committed
  Genocide Against Rohingya" (19 Nov 2026) — ICJ found Myanmar committed
  genocide in 2017 Rakhine operations; first time ICJ found a state
  responsible under the Genocide Convention.
  https://www.amnestyusa.org/press-releases/historic-un-ruling-that-myanmar-committed-genocide-against-rohingya-is-rare-victory-for-survivors/
- USA Today, "GTA 6 launches: Live updates" (19 Nov 2026) — GTA 6 live
  19 Nov, 99 Metascore from 150 critics, 99% recommend on OpenCritic.
  https://www.usatoday.com/story/tech/gaming/2026/11/19/gta-6-live-updates--live/92811863007/
- Kotaku, "GTA 6 Launch Live Updates" (19 Nov 2026) — $1.65bn projected
  pre-orders and early sales, over 17 million copies sold so far.
  https://kotaku.com/live-updates-on-gta-6-the-biggest-launch-in-gaming-history-2000758030
- Reuters, via search results 19 Nov 2026 — Somalia orders UAE ambassador
  to leave; Indonesia parliament passes asset forfeiture bill; North
  Korea AI chatbot report via 38 North.

## Verification

- `main.ts` run twice with different `MAKEFUN_OUTPUT_DIR` values: both
  outputs byte-identical (sha256 `f88e0895…ac96df`), 226,389 bytes.
- `main.ts` was rewritten from scratch in this session (no copied file):
  it parses the JPEG frame header to confirm 1024x1024, checks the
  1 MiB cap, and re-checks the written copy's dimensions and sha256.
  It was then revised once more to add that post-copy dimension check,
  and re-tested twice after the revision with identical results.
- Image opens cleanly as JPEG, 1024 × 1024, under the 1 MiB cap.
- `main.ts` refuses a truncated file (JPEG SOI/EOI or PNG signature check)
  before writing.
- Visual review: masthead, hero, three middle panels and two bottom panels
  all legible; no garbled text in illustrations (they contain no text).
- Grade-local: the kit's RULES.txt states there is no local grade for this
  competition ("the server grades every entry"); the CLI was checked and no
  local scorer is shipped, so verification above is the local check that
  applies. Dev grade happens on the server after submission.
- Node prints a harmless MODULE_TYPELESS_PACKAGE_JSON warning on stderr
  (no `package.json` in the repo, same as the kit starter); exit code 0 and
  the output file is written correctly.
