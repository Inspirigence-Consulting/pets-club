import Script from 'next/script';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: "Pet's Club Maroc",
    description: "Élevage premium et éthique de Spitz Nain et Berger Australien au Maroc",
    url: 'https://petsclubmaroc.com',
    logo: 'https://petsclubmaroc.com/images/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+212600000000',
      contactType: 'customer service',
      availableLanguage: ['French', 'English', 'Arabic', 'Spanish'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Casablanca',
      addressCountry: 'MA',
    },
    sameAs: [
      'https://instagram.com/petsclubmaroc',
      'https://facebook.com/petsclubmaroc',
    ],
  };

  return (
    <Script
      id="org-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://petsclubmaroc.com',
    name: "Pet's Club Maroc",
    description: "Élevage premium et éthique de Spitz Nain (Pomeranian) et Berger Australien au Maroc",
    url: 'https://petsclubmaroc.com',
    telephone: '+212600000000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Casablanca',
      addressCountry: 'MA',
    },
    openingHours: ['Mo-Sa 09:00-18:00'],
    priceRange: '$$$',
    image: 'https://res.cloudinary.com/dlugprv1v/image/upload/w_1200,q_auto,f_auto/visual-showcase/after_WhatsApp%20Image%202026-01-28%20at%2017.25.03',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '200',
    },
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
