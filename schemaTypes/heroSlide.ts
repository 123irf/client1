import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Slide Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
      order: 'order',
    },
    prepare({ title, media, order }) {
      return {
        title,
        subtitle: `Order: ${order ?? 0}`,
        media,
      }
    },
  },
})
