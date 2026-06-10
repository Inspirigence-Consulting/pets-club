import type { Metadata } from 'next';
import Script from 'next/script';
import { mockPuppies } from '@/lib/mock-data';
import { BreadcrumbSchema } from '@/components/layout/StructuredData';

const AVAILABILITY: Record<string, string> = {
  available: 'https://schema.org/InStock',
  coming: 'https://schema.org/PreOrder',
  reserved: 'https://schema.org/LimitedAvailability',
  sold: 'https://schema.org/SoldOut',
  adopted: 'https://schema.org/SoldOut',
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const puppy = mockPuppies.find((p) => p.slug === slug);

  if (!puppy) {
    return {
      title: 'Chiot non trouvé',
    };
  }

  return {
    title: `${puppy.name} - ${puppy.breedLabel} disponible`,
    description: `Découvrez ${puppy.name}, ${puppy.breedLabel} ${puppy.gender === 'male' ? 'mâle' : 'femelle'} de lignée ${puppy.line}. ${puppy.description.slice(0, 120)}...`,
    alternates: {
      canonical: `/chiots/${slug}`,
    },
    openGraph: {
      title: `${puppy.name} - ${puppy.breedLabel} | Pet's Club Maroc`,
      description: `${puppy.breedLabel} ${puppy.gender === 'male' ? 'mâle' : 'femelle'}, lignée ${puppy.line}. Élevage éthique au Maroc.`,
      images: puppy.image ? [{ url: puppy.image }] : [],
    },
  };
}

export default async function PuppyLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const puppy = mockPuppies.find((p) => p.slug === slug);

  const breadcrumbItems = [
    { name: 'Accueil', url: 'https://thepetsclub.ma' },
    { name: 'Nos Chiots', url: 'https://thepetsclub.ma/chiots' },
    ...(puppy ? [{ name: puppy.name, url: `https://thepetsclub.ma/chiots/${slug}` }] : []),
  ];

  const productSchema = puppy
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${puppy.name}, ${puppy.breedLabel}`,
        description: puppy.description,
        image: `https://thepetsclub.ma${puppy.image}`,
        category: puppy.breedLabel,
        brand: { '@type': 'Brand', name: "Pet's Club Maroc" },
        offers: {
          '@type': 'Offer',
          url: `https://thepetsclub.ma/chiots/${slug}`,
          priceCurrency: 'MAD',
          availability: AVAILABILITY[puppy.status] || 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: "Pet's Club Maroc" },
        },
      }
    : null;

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      {productSchema && (
        <Script
          id="product-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {children}
    </>
  );
}
