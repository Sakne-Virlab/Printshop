import { getPayload, serializePayloadData } from '@/lib/get-payload'
import type { Metadata } from 'next'
import Calculator from '../components/mainPage/Calculator/Calculator';
import Contacts from '../components/mainPage/Contacts/Contacts';

import styles from './catalog.module.scss'


interface ProductCard {
  category: string;
  url: string;
  background?: { url?: string };
}

type HeroData = {
  title?: string;
  subtitle?: { line: string }[];
  backgroundImage?: { url?: string } | string | null;
};

interface ProductsData {
  title: string;
  description: string;
  button: {
    text: string;
    url: string;
  };
  cards: ProductCard[];
}



export const revalidate = 60;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload()

  const seo = await payload.findGlobal({
    slug: 'seo' as never,
    depth: 2,
  })

  const catalog = (seo as any).catalog

  const ogUrl =
    catalog?.ogImage && typeof catalog.ogImage === 'object'
      ? catalog.ogImage.url
      : undefined

  return {
    title: catalog?.title ?? 'Главная',
    description: catalog?.description ?? '',
    keywords: catalog?.keywords ? catalog.keywords.split(',').map((s: string) => s.trim()) : undefined,
    robots: catalog?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: catalog?.title ?? undefined,
      description: catalog?.description ?? undefined,
      images: ogUrl ? [{ url: `http://${process.env.URL}${ogUrl}` }] : undefined,
    },
  }
}

const Card = ({ category, bgUrl, url }: {
  category: string;
  bgUrl?: string;
  url: string;
}) => {
  return (
    <a
      href={url}
      className={styles.Card}
      style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : undefined}
    >
      <span className={styles.arrow} />
      <p className={styles.categoryTitle}>{category}</p>
    </a>
  );
};

const payload = await getPayload()
const contacts = await payload.findGlobal({
    slug: "contacts" as never,
    depth: 2,
  });

const serializedContacts = serializePayloadData(contacts);

function getMediaUrl(maybe: any): string | undefined {
  // Payload может вернуть либо объект { url }, либо id (если depth маленький)
  if (!maybe) return undefined;
  if (typeof maybe === "string") return undefined;
  return maybe.url;
}

export default async function CatalogPage() {

    const payload = await getPayload()
    const data = (await payload.findGlobal({
        slug: "products" as never,
        depth: 2,
    })) as unknown as ProductsData;

    const HeroContent = (await payload.findGlobal({
        slug: "cataloghead" as never,
        depth: 2,
    })) as unknown as HeroData;

    const title = HeroContent?.title ?? "Каталог продукции";
    const lines = Array.isArray(HeroContent?.subtitle) ? HeroContent.subtitle : [];
    const bgUrl = getMediaUrl(HeroContent?.backgroundImage);

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
      
        <div className={`container ${styles.ProductsSection}`}>

            {data.cards.map((card, i) => (
                <Card
                    key={i}
                    category={card.category}
                    url={card.url}
                    bgUrl={card.background?.url}
                />
            ))}

        </div>

        <div style={{ marginBottom: "0px" }}>
            <Calculator/>
        </div>
        
        <Contacts data={serializedContacts as any} />

    </div>
  );
}