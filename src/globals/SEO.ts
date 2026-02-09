import type { GlobalConfig } from 'payload'

export const SEOGlobal: GlobalConfig = {
  slug: 'seo',
  label: 'SEO',
  access: {
    read: () => true,
  },
  fields: [
    // Главная
    {
      name: 'layout',
      label: 'Layout',
      type: 'group',
      fields: [
            {
            name: 'favicon',
            label: 'Favicon (назовите файл favicon.svg)',
            type: 'upload',
            relationTo: 'media',
            required: false,
            },
            {
            name: 'verification',
            label: 'Verification',
            type: 'group',
            fields: [
                { name: 'google', label: 'Google verification', type: 'text' },
                { name: 'yandex', label: 'Yandex verification', type: 'text' },
            ],
            },
        ],
    },
    {
      name: 'home',
      label: 'Главная',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'keywords', type: 'text' },
        {
          name: 'ogImage',
          label: 'OG изображение',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'noIndex',
          label: 'Не индексировать',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
