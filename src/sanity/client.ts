import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Query helpers
export async function getPuppies(filters?: {
  breed?: string;
  status?: string;
  gender?: string;
}) {
  let query = '*[_type == "puppy"';
  const conditions: string[] = [];

  if (filters?.breed) conditions.push(`breed == "${filters.breed}"`);
  if (filters?.status) conditions.push(`status == "${filters.status}"`);
  if (filters?.gender) conditions.push(`gender == "${filters.gender}"`);

  if (conditions.length > 0) {
    query += ` && ${conditions.join(' && ')}`;
  }

  query += `] | order(dob desc) {
    _id,
    name,
    slug,
    breed,
    gender,
    dob,
    color,
    line,
    status,
    mainImage,
    description,
    "father": father->{name, image, titles, healthTests, breed, color},
    "mother": mother->{name, image, titles, healthTests, breed, color}
  }`;

  return client.fetch(query);
}

export async function getPuppyBySlug(slug: string) {
  const query = `*[_type == "puppy" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    breed,
    gender,
    dob,
    color,
    line,
    status,
    mainImage,
    images,
    video,
    description,
    included,
    "father": father->{name, image, titles, healthTests, breed, color},
    "mother": mother->{name, image, titles, healthTests, breed, color}
  }`;

  return client.fetch(query, { slug });
}

export async function getBlogPosts() {
  return client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      category,
      publishedAt
    }
  `);
}

export async function getTestimonials() {
  return client.fetch(`
    *[_type == "testimonial" && approved == true] {
      _id,
      name,
      location,
      text,
      breed,
      image
    }
  `);
}

export async function getGalleryItems(category?: string) {
  let query = '*[_type == "galleryItem"';
  if (category && category !== 'all') {
    query += ` && category == "${category}"`;
  }
  query += `] | order(order asc) {
    _id,
    image,
    caption,
    category
  }`;

  return client.fetch(query);
}

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`);
}
