'use client'
import styles from "./RoadMap.module.scss"

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type StepFromCMS = {
  step: string
  title: string
  points: { text: string }[]
}

interface SliderCardProps {
  step: string
  title: string
  points: string[]
}

export const SliderCard = ({ step, title, points }: SliderCardProps) => {
  return (
    <div className={styles.sliderCard}>
      <span className={styles.stepNum}>{step}</span>
      <p className={styles.stepTitle}>{title}</p>

      <ol className={styles.pointsList}>
        {points.map((point, index) => (
          <li key={index} className={styles.point}>
            {point}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default function RoadMap({ steps }: { steps: StepFromCMS[] }) {
  return (
    <section className={styles.sliderContainer}>
      <Swiper
        modules={[Navigation, Pagination]}
        className={styles.mySwiper}
        spaceBetween={60}
        slidesPerView={1}
        slidesPerGroup={1}
        speed={400}
        grabCursor={true}
        navigation={{
          nextEl: `.${styles.custom_next}`,
          prevEl: `.${styles.custom_prev}`,
          disabledClass: "swiper-button-disabled",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          360: { slidesPerView: 1 },
          480: { slidesPerView: 1 },
          600: { slidesPerView: 1.3 },
          700: { slidesPerView: 1.6 },
          800: { slidesPerView: 2 },
          900: { slidesPerView: 2.2 },
          1000: { slidesPerView: 2.5 },
          1100: { slidesPerView: 2.6 },
          1200: { slidesPerView: 2.8 },
          1300: { slidesPerView: 3 },
          1400: { slidesPerView: 3.1 },
          1500: { slidesPerView: 3.15 },
          1600: { slidesPerView: 3.2 },
          1700: { slidesPerView: 3.3 },
          1800: { slidesPerView: 3.4 },
          1920: { slidesPerView: 3.5 },
        }}
      >
        {steps.map((card, idx) => (
          <SwiperSlide key={`${card.step}-${idx}`} className={styles.slide}>
            <SliderCard
              step={card.step}
              title={card.title}
              points={(card.points ?? []).map(p => p.text)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
