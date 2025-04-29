import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons' // Optional: Add an icon

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      description: 'The main text of the testimonial.',
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      description: 'Name of the person giving the testimonial.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorRole',
      title: 'Author Role/Title',
      type: 'string',
      description: 'Optional: Role or title of the author (e.g., \'ServiceNow Developer\', \'Student\').',
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
      options: {
        hotspot: true, // Allows selecting focal point
      },
      description: 'Optional: A photo of the person giving the testimonial.',
    }),
    defineField({
        name: 'displayOnHomepage',
        title: 'Display on Homepage?',
        type: 'boolean',
        description: 'Check this box to feature this testimonial on the homepage section.',
        initialValue: false,
      }),
  ],
  preview: {
    select: {
      title: 'quote',
      subtitle: 'authorName',
      media: 'authorImage',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      // Truncate long quotes for preview
      const truncatedTitle = title && title.length > 50 ? `${title.substring(0, 50)}...` : title
      return {
        title: truncatedTitle || 'No quote entered',
        subtitle: subtitle || 'Anonymous',
        media: media || UserIcon, // Fallback icon if no image
      }
    },
  },
}) 