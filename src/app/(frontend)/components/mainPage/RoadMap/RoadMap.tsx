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
    <section className={styles.sliderContainer} id="RoadMap">
      <Swiper
        modules={[Navigation, Pagination]}
        className={styles.mySwiper}
        spaceBetween={60}
        slidesPerView={1}
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
          600: { slidesPerView: 1 },
          700: { slidesPerView: 1.6 },
          800: { slidesPerView: 2 },
          1300: { slidesPerView: 3},
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
