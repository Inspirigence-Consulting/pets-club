const parentDog = {
  name: 'parentDog',
  title: 'Chiens Reproducteurs',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      description: 'Nom complet avec titres (ex: CH. Royal Crown\'s Golden Prince)',
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
      name: 'color',
      title: 'Couleur',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Photo principale',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Photo de profil du reproducteur',
    },
    {
      name: 'gallery',
      title: 'Galerie photos',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          {
            name: 'caption',
            title: 'Légende',
            type: 'string',
          },
        ],
      }],
      description: 'Photos supplémentaires (expositions, avec chiots, etc.)',
    },
    {
      name: 'titles',
      title: 'Titres & Récompenses',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'healthTests',
      title: 'Tests de Santé',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ex: Patella: 0/0, Cardiaque: Normal, ADN: Clair',
    },
    {
      name: 'pedigree',
      title: 'Documents Pedigree',
      type: 'array',
      of: [{ type: 'file' }],
    },
    {
      name: 'healthDocs',
      title: 'Documents de Santé',
      type: 'array',
      of: [{ type: 'file' }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'retired',
      title: 'Retraité',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'breed',
      media: 'image',
    },
  },
};

export default parentDog;
