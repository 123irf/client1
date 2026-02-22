import { defineType, defineField, defineArrayMember } from 'sanity'
import { BasketIcon } from '@sanity/icons'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
    }),
    defineField({
      name: 'discount',
      title: 'Discount (%)',
      type: 'number',
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'highlights',
      title: 'Product Highlights',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'object',
      fields: [
        defineField({ name: 'age', type: 'string', title: 'Recommended Age' }),
        defineField({ name: 'subjects', type: 'string', title: 'Subjects' }),
        defineField({ name: 'connectivity', type: 'string', title: 'Connectivity' }),
        defineField({ name: 'safety', type: 'string', title: 'Safety' }),
        defineField({ name: 'battery', type: 'string', title: 'Battery Life' }),
        defineField({ name: 'warranty', type: 'string', title: 'Warranty' }),
      ],
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (rule) => rule.min(0).max(5),
    }),
    defineField({
      name: 'reviews',
      title: 'Number of Reviews',
      type: 'number',
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      price: 'price',
    },
    prepare({ title, media, price }) {
      return {
        title,
        subtitle: price ? `₹${price}` : '',
        media,
      }
    },
  },
})
