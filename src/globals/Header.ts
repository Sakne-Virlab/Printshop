import type { GlobalConfig } from "payload";

export const HeaderGlobal: GlobalConfig = {
  slug: "header",
  admin: { group: 'Layout' },
  label: "Header",
  access: { read: () => true },

  fields: [
    // логотип
    {
      name: "logo",
      label: "Логотип (белый)",
      type: "upload",
      relationTo: "media",
      required: true,
    },

    // меню
    {
      name: "nav",
      label: "Меню",
      type: "array",
      minRows: 1,
      maxRows: 10,
      fields: [
        { name: "label", label: "Текст", type: "text", required: true },
        { name: "href", label: "Ссылка (#anchor или /page)", type: "text", required: true },
      ],
    },

    // контакты в pill (телефон, email и т.п.)
    {
      name: "pillItems",
      label: "Контакты (pill)",
      type: "array",
      minRows: 0,
      maxRows: 10,
      fields: [
        {
          name: "icon",
          label: "Иконка",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        { name: "label", label: "Текст", type: "text", required: true },
        { name: "href", label: "Ссылка (tel:, mailto:, https://...)", type: "text", required: true },
      ],
    },
  ],
};
