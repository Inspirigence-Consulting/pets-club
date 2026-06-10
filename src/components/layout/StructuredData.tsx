import Script from 'next/script';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: "Pet's Club Maroc",
    description: "Élevage premium et éthique de Spitz Nain et Berger Australien au Maroc",
    url: 'https://thepetsclub.ma',
    logo: 'https://thepetsclub.ma/images/logo-pets-club-white.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+212653214751',
      contactType: 'customer service',
      availableLanguage: ['French', 'English', 'Arabic', 'Spanish'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '8 Avenue Oqba - Agdal',
      addressLocality: 'Rabat',
      addressCountry: 'MA',
    },
    sameAs: [
      'https://instagram.com/thepetsclubmaroc',
      'https://facebook.com/thepetsclubmaroc',
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
    '@id': 'https://thepetsclub.ma',
    name: "Pet's Club Maroc",
    description: "Élevage premium et éthique de Spitz Nain (Pomeranian) et Berger Australien au Maroc",
    url: 'https://thepetsclub.ma',
    telephone: '+212653214751',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '8 Avenue Oqba - Agdal',
      addressLocality: 'Rabat',
      addressCountry: 'MA',
    },
    openingHours: ['Mo-Sa 09:00-18:00'],
    priceRange: '$$$',
    image: 'https://thepetsclub.ma/images/catalogue/aussie-male-merle-20000.jpg',
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
