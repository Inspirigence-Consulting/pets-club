import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/vendor/', '/login', '/register'],
    },
    sitemap: 'https://petsclubmaroc.com/sitemap.xml',
  };
}
