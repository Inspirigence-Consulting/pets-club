/**
 * Pet's Club image catalogue.
 *
 * Source of truth: the real puppy photos used by the WhatsApp sales agent
 * (inventory.md). All site imagery resolves to these local files in
 * /public/images/catalogue, so nothing depends on an external CDN.
 */

export const CATALOGUE = {
  pomMaleOrange: '/images/catalogue/pom-male-orange-12000.jpg',
  pomFemelleOrange: '/images/catalogue/pom-femelle-orange-12000.jpg',
  pomFemelleNoirBlanc: '/images/catalogue/pom-femelle-noir-blanc-10000.jpg',
  pomBlancsPortee: '/images/catalogue/pom-blancs-portee-resa-1.jpg',
  aussieTricolore: '/images/catalogue/aussie-male-tricolore-14000.jpg',
  aussieMerle: '/images/catalogue/aussie-male-merle-20000.jpg',
} as const;

export const POM_PHOTOS = [
  CATALOGUE.pomMaleOrange,
  CATALOGUE.pomFemelleOrange,
  CATALOGUE.pomFemelleNoirBlanc,
  CATALOGUE.pomBlancsPortee,
];

export const AUSSIE_PHOTOS = [CATALOGUE.aussieTricolore, CATALOGUE.aussieMerle];

export const ALL_PHOTOS = [...POM_PHOTOS, ...AUSSIE_PHOTOS];

/** Stable hash so a given id always maps to the same photo (varies across ids). */
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Resolve a legacy image id to a real local catalogue photo.
 *
 * Kept as `cldImg(id, transforms?)` so existing call sites keep working, but it
 * no longer hits Cloudinary. The id is inspected to stay breed-appropriate:
 * the original shoot grouped Bergers Australiens under the 17.06.36 / 16.50.15
 * batches and Spitz Nains under the 15.23.27 / 15.23.28 batches.
 */
export function cldImg(publicId: string, _transforms?: string): string {
  const id = (publicId || '').toLowerCase();
  let pool = ALL_PHOTOS;
  if (id.includes('17.06.36') || id.includes('16.50.15')) {
    pool = AUSSIE_PHOTOS;
  } else if (id.includes('15.23.27') || id.includes('15.23.28')) {
    pool = POM_PHOTOS;
  }
  return pool[hash(publicId) % pool.length];
}
