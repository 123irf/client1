import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name & Role',
      type: 'string',
      description: 'e.g. "Anita • Parent of 6-year-old"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location / School',
      type: 'string',
      description: 'e.g. "Bangalore" or "Private school"',
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1–5)',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 99,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'image',
    },
  },
})
