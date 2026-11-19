// news-image-20261119: "Sum up 19 November's world news in one image".
//
// The entry ships one finished front page, entry.png, composed from four
// editorial illustrations of the day's stories plus typeset headlines and
// the date. This program only moves those bytes to the grader's output
// directory, so the two runs the grader makes write exactly the same file.
//
// Node 22, standard library only, no network, no randomness.

import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

const image = readFileSync(source);

// Refuse a truncated file instead of shipping it: a JPEG must start with
// SOI (FF D8) and end with EOI (FF D9); a PNG must start with its 8-byte
// signature. The gate rejects a partial image, so fail loudly here.
const isJpeg =
  image.length > 4 &&
  image[0] === 0xff &&
  image[1] === 0xd8 &&
  image[image.length - 2] === 0xff &&
  image[image.length - 1] === 0xd9;
const isPng =
  image.length > 8 &&
  image[0] === 0x89 &&
  image[1] === 0x50 &&
  image[2] === 0x4e &&
  image[3] === 0x47;
if (!isJpeg && !isPng) {
  throw new Error("entry.png is not a whole JPEG or PNG image");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(target, image);

const written = statSync(target);
if (written.size !== image.length) {
  throw new Error(`short write: ${written.size} of ${image.length} bytes`);
}
console.log(`wrote ${target} (${written.size} bytes)`);
