import type { GlobalConfig } from 'payload'

export const RoadMapGlobal: GlobalConfig = {
  slug: 'roadmap',
  admin: { group: 'MainPage' },
  label: 'RoadMap',
  access: { read: () => true },

  fields: [
    {
      name: 'steps',
      label: 'Шаги',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'step',
          label: 'Номер шага (например 01)',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          label: 'Заголовок',
          type: 'text',
          required: true,
        },
        {
          name: 'points',
          label: 'Пункты',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'text',
              label: 'Текст пункта',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
