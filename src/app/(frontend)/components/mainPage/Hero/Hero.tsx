import styles from "./Hero.module.scss";

type HeroData = {
  title?: string;
  subtitle?: { line: string }[];
  button?: { text?: string; href?: string };
  backgroundImage?: { url?: string } | string | null;
};

function getMediaUrl(maybe: any): string | undefined {
  // Payload может вернуть либо объект { url }, либо id (если depth маленький)
  if (!maybe) return undefined;
  if (typeof maybe === "string") return undefined;
  return maybe.url;
}

export default function Hero({ hero }: { hero: HeroData }) {
  const title = hero?.title ?? "типография полного цикла";
  const lines = Array.isArray(hero?.subtitle) ? hero.subtitle : [];
  const buttonText = hero?.button?.text ?? "Рассчитать стоимость";
  const buttonHref = hero?.button?.href ?? "/calculate";

  const bgUrl = getMediaUrl(hero?.backgroundImage);

  return (
    <section
      className={styles.Hero}
      style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : undefined}
    >
      <div className={styles.heroContent}>
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

        <a href={buttonHref} className={styles.glassButton}>
          {buttonText}
        </a>
      </div>
    </section>
  );
}
