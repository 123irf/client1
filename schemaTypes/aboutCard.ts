import { defineType, defineField, defineArrayMember } from 'sanity'
import { InfoOutlineIcon } from '@sanity/icons'

export const aboutCard = defineType({
  name: 'aboutCard',
  title: 'About Card',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Card Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
    }),
    defineField({
      name: 'bulletPoints',
      title: 'Bullet Points',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
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
      title: 'title',
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
