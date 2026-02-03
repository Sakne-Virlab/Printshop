import type { GlobalConfig } from "payload";

export const FooterGlobal: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  access: { read: () => true },

  fields: [
    // 🔹 Логотип
    {
      name: "logo",
      label: "Логотип",
      type: "upload",
      relationTo: "media",
      required: true,
    },

    // 🔹 Инфо слева
    {
      name: "info",
      label: "Информация",
      type: "group",
      fields: [
        {
          name: "city",
          label: "Город",
          type: "text",
          required: true,
        },
        {
          name: "workTime",
          label: "График работы",
          type: "textarea",
          required: true,
          admin: {
            description: "Можно использовать переносы строк",
          },
        },
      ],
    },

    // 🔹 Центральное меню
    {
      name: "menu",
      label: "Меню",
      type: "array",
      minRows: 1,
      fields: [
        { name: "label", label: "Текст", type: "text", required: true },
        { name: "url", label: "Ссылка", type: "text", required: true },
      ],
    },

    // 🔹 Нижняя ссылка (политика)
    {
      name: "policy",
      label: "Политика",
      type: "group",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "url", type: "text", required: true },
      ],
    },

    // 🔹 Контакты справа
    {
      name: "contact",
      label: "Контакты",
      type: "group",
      fields: [
        {
          name: "phone",
          label: "Телефон (отображение)",
          type: "text",
          required: true,
        },
        {
          name: "phoneHref",
          label: "Телефон (tel:)",
          type: "text",
          required: true,
        },
      ],
    },

    // 🔹 Соцсети
    {
      name: "socials",
      label: "Соцсети",
      type: "array",
      minRows: 0,
      fields: [
        {
          name: "icon",
          label: "Иконка",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "url",
          label: "Ссылка",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
