import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
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
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Assign a category to this course.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Course Image',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text', // Use 'text' for multi-line basic text
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'array', // Use 'array' of 'block' for rich text
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'}
            ],
          },
        },
         // You can add other block types here if needed, like images within the description
         // {
         //   type: 'image'
         // }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Course',
      type: 'boolean',
      description: 'Mark this course to feature it on the homepage.',
      initialValue: false,
      group: 'flags',
    }),
    defineField({
      name: 'isUpcoming',
      title: 'Upcoming Training',
      type: 'boolean',
      description: 'Mark this course as an upcoming training session.',
      initialValue: false,
      group: 'flags',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      description: 'The specific start date and time for the upcoming session.',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      hidden: ({document}) => !document?.isUpcoming,
      group: 'details',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "40 hours", "6 Weeks"',
      group: 'details',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
        layout: 'radio', // or 'dropdown'
      },
       validation: (Rule) => Rule.required(),
       group: 'details',
    }),
     defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Enter price in USD (e.g., 499.99)',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Average rating (e.g., 4.5)',
      validation: Rule => Rule.min(0).max(5)
    }),
    defineField({
      name: 'students',
      title: 'Number of Students',
      type: 'number',
      description: 'Total enrolled students',
      validation: Rule => Rule.integer().min(0)
    }),
    defineField({
      name: 'modules',
      title: 'Course Modules/Syllabus',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', type: 'string', title: 'Module Title', validation: (Rule) => Rule.required()},
          {
            name: 'description', 
            title: 'Module Description', 
            type: 'array', 
            of: [{ type: 'block' }] 
          }
        ]
      }]
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'quote', type: 'text', title: 'Quote', validation: (Rule) => Rule.required()},
          {name: 'author', type: 'string', title: 'Author', validation: (Rule) => Rule.required()}
        ]
      }]
    }),
  ],
  groups: [
    { name: 'details', title: 'Course Details' },
    { name: 'content', title: 'Content & Syllabus' },
    { name: 'flags', title: 'Settings & Flags' }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'instructor',
      categoryTitle: 'category.title',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle, categoryTitle, media } = selection
      return {
        title,
        subtitle: `${subtitle || ''}${categoryTitle ? ` | ${categoryTitle}` : ''}`,
        media,
      }
    },
  },
}) 