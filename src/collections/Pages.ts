import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL',
      admin: {
        description: 'Например: sozdat-bloknot',
        position: 'sidebar',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      required: true,
      label: 'meta title',
      admin: {
        position: 'sidebar',
      },
    },
    
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'keywords',
      type: 'text',
      label: 'Ключевые слова',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'ogImage',
      label: 'OG изображение',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'noIndex',
      label: 'Не индексировать',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'H1',
      required: true,
      defaultValue: 'Каталог продукции',
    },
    {
      name: 'subtitle',
      type: 'array',
      label: 'Подзаголовок (строки)',
      minRows: 0,
      maxRows: 5,
      fields: [
        {
          name: 'line',
          type: 'text',
        },
      ],
      defaultValue: [
        { line: 'Не просто печать — а результат.' },
        { line: 'Проверим макет, подскажем улучшения и сделаем идеально' },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Фон Hero (картинка)',
      required: false,
    },
    {
      name: 'AboutProducts',
      label: 'h2 О продуктах',
      type: 'text',
    },
    {
      name: 'productDescription',
      type: 'textarea',
      label: 'Описание товара (Markdown)',
      admin: {
        description: 'Поддерживает: **жирный**, *курсив*, `код`, [ссылки](url), списки',
        rows: 10,
      },
    },
    {
      name: 'ReviewsTitle',
      label: 'h2 Отзывов',
      type: 'text',
    },
    {
      name: 'reviews',
      label: 'Отзывы',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'num',
          label: 'Номер Отзыва (например 01)',
          type: 'text',
          required: true,
        },
        {
          name: 'name',
          label: 'Имя',
          type: 'text',
          required: true,
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Рейтинг (1-5)',
          min: 1,
          max: 5,
          defaultValue: 5,
        },
        {
          name: 'text',
          label: 'Текст',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}