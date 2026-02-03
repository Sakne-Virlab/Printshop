import React from 'react'
import './styles.scss'
import { Montserrat, Unbounded, Manrope } from "next/font/google";
import { getPayload } from "payload";
import config from "@/payload.config";

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

  const payload = await getPayload({ config });

  const footer = await payload.findGlobal({
    slug: "footer" as never,
    depth: 2,
  });

  return (
    <html lang="ru">
      <body className={`${montserrat.variable} ${unbounded.variable} ${manrope.variable}`}>
        <Header/>
        <main>{children}</main>
        <Footer data={footer as any} />
      </body>
    </html>
  )
}
