/**
 * Pre-optimize static images so they can be served as-is (images.unoptimized).
 * Run after adding/replacing photos:  node scripts/optimize-images.mjs
 *
 * - hero cutout PNG (alpha) -> WebP (huge win vs PNG+alpha)
 * - catalogue/placeholder JPGs -> capped width + mozjpeg
 */
import sharp from 'sharp';
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const kb = (n) => (n / 1024).toFixed(0) + 'KB';
const mb = (n) => (n / 1048576).toFixed(2) + 'MB';

// 1) Hero cutout -> WebP (keeps transparency, fraction of the size).
//    Two sizes: a desktop asset and a much lighter one for phones.
const heroIn = 'public/images/hero-dog.png';
if (existsSync(heroIn)) {
  const before = statSync(heroIn).size;
  const input = readFileSync(heroIn);
  await sharp(input)
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 64, effort: 6 })
    .toFile('public/images/hero-dog.webp');
  await sharp(input)
    .resize({ width: 560, withoutEnlargement: true })
    .webp({ quality: 62, effort: 6 })
    .toFile('public/images/hero-dog-mobile.webp');
  console.log(
    `hero-dog.png ${mb(before)} -> hero-dog.webp ${kb(statSync('public/images/hero-dog.webp').size)}` +
      ` / hero-dog-mobile.webp ${kb(statSync('public/images/hero-dog-mobile.webp').size)}`
  );
}

// 2) Catalogue + placeholder JPGs -> capped width, mozjpeg
const jpgTargets = [
  ...readdirSync('public/images/catalogue')
    .filter((f) => /\.jpe?g$/i.test(f))
    .map((f) => join('public/images/catalogue', f)),
  'public/images/placeholder-puppy.jpg',
  'public/images/placeholder-dog.jpg',
];

for (const p of jpgTargets) {
  if (!existsSync(p)) continue;
  const before = statSync(p).size;
  const buf = await sharp(readFileSync(p))
    .resize({ width: 1080, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
  writeFileSync(p, buf);
  console.log(`${p}  ${kb(before)} -> ${kb(statSync(p).size)}`);
}

console.log('done');
