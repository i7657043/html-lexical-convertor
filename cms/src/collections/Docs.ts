import type { CollectionConfig } from 'payload'

export const Docs: CollectionConfig = {
  slug: 'docs',
  access: {
    read: () => true,
    create: () => true,
  },
  auth: false,
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
