import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons' // Optional: Add an icon for the schema in the studio

export default defineType({
  name: 'webinar',
  title: 'Webinar',
  type: 'document',
  icon: PlayIcon, // Optional: Use an appropriate icon
  fields: [
    defineField({
      name: 'title',
      title: 'Webinar Title',
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
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      description: 'The date the webinar was originally published or recorded.',
    }),
    defineField({
        name: 'youtubeVideoUrl',
        title: 'YouTube Video URL',
        type: 'url',
        description: 'Paste the full YouTube video URL here (e.g., https://www.youtube.com/watch?v=...).',
        validation: (Rule) => Rule.required().uri({
            scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Short Summary',
      type: 'text',
      rows: 3,
      description: 'A brief summary shown on the webinar listing page.',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
        name: 'featuredImage',
        title: 'Featured Image / Thumbnail',
        type: 'image',
        options: {
          hotspot: true, // Allows selecting focal point
        },
        description: 'Optional. Image used for the card on the listing page and social sharing.',
      }),
    defineField({
      name: 'presenter',
      title: 'Presenter(s)',
      type: 'string',
      description: 'Name(s) of the person(s) presenting the webinar.',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
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
            // Allow links within the description
            annotations: [
                {
                  name: 'link',
                  type: 'object',
                  title: 'URL',
                  fields: [
                    {
                      name: 'href',
                      type: 'url',
                      title: 'URL'
                    }
                  ]
                }
              ]
          },
        },
        // Allow adding images directly within the description if needed
        // {
        //   type: 'image',
        //   options: {hotspot: true}
        // }
      ],
      description: 'Detailed information about the webinar content, shown below the video.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Relevant keywords for categorization and search (optional).',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'presenter',
      media: 'featuredImage', // Use featuredImage for preview
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Untitled Webinar',
        subtitle: subtitle ? `Presented by ${subtitle}` : '',
        media: media || PlayIcon, // Fallback icon if no image
      }
    },
  },
}) 