// news-image-20261119 entry program.
//
// The finished front page ships as entry.png next to this file. The grader
// runs only this program: it checks that entry.png is a whole, well-formed
// image of the right size, then copies its bytes unchanged to the grader's
// output directory. No network, no randomness, no dependencies beyond the
// Node 22 standard library, so two runs write identical bytes.

import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const MAX_BYTES = 1024 * 1024;
const WANT_WIDTH = 1024;
const WANT_HEIGHT = 1024;

function fail(message: string): never {
  throw new Error(`news-image-20261119: ${message}`);
}

function isJpeg(bytes: Buffer): boolean {
  return (
    bytes.length >= 4 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[bytes.length - 2] === 0xff &&
    bytes[bytes.length - 1] === 0xd9
  );
}

function isPng(bytes: Buffer): boolean {
  const magic = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  return magic.every((byte, index) => bytes[index] === byte);
}

// Walk the JPEG marker segments until a Start Of Frame marker gives the
// stored width and height. Returns null when the file is not a JPEG or no
// frame header is found before the scan data starts.
function jpegSize(bytes: Buffer): { width: number; height: number } | null {
  let offset = 2;
  while (offset + 9 < bytes.length) {
    if (bytes[offset] !== 0xff) return null;
    const marker = bytes[offset + 1];
    if (marker === 0xda) return null; // start of scan: image data follows
    const length = bytes.readUInt16BE(offset + 2);
    if (length < 2 || offset + 2 + length > bytes.length) return null;
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return {
        height: bytes.readUInt16BE(offset + 5),
        width: bytes.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + length;
  }
  return null;
}

function pngSize(bytes: Buffer): { width: number; height: number } | null {
  if (!isPng(bytes) || bytes.length < 24) return null;
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
  };
}

function digest(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function main(): void {
  const source = new URL("./entry.png", import.meta.url);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const target = join(outDir, "entry.png");

  const info = statSync(source);
  if (!info.isFile()) fail("entry.png is not a file");
  if (info.size === 0 || info.size > MAX_BYTES) {
    fail(`entry.png is ${info.size} bytes, outside 1..${MAX_BYTES}`);
  }

  const bytes = readFileSync(source);
  if (bytes.length !== info.size) fail("entry.png changed while reading");
  const jpeg = isJpeg(bytes);
  const png = isPng(bytes);
  if (!jpeg && !png) fail("entry.png is neither a whole JPEG nor a PNG");

  const size = jpeg ? jpegSize(bytes) : pngSize(bytes);
  if (size === null) fail("could not read image dimensions");
  if (size.width !== WANT_WIDTH || size.height !== WANT_HEIGHT) {
    fail(`image is ${size.width}x${size.height}, want ${WANT_WIDTH}x${WANT_HEIGHT}`);
  }

  mkdirSync(outDir, { recursive: true });
  copyFileSync(source, target);

  const written = readFileSync(target);
  if (written.length !== bytes.length) fail("written file has the wrong length");
  if (digest(written) !== digest(bytes)) fail("written file differs from entry.png");

  // Re-check the copy itself, not just its hash: a truncated write that
  // somehow kept the same length would still fail the dimension check.
  const writtenSize = isJpeg(written) ? jpegSize(written) : pngSize(written);
  if (writtenSize === null) fail("written file has no readable dimensions");
  if (writtenSize.width !== WANT_WIDTH || writtenSize.height !== WANT_HEIGHT) {
    fail(`written file is ${writtenSize.width}x${writtenSize.height}`);
  }

  console.log(
    `wrote ${target} (${written.length} bytes, sha256 ${digest(written)})`,
  );
}

main();
