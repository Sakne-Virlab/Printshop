import React from 'react'
import './styles.scss'
import { Montserrat, Unbounded, Manrope } from "next/font/google";
import { getPayload, serializePayloadData } from "@/lib/get-payload";

import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const payload = await getPayload();

  const footer = await payload.findGlobal({
    slug: "footer" as never,
    depth: 2,
  });

  const header = await payload.findGlobal({
    slug: "header" as never,
    depth: 2, // чтобы icon.url и logo.url раскрылись
  });

  // Сериализуем данные для безопасной передачи на клиент
  // Это предотвращает ошибки с несериализуемыми объектами (auth, функции и т.д.)
  const serializedHeader = serializePayloadData(header);
  const serializedFooter = serializePayloadData(footer);

  return (
    <html lang="ru">
      <body className={`${montserrat.variable} ${unbounded.variable} ${manrope.variable}`}>
        <Header data={serializedHeader as any} />
        <main>{children}</main>
        <Footer data={serializedFooter as any} />
      </body>
    </html>
  )
}
