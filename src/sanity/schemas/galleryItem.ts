const galleryItem = {
  name: 'galleryItem',
  title: 'Galerie',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Légende',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Nos Champions', value: 'champions' },
          { title: 'Familles Heureuses', value: 'families' },
          { title: 'Coulisses', value: 'behind-scenes' },
          { title: 'Communauté', value: 'community' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Mise en avant',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'category',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Ordre',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
};

export default galleryItem;
