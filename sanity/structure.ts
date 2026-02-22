import type { StructureResolver } from 'sanity/structure'
import { EnvelopeIcon } from '@sanity/icons'

// Singleton types that should not appear in generic lists
const SINGLETONS = ['contactInfo']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('KidZoFi Store')
    .items([
      // Singleton: Contact Info
      S.listItem()
        .title('Contact Information')
        .icon(EnvelopeIcon)
        .child(
          S.document()
            .schemaType('contactInfo')
            .documentId('contactInfo')
            .title('Contact Information')
        ),

      S.divider(),

      // Products & Categories
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('category').title('Categories'),

      S.divider(),

      // Site Content
      S.documentTypeListItem('heroSlide').title('Hero Slides'),
      S.documentTypeListItem('aboutCard').title('About Cards'),

      S.divider(),

      // Users
      S.documentTypeListItem('user').title('Users'),

      // Remaining types (filtered)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !SINGLETONS.includes(listItem.getId() as string) &&
          !['product', 'category', 'heroSlide', 'aboutCard', 'user'].includes(
            listItem.getId() as string
          )
      ),
    ])
