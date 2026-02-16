import type { GlobalConfig } from "payload";

export const AboutGlobal: GlobalConfig = {
  slug: "about",
  admin: { group: 'MainPage' },
  label: "About",
  access: { read: () => true },

  fields: [
    // 🔹 Левый верх
    {
      name: "leftTitle",
      label: "Заголовок слева (2 строки)",
      type: "array",
      minRows: 1,
      maxRows: 3,
      fields: [{ name: "line", type: "text", required: true }],
      defaultValue: [
        { line: "Наша история проста:" },
        { line: "мы любим то, что делаем, и делаем это на отлично." },
      ],
    },
    {
      name: "leftText",
      label: "Текст слева",
      type: "textarea",
      required: true,
    },

    // 🔹 Левые пункты (иконка + текст)
    {
      name: "leftPoints",
      label: "Пункты слева",
      type: "array",
      minRows: 0,
      maxRows: 6,
      fields: [
        {
          name: "icon",
          label: "Иконка",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "text",
          label: "Текст",
          type: "textarea",
          required: true,
        },
      ],
    },

    // 🔹 Правая колонка (картинка + заголовок + текст)
    {
      name: "rightBlocks",
      label: "Блоки справа",
      type: "array",
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: "image",
          label: "Картинка",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "title",
          label: "Заголовок",
          type: "text",
          required: true,
        },
        {
          name: "text",
          label: "Описание",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};
