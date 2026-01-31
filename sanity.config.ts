import { defineConfig } from 'sanity';
import { structureTool, type StructureBuilder } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';

export default defineConfig({
  name: 'pets-club-maroc',
  title: "Pet's Club Maroc - CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem()
              .title('Chiots')
              .schemaType('puppy')
              .child(S.documentTypeList('puppy').title('Chiots')),
            S.listItem()
              .title('Chiens Reproducteurs')
              .schemaType('parentDog')
              .child(S.documentTypeList('parentDog').title('Reproducteurs')),
            S.divider(),
            S.listItem()
              .title('Articles de Blog')
              .schemaType('blogPost')
              .child(S.documentTypeList('blogPost').title('Articles')),
            S.listItem()
              .title('Témoignages')
              .schemaType('testimonial')
              .child(S.documentTypeList('testimonial').title('Témoignages')),
            S.listItem()
              .title('Galerie')
              .schemaType('galleryItem')
              .child(S.documentTypeList('galleryItem').title('Photos')),
            S.divider(),
            S.listItem()
              .title('Paramètres du Site')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
