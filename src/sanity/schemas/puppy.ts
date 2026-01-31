const puppy = {
  name: 'puppy',
  title: 'Chiots',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'breed',
      title: 'Race',
      type: 'string',
      options: {
        list: [
          { title: 'Spitz Nain (Pomeranian)', value: 'pomeranian' },
          { title: 'Berger Australien', value: 'berger-australien' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'gender',
      title: 'Genre',
      type: 'string',
      options: {
        list: [
          { title: 'Mâle', value: 'male' },
          { title: 'Femelle', value: 'female' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'dob',
      title: 'Date de naissance',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'color',
      title: 'Couleur',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'line',
      title: 'Lignée',
      type: 'string',
      description: 'Ex: Teddy Bear, Standard, Working Line, Beauty Line',
    },
    {
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'Disponible', value: 'available' },
          { title: 'Réservé', value: 'reserved' },
          { title: 'Vendu', value: 'sold' },
          { title: 'Bientôt disponible', value: 'coming' },
          { title: 'Adopté', value: 'adopted' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Photo principale',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'images',
      title: 'Photos supplémentaires',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'video',
      title: 'Vidéo (URL)',
      type: 'url',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'father',
      title: 'Père',
      type: 'reference',
      to: [{ type: 'parentDog' }],
    },
    {
      name: 'mother',
      title: 'Mère',
      type: 'reference',
      to: [{ type: 'parentDog' }],
    },
    {
      name: 'included',
      title: 'Ce qui est inclus',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'breed',
      media: 'mainImage',
      status: 'status',
    },
    prepare(selection: any) {
      const { title, subtitle, media, status } = selection;
      const statusLabels: Record<string, string> = {
        available: 'Disponible',
        reserved: 'Réservé',
        coming: 'Bientôt',
        adopted: 'Adopté',
      };
      return {
        title: `${title} [${statusLabels[status] || status}]`,
        subtitle,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Date de naissance',
      name: 'dobDesc',
      by: [{ field: 'dob', direction: 'desc' }],
    },
    {
      title: 'Statut',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
};

export default puppy;
