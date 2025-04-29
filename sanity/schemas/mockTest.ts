import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mockTest',
  title: 'Mock Test',
  type: 'document', // Document type as it's a standalone test
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Brief overview of the mock test.',
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [{ type: 'block' }], // Rich text for instructions
      description: 'Instructions for taking the test (e.g., time limits, scoring).'
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        { type: 'mockTestQuestion' } // Reference the mock test question schema
      ],
      validation: (Rule) => Rule.required().min(1).error('A mock test must have at least one question.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare(selection) {
      const { title, description } = selection
      return {
        title: title,
        subtitle: description,
      }
    },
  },
}) 