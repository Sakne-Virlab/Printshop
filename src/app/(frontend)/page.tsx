import { getPayload } from '@/lib/get-payload'
import Hero from "./components/mainPage/Hero/Hero"
import RoadMap from './components/mainPage/RoadMap/RoadMap'
import Products from './components/mainPage/Products/Products'
import Calculator from './components/mainPage/Calculator/Calculator'
import About from './components/mainPage/About/About'
import Contacts from './components/mainPage/Contacts/Contacts'

export const revalidate = 60;
export const dynamic = "force-dynamic";

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

  return (
    <main>
      <Hero hero={hero as any} />
      <RoadMap steps={(roadmap as any)?.steps ?? []}/>
      <Products data={products as any} />
      <Calculator/>
      <About data={about as any}/>
      <Contacts data={contacts as any} />
    </main>
  )
}
