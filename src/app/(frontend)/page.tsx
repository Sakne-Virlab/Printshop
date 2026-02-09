import { getPayload, serializePayloadData } from '@/lib/get-payload'
import type { Metadata } from 'next'
import Hero from "./components/mainPage/Hero/Hero"
import RoadMap from './components/mainPage/RoadMap/RoadMap'
import Products from './components/mainPage/Products/Products'
import Calculator from './components/mainPage/Calculator/Calculator'
import About from './components/mainPage/About/About'
import Contacts from './components/mainPage/Contacts/Contacts'


export const revalidate = 60;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload()

  const seo = await payload.findGlobal({
    slug: 'seo' as never,
    depth: 2,
  })

  const home = (seo as any).home

  const ogUrl =
    home?.ogImage && typeof home.ogImage === 'object'
      ? home.ogImage.url
      : undefined

  return {
    title: home?.title ?? 'Главная',
    description: home?.description ?? '',
    keywords: home?.keywords ? home.keywords.split(',').map((s: string) => s.trim()) : undefined,
    robots: home?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: home?.title ?? undefined,
      description: home?.description ?? undefined,
      images: ogUrl ? [{ url: ogUrl }] : undefined,
    },
  }
}

export default async function Page() {
  const payload = await getPayload()
  

  const hero = await payload.findGlobal({
    slug: 'hero' as never,
    depth: 2, // чтобы backgroundImage раскрылся в объект с url
  })
  const roadmap = await payload.findGlobal({
    slug: 'roadmap' as never,
    depth: 1,
  })
  const products = await payload.findGlobal({
    slug: "products" as never,
    depth: 2,
  });
  const about = await payload.findGlobal({
    slug: "about" as never,
    depth: 2,
  });
  const contacts = await payload.findGlobal({
    slug: "contacts" as never,
    depth: 2,
  });

  // Сериализуем данные для безопасной передачи на клиент
  // Это предотвращает ошибки с несериализуемыми объектами (auth, функции и т.д.)
  const serializedHero = serializePayloadData(hero);
  const serializedRoadmap = serializePayloadData(roadmap);
  const serializedProducts = serializePayloadData(products);
  const serializedAbout = serializePayloadData(about);
  const serializedContacts = serializePayloadData(contacts);

  return (
    <main>
      <Hero hero={serializedHero as any} />
      <RoadMap steps={(serializedRoadmap as any)?.steps ?? []}/>
      <Products data={serializedProducts as any} />
      <Calculator/>
      <About data={serializedAbout as any}/>
      <Contacts data={serializedContacts as any} />
    </main>
  )
}
