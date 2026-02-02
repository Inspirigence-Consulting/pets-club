import type { Metadata } from 'next';
import { mockPuppies } from '@/lib/mock-data';
import { BreadcrumbSchema } from '@/components/layout/StructuredData';

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
    { name: 'Accueil', url: 'https://petsclubmaroc.com' },
    { name: 'Nos Chiots', url: 'https://petsclubmaroc.com/chiots' },
    ...(puppy ? [{ name: puppy.name, url: `https://petsclubmaroc.com/chiots/${slug}` }] : []),
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      {children}
    </>
  );
}
