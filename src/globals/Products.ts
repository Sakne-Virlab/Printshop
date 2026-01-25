import type { GlobalConfig } from "payload";

export const ProductsGlobal: GlobalConfig = {
  slug: "products",
  label: "Products",
  access: { read: () => true },

  fields: [
    // 🔹 Заголовок секции
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Продукция",
    },

    // 🔹 Описание
    {
      name: "description",
      type: "textarea",
      required: true,
    },

    // 🔹 Кнопка "Посмотреть все"
    {
      name: "button",
      type: "group",
      fields: [
        { name: "text", type: "text", required: true },
        { name: "url", type: "text", required: true },
      ],
    },

    // 🔹 Карточки
    {
      name: "cards",
      label: "Карточки",
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "category",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
        {
          name: "background",
          label: "Фон карточки",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
