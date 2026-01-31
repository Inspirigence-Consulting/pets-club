const testimonial = {
  name: 'testimonial',
  title: 'Témoignages',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom de la famille',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Ville',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Témoignage',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'breed',
      title: 'Race du compagnon',
      type: 'string',
      options: {
        list: [
          { title: 'Spitz Nain', value: 'Spitz Nain' },
          { title: 'Berger Australien', value: 'Berger Australien' },
        ],
      },
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'approved',
      title: 'Approuvé',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'image',
    },
  },
};

export default testimonial;
