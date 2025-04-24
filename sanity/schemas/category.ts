import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons' // Example icon

export default defineType({
  name: 'category',
  title: 'Course Category',
  type: 'document',
  icon: TagIcon, // Optional: Adds an icon in the Sanity Studio UI
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of the category (e.g., ServiceNow ITSM, SAP FICO)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A unique identifier used in URLs (click Generate). Lowercase, no spaces.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    // Optional: Add a description field if needed
    // defineField({
    //   name: 'description',
    //   title: 'Description',
    //   type: 'text',
    //   description: 'A brief description of the category.',
    // }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return { ...selection }
    },
  },
}) 