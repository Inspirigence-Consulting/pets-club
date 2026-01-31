const blogPost = {
  name: 'blogPost',
  title: 'Articles de Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Résumé',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Guides', value: 'guides' },
          { title: 'Santé', value: 'sante' },
          { title: 'Races', value: 'races' },
          { title: 'Actualités', value: 'actualites' },
          { title: 'Témoignages', value: 'temoignages' },
        ],
      },
    },
    {
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
  orderings: [
    {
      title: 'Date de publication',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
};

export default blogPost;
