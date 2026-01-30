import type { GlobalConfig } from "payload";

export const ContactsGlobal: GlobalConfig = {
  slug: "contacts",
  label: "Contacts",
  access: { read: () => true },

  fields: [
    {
      name: "title",
      label: "Заголовок",
      type: "text",
      required: true,
      defaultValue: "Контакты",
    },

    // Координаты и настройки карты
    {
      name: "map",
      label: "Карта",
      type: "group",
      fields: [
        {
          name: "centerLat",
          label: "Широта (center)",
          type: "number",
          required: true,
          defaultValue: 55.751574,
        },
        {
          name: "centerLng",
          label: "Долгота (center)",
          type: "number",
          required: true,
          defaultValue: 37.573856,
        },
        {
          name: "zoom",
          label: "Zoom",
          type: "number",
          required: true,
          defaultValue: 15,
          min: 1,
          max: 20,
        },
        {
          name: "placemarkText",
          label: "Текст балуна",
          type: "text",
          defaultValue: "Мы здесь",
        },
      ],
    },

    // Адрес блок
    {
      name: "address",
      label: "Адрес",
      type: "group",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "Адрес" },
        { name: "value", type: "text", required: true, defaultValue: "Кемерово" },
      ],
    },

    // Связь блок
    {
      name: "contact",
      label: "Мы на связи",
      type: "group",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "Мы на связи" },
        {
          name: "phone",
          label: "Телефон (отображение)",
          type: "text",
          required: true,
          defaultValue: "+7 (999) 99 99 9",
        },
        {
          name: "phoneHref",
          label: "Телефон (href, tel:...)",
          type: "text",
          required: true,
          defaultValue: "tel:+79999999999",
        },
      ],
    },

    // Соцсети
    {
      name: "socials",
      label: "Соцсети",
      type: "array",
      minRows: 0,
      maxRows: 6,
      fields: [
        { name: "text", label: "Название", type: "text", required: true },
        { name: "url", label: "Ссылка", type: "text", required: true },

        // Иконка: можно upload в media (рекомендую)
        {
          name: "icon",
          label: "Иконка",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
