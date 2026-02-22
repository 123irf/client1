import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const user = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'passwordHash',
      title: 'Password Hash',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'string',
    }),
    defineField({
      name: 'provider',
      title: 'Auth Provider',
      type: 'string',
      options: {
        list: [
          { title: 'Credentials', value: 'credentials' },
          { title: 'Google', value: 'google' },
        ],
      },
      initialValue: 'credentials',
    }),
    defineField({
      name: 'providerId',
      title: 'Provider Account ID',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
})
