import { MetadataRoute } from 'next';
import { mockPuppies } from '@/lib/mock-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://petsclubmaroc.com';

  const staticPages = [
    '',
    '/a-propos',
    '/elevage-ethique',
    '/races/pomeranian',
    '/races/berger-australien',
    '/chiots',
    '/galerie',
    '/communaute',
    '/contact',
  ];

  const puppyPages = mockPuppies.map((puppy) => ({
    url: `${baseUrl}/chiots/${puppy.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1.0 : 0.8,
    })),
    ...puppyPages,
  ];
}
