const siteSettings = {
  name: 'siteSettings',
  title: 'Paramètres du Site',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre du site',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'whatsappNumber',
      title: 'Numéro WhatsApp',
      type: 'string',
      description: 'Format international: +212600000000',
    },
    {
      name: 'email',
      title: 'Email de contact',
      type: 'string',
    },
    {
      name: 'instagramUrl',
      title: 'URL Instagram',
      type: 'url',
    },
    {
      name: 'facebookUrl',
      title: 'URL Facebook',
      type: 'url',
    },
    {
      name: 'address',
      title: 'Adresse',
      type: 'text',
      rows: 2,
    },
    {
      name: 'heroHeadline',
      title: 'Titre du Hero',
      type: 'string',
    },
    {
      name: 'heroSubtitle',
      title: 'Sous-titre du Hero',
      type: 'text',
      rows: 2,
    },
    {
      name: 'heroImage',
      title: 'Image Hero',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'aboutText',
      title: 'Texte À Propos',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'ethicsText',
      title: 'Texte Éthique',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Paramètres du Site',
      };
    },
  },
};

export default siteSettings;
