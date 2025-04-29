import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'interviewQuestion',
  title: 'Interview Question',
  type: 'object', // Changed to object as it might be embedded or referenced
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [{ type: 'block' }], // Allow rich text for answers
      validation: (Rule) => Rule.required(),
    }),
    // Optional: Add category/topic if needed later
    // defineField({
    //   name: 'topic',
    //   title: 'Topic',
    //   type: 'string',
    // }),
  ],
}) 