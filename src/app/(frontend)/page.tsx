import { getPayload } from 'payload'
import config from '@payload-config'
import Hero from "./components/mainPage/Hero/Hero"
import RoadMap from './components/mainPage/RoadMap/RoadMap'

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function Page() {
  const payload = await getPayload({ config })
  

  const hero = await payload.findGlobal({
    slug: 'hero' as never,
    depth: 2, // чтобы backgroundImage раскрылся в объект с url
  })
  const roadmap = await payload.findGlobal({
    slug: 'roadmap' as never,
    depth: 1,
  })

  return (
    <main>
      <Hero hero={hero as any} />
      <RoadMap steps={(roadmap as any)?.steps ?? []}/>
    </main>
  )
}
