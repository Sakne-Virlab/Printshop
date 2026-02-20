import { getPayload, serializePayloadData } from '@/lib/get-payload'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import styles from "./page.module.scss"
import MarkdownBlock from '../../components/common/MarkdownBlock/MarkdownBlock'
import Reviews from '../../components/common/Reviews/Reviews'
import Contacts from '../../components/mainPage/Contacts/Contacts'

interface PageProps {
  params: Promise<{ slug: string }>
}

const payload = await getPayload()
const contacts = await payload.findGlobal({
    slug: "contacts" as never,
    depth: 2,
  });

const serializedContacts = serializePayloadData(contacts);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload()

  const pages = await payload.find({
    collection: 'pages' as any,
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  if (!pages.docs.length) {
    return { title: 'Страница не найдена' }
  }

  const page = pages.docs[0] as any

  const ogUrl =
    page?.ogImage && typeof page.ogImage === 'object'
      ? page.ogImage.url
      : undefined

  return {
    title: page?.metaTitle ?? 'Главная',
    description: page?.description ?? '',
    keywords: page?.keywords ? page.keywords.split(',').map((s: string) => s.trim()) : undefined,
    robots: page?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: page?.title ?? undefined,
      description: page?.description ?? undefined,
      images: ogUrl ? [{ url: `http://${process.env.URL}${ogUrl}` }] : undefined,
    },
  }
}

function getMediaUrl(maybe: any): string | undefined {
  // Payload может вернуть либо объект { url }, либо id (если depth маленький)
  if (!maybe) return undefined;
  if (typeof maybe === "string") return undefined;
  return maybe.url;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params
    const payload = await getPayload()

    const pages = await payload.find({
        collection: 'pages' as any,
        where: {
        slug: { equals: slug },
        },
        limit: 1,
    })

    if (!pages.docs.length) {
        notFound()
    }

    const page = pages.docs[0] as any

  
    const title = page?.title ?? "Каталог продукции";
    const lines = Array.isArray(page?.subtitle) ? page.subtitle : [];
    const bgUrl = getMediaUrl(page?.backgroundImage);
    const AboutProducts = page?.AboutProducts ?? "О нашей продукции";
    const productDescription = page?.productDescription ?? "";
    const ReviewsTitle = page?.ReviewsTitle ?? "Отзывы";
    const reviews = page?.reviews ?? [];

  return (
    <div>
      <div className={styles.head} style={{ backgroundImage: `url(${bgUrl})` }}>
        <div className={styles.headContent}>
            <h1>{title.split("|").map((line, i) => (
                <span key={i}>
                {line}
                <br />
                </span>
            ))}
            </h1>

            {lines.length > 0 && (
            <div className={styles.subTitle}>
                {lines.map((item, idx) => (
                <p key={idx}>{item.line}</p>
                ))}
            </div>
            )}
        </div>

        

        </div>

        <div className='container'>
            <h2>{AboutProducts}</h2>
            {productDescription && (
                <MarkdownBlock content={productDescription} />
            )}
        </div>
        <div className='container'>
            <h2>{ReviewsTitle}</h2>
            <Reviews steps={reviews}/>
        </div>
        
        <Contacts data={serializedContacts as any} />
        
    </div>
  )
}