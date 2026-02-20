import type { GlobalConfig } from 'payload'

export const CatalogHeadGlobal: GlobalConfig = {
  slug: 'cataloghead',
  admin: { group: 'Catalog' },

  hooks: {
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import("next/cache");
          revalidatePath("/"); // главная
        } catch (e) {
          console.warn("Revalidate failed", e);
        }
      },
    ],
  },

  label: 'Hero',
  access: {
    read: () => true,
  },
  fields: [
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
  ],
}
