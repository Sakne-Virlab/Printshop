'use client';
import styles from "./About.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

type Media = { url?: string };

type AboutData = {
  leftTitle?: { line: string }[];
  leftText?: string;
  leftPoints?: { icon?: Media; text: string }[];
  rightBlocks?: { image?: Media; title: string; text: string }[];
};

function useIsMobile(maxWidth = 600) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile("matches" in e ? e.matches : (e as MediaQueryList).matches);

    onChange(mql);

    // Safari fallback
    if ("addEventListener" in mql) mql.addEventListener("change", onChange as any);
    else (mql as any).addListener(onChange);

    return () => {
      if ("removeEventListener" in mql) mql.removeEventListener("change", onChange as any);
      else (mql as any).removeListener(onChange);
    };
  }, [maxWidth]);

  return isMobile;
}

export default function About({ data }: { data: AboutData }) {
  const leftTitleLines = data.leftTitle ?? [];
  const leftText = data.leftText ?? "";
  const leftPoints = data.leftPoints ?? [];
  const rightBlocks = data.rightBlocks ?? [];

  const isMobile = useIsMobile(600);

  return (
    <section className={styles.aboutSection} id="About">
      <div className="container" style={{ margin: "0 auto 40px" }}>
        <div className={styles.aboutGrid}>
          <div className={styles.left}>
            <div className={styles.leftTop}>
              <h4 className={styles.aboutTitle}>
                {leftTitleLines.map((l, i) => (
                  <span key={i}>
                    {l.line}
                    {i !== leftTitleLines.length - 1 && <br />}
                  </span>
                ))}
              </h4>

              <p>{leftText}</p>
            </div>

            <div className={styles.leftBottom}>
              {leftPoints.map((p, i) => (
                <div key={i} className={styles.point}>
                  {p.icon?.url && (
                    <Image src={p.icon.url} height={54} width={54} alt="" />
                  )}
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: desktop = list, mobile = swiper */}
          {!isMobile ? (
            <div className={styles.right}>
              {rightBlocks.map((b, i) => (
                <div key={i} className={styles.block}>
                  {b.image?.url && (
                    <Image
                      className={styles.aboutIMG}
                      src={b.image.url}
                      height={189}
                      width={212}
                      alt=""
                    />
                  )}

                  <div className={styles.aboutText}>
                    <h4 className={styles.aboutTitle}>{b.title}</h4>
                    <p>{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.rightMobile}>
              <Swiper
                // modules={[Pagination]}
                // pagination={{ clickable: true }}
                spaceBetween={16}
                slidesPerView={1}
              >
                {rightBlocks.map((b, i) => (
                  <SwiperSlide key={i}>
                    <div className={styles.block}>
                      {b.image?.url && (
                        <Image
                          className={styles.aboutIMG}
                          src={b.image.url}
                          height={189}
                          width={212}
                          alt=""
                        />
                      )}

                      <div className={styles.aboutText}>
                        <h4 className={styles.aboutTitle}>{b.title}</h4>
                        <p>{b.text}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
