'use client'
import styles from "./Products.module.scss";

interface ProductCard {
  category: string;
  url: string;
  background?: { url?: string };
}

interface ProductsData {
  title: string;
  description: string;
  button: {
    text: string;
    url: string;
  };
  cards: ProductCard[];
}

export const Card = ({ category, bgUrl, url }: {
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

export default function Products({ data }: { data: ProductsData }) {
  return (
    <section className={`container ${styles.ProductsSection}`} id="Products">
      <div className={styles.productsHeader}>
        <h2>{data.title ? data.title : "title"}</h2>
        <p>{data.description}</p>

        <a href={data.button.url} className={styles.glassButton}>
          {data.button.text}
        </a>
      </div>

      {data.cards.slice(0, 6).map((card, i) => (
          <Card
            key={i}
            category={card.category}
            url={card.url}
            bgUrl={card.background?.url}
          />
      ))}
    </section>
  );
}
