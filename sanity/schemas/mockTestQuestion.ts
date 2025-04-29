import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mockTestQuestion',
  title: 'Mock Test Question',
  type: 'object',
  fields: [
    defineField({
      name: 'questionText',
      title: 'Question Text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [
        defineField({
          name: 'option',
          type: 'object',
          fields: [
            defineField({ name: 'text', type: 'string', title: 'Option Text', validation: (Rule) => Rule.required() }),
            defineField({ name: 'isCorrect', type: 'boolean', title: 'Is Correct Answer', initialValue: false }),
          ],
          preview: {
            select: {
              text: 'text',
              isCorrect: 'isCorrect',
            },
            prepare({ text, isCorrect }) {
              return {
                title: text,
                subtitle: isCorrect ? 'Correct Answer' : 'Incorrect'
              }
            }
          }
        }),
      ],
      validation: (Rule) => Rule.required().min(2).error('Must have at least 2 options.'),
    }),
    defineField({
      name: 'explanation',
      title: 'Explanation (Optional)',
      type: 'array',
      of: [{ type: 'block' }], // Allow rich text for explanations
    }),
  ],
  preview: {
    select: {
      title: 'questionText',
    },
    prepare({ title }) {
      return {
        title: title,
      }
    },
  },
}) 