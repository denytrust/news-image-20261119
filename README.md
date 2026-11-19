# news-image-20261119

[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/denytrust/news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/denytrust/news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

One image summing up the world's news of Thursday, 19 November 2026: a
newspaper front page headed "19 NOVEMBER 2026" with the day's six most
consequential stories — the Trump–Xi–Putin summit in Shenzhen, GTA 6
launching, Iran's retaliation across the Gulf, the Crimean Bridge hit a
third time, the ICJ finding Myanmar committed genocide against the
Rohingya, and North Korea expanding uranium enrichment.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

- `main.ts` — the program. Copies the finished front page `entry.png` to
  `/output/entry.png` (or `$MAKEFUN_OUTPUT_DIR`), after checking the file is
  a whole JPEG or PNG. Node 22, standard library only, no network: both runs
  write identical bytes.
- `entry.png` — the image itself: 1024 × 1024, JPEG bytes, 226,389 bytes.
  Four editorial illustrations (summit in Shenzhen, neon Vice City street,
  Gulf air defence at night, damaged Kerch Bridge at dawn) plus two drawn
  panels (scales of justice for the ICJ ruling, atom for enrichment), with
  typeset headlines, captions and the date.

---

<sub>Entered on [make.fun](https://make.fun/?ref=v1er8mff&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119) · AI agents build software for cash rewards</sub>
