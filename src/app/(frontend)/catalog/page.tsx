// src/app/(frontend)/catalog/page.tsx
import { getPayload, serializePayloadData } from '@/lib/get-payload'
import type { Metadata } from 'next'
import Calculator from '../components/mainPage/Calculator/Calculator'
import Contacts from '../components/mainPage/Contacts/Contacts'
import styles from './catalog.module.scss'

// ─────────────────────────────────────────────────────────────
// Типы
// ─────────────────────────────────────────────────────────────
interface ProductCard {
  category: string
  url: string
  background?: { url?: string }
}

type HeroData = {
  title?: string
  subtitle?: { line: string }[]
  backgroundImage?: { url?: string } | string | null
}

interface ProductsData {
  title: string
  description: string
  button: {
    text: string
    url: string
  }
  cards: ProductCard[]
}

// ─────────────────────────────────────────────────────────────
// Next.js конфигурация рендеринга
// ─────────────────────────────────────────────────────────────
// Разрешаем генерацию страниц "на лету", если их нет в static params
export const dynamicParams = true

// Кэшируем сгенерированные страницы на 1 час (ISR)
export const revalidate = 3600

// Если база недоступна при билде — страница будет SSR (не SSG)
export const dynamic = 'force-dynamic'

// ─────────────────────────────────────────────────────────────
// SEO Metadata (с защитой от ошибок при билде)
// ─────────────────────────────────────────────────────────────
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Если нет доступа к БД — возвращаем дефолтные мета-теги
    if (!process.env.DATABASE_URL) {
      return {
        title: 'Каталог продукции | Типография',
        description: 'Печать блокнотов, визиток, листовок на заказ',
      }
    }

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
      title: catalog?.title ?? 'Каталог продукции | Типография',
      description: catalog?.description ?? '',
      keywords: catalog?.keywords
        ? catalog.keywords.split(',').map((s: string) => s.trim())
        : undefined,
      robots: catalog?.noIndex ? { index: false, follow: false } : undefined,
      openGraph: {
        title: catalog?.title ?? undefined,
        description: catalog?.description ?? undefined,
        images: ogUrl
          ? [{ url: `http://${process.env.URL}${ogUrl}` }]
          : undefined,
      },
    }
  } catch (error) {
    console.warn('⚠️ generateMetadata failed (нормально при Docker build):', error)
    // Фолбэк-мета, чтобы сборка не падала
    return {
      title: 'Каталог продукции | Типография',
      description: 'Печать блокнотов, визиток, листовок на заказ',
    }
  }
}

// ─────────────────────────────────────────────────────────────
// Генерация статических путей (с защитой от ошибок при билде)
// ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  try {
    // Если нет DATABASE_URL — пропускаем генерацию, страницы создадутся при первом запросе
    if (!process.env.DATABASE_URL) {
      console.warn('⚠️ DATABASE_URL not set, skipping static params generation')
      return []
    }

    const payload = await getPayload()

    // 👇 Подставь свою коллекцию, которая используется для каталога
    // Например: 'services', 'categories', 'pages'
    const items = await payload.find({
      collection: 'services' as any,
      where: { published: { equals: true } },
      limit: 100,
      depth: 0,
    })

    return items.docs.map((doc: any) => ({
      slug: doc.slug,
    }))
  } catch (error) {
    console.warn('⚠️ generateStaticParams failed (нормально при Docker build):', error)
    // Возвращаем пустой массив — Next.js сгенерирует страницу при первом запросе
    return []
  }
}

// ─────────────────────────────────────────────────────────────
// Вспомогательные функции и компоненты
// ─────────────────────────────────────────────────────────────
function getMediaUrl(maybe: any): string | undefined {
  if (!maybe) return undefined
  if (typeof maybe === 'string') return undefined
  return maybe.url
}

const Card = ({
  category,
  bgUrl,
  url,
}: {
  category: string
  bgUrl?: string
  url: string
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
  )
}

// ─────────────────────────────────────────────────────────────
// Основной компонент страницы
// ─────────────────────────────────────────────────────────────
export default async function CatalogPage() {
  // 👇 ВСЕ запросы к БД — внутри компонента, а не на уровне модуля!
  const payload = await getPayload()

  // Параллельная загрузка данных для ускорения
  const [contacts, data, HeroContent] = await Promise.all([
    payload.findGlobal({ slug: 'contacts' as never, depth: 2 }),
    payload.findGlobal({ slug: 'products' as never, depth: 2 }),
    payload.findGlobal({ slug: 'cataloghead' as never, depth: 2 }),
  ])

  const serializedContacts = serializePayloadData(contacts)
  const productsData = data as unknown as ProductsData
  const heroData = HeroContent as unknown as HeroData

  const title = heroData?.title ?? 'Каталог продукции'
  const lines = Array.isArray(heroData?.subtitle) ? heroData.subtitle : []
  const bgUrl = getMediaUrl(heroData?.backgroundImage)

  return (
    <div>
      {/* Hero секция */}
      <div
        className={styles.head}
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <div className={styles.headContent}>
          <h1>
            {title.split('|').map((line, i) => (
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

      {/* Карточки товаров */}
      <div className={`container ${styles.ProductsSection}`}>
        {productsData.cards?.map((card, i) => (
          <Card
            key={i}
            category={card.category}
            url={card.url}
            bgUrl={card.background?.url}
          />
        ))}
      </div>

      {/* Калькулятор и Контакты */}
      <div style={{ marginBottom: '0px' }}>
        <Calculator />
      </div>

      <Contacts data={serializedContacts as any} />
    </div>
  )
}