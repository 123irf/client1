import { defineType, defineField, defineArrayMember } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'emails',
      title: 'Email Addresses',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'phones',
      title: 'Phone Numbers',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
    }),
  ],
})
