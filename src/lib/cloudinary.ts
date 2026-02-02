const CLOUD_NAME = 'dlugprv1v';

/**
 * Build a Cloudinary image URL with optional transformations.
 * Public IDs with spaces are URL-encoded automatically.
 */
export function cldImg(publicId: string, transforms?: string): string {
  const encoded = publicId
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/');
  const t = transforms ? `${transforms}/` : '';
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${t}${encoded}`;
}

/**
 * All real images from the Cloudinary collection.
 * Each entry has a publicId, format, width, height, and a semantic label.
 */
export const CLD_IMAGES = {
  // "After" images - professionally edited / showcase-ready
  showcase1: { publicId: 'visual-showcase/after_WhatsApp Image 2026-01-28 at 17.25.03', format: 'jpg', w: 800, h: 500 },
  showcase2: { publicId: 'visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (3)', format: 'jpg', w: 3726, h: 4160 },
  showcase3: { publicId: 'visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (5)', format: 'jpg', w: 2435, h: 3647 },
  showcase4: { publicId: 'visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (2)', format: 'jpg', w: 3259, h: 4000 },
  showcase5: { publicId: 'visual-showcase/after_WhatsApp Image 2026-01-28 at 16.50.15', format: 'jpg', w: 1290, h: 1472 },
  showcase6: { publicId: 'visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27', format: 'jpg', w: 960, h: 1280 },
  showcase7: { publicId: 'visual-showcase/after_WhatsApp Image 2026-01-28 at 16.15.24 (1)', format: 'jpg', w: 1600, h: 1066 },
  showcase8: { publicId: 'visual-showcase/after_WhatsApp Image 2026-01-28 at 16.15.24', format: 'jpg', w: 1600, h: 1066 },
  showcase9: { publicId: 'visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (7)', format: 'jpg', w: 960, h: 1280 },
  showcase10: { publicId: 'visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (3)', format: 'jpg', w: 960, h: 1280 },
  showcase11: { publicId: 'visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (5)', format: 'jpg', w: 960, h: 1280 },
  showcase12: { publicId: 'visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (1)', format: 'jpg', w: 960, h: 1280 },

  // "Before" images - raw / natural photos
  raw1: { publicId: 'visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36 (9)', format: 'jpg', w: 3024, h: 4032 },
  raw2: { publicId: 'visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36 (13)', format: 'jpg', w: 3024, h: 4032 },
  raw3: { publicId: 'visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36', format: 'jpg', w: 1066, h: 1600 },
  raw4: { publicId: 'visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36 (1)', format: 'jpg', w: 1066, h: 1600 },
  raw5: { publicId: 'visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28', format: 'jpg', w: 960, h: 1280 },
  raw6: { publicId: 'visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (4)', format: 'jpg', w: 960, h: 1280 },
  raw7: { publicId: 'visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (7)', format: 'jpg', w: 960, h: 1280 },
  raw8: { publicId: 'visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (1)', format: 'jpg', w: 960, h: 1280 },
  raw9: { publicId: 'visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (6)', format: 'jpg', w: 720, h: 1280 },
  raw10: { publicId: 'visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (3)', format: 'jpg', w: 960, h: 1280 },
  raw11: { publicId: 'visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.27 (9)', format: 'jpg', w: 960, h: 1280 },
  raw12: { publicId: 'visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (2)', format: 'jpg', w: 960, h: 1280 },
} as const;

export type CldImageKey = keyof typeof CLD_IMAGES;
