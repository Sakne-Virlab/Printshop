import type { GlobalConfig } from 'payload'

export const HeroGlobal: GlobalConfig = {
  slug: 'hero',

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
      defaultValue: 'типография полного цикла',
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
          required: true,
        },
      ],
      defaultValue: [
        { line: 'Не просто печать — а результат.' },
        { line: 'Проверим макет, подскажем улучшения и сделаем идеально' },
      ],
    },
    {
      name: 'button',
      type: 'group',
      label: 'Кнопка',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: 'Рассчитать стоимость',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Ссылка (href)',
          required: true,
          defaultValue: '/calculate',
        },
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
