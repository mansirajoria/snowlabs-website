import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blog',
  title: 'Blog Post',
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
      name: 'author',
      title: 'Author',
      type: 'string', // Simple string for now, could reference an 'author' schema later
      initialValue: 'Admin', // Default author
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short summary of the blog post for list views.',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping
      },
      // Not making image required for now
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { 
          type: 'block', 
          // Add custom styles or marks if needed
        },
        {
          type: 'image', 
          options: { hotspot: true }, 
        },
        // Add other content types like code blocks if necessary
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const { title, author, media, publishedAt } = selection
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'
      return {
        title: title,
        subtitle: `${author ? 'By ' + author : ''} | ${date}`,
        media: media,
      }
    },
  },
}) 