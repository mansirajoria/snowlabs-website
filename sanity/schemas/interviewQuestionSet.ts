import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'interviewQuestionSet',
  title: 'Interview Question Set',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Set Title',
      type: 'string',
      description: 'The title for this set of interview questions (e.g., Top 20 ServiceNow TPRM Questions)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { 
        source: 'title', 
        maxLength: 96 
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'introduction',
        title: 'Introduction (Optional)',
        type: 'array',
        of: [{ type: 'block' }],
        description: 'Optional introductory text before the questions in this set.',
    }),
    defineField({
      name: 'questionsList',
      title: 'Questions List',
      type: 'array',
      of: [
        { type: 'interviewQuestion' }
      ],
      validation: (Rule) => Rule.required().min(1).error('Must add at least one question to the set.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title,
        subtitle: 'Interview Question Set'
      }
    }
  }
}) 