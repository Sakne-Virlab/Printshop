'use client'
import styles from "./Reviews.module.scss"

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type StepFromCMS = {
  num: string
  name: string
  text: string
  rating: number
}

interface SliderCardProps {
  num: string
  name: string
  text: string
  rating: number
}

export const SliderCard = ({ num, name, text, rating }: SliderCardProps) => {

  const stars = Array.from({ length: rating }, (_, i) => (
    <Image 
      key={i} 
      src="/star.png" 
      height={15} 
      width={15} 
      alt="star"
      className={styles.starIcon} // 👈 опционально: добавь класс для стилизации
    />
  ));
  return (
    <div className={styles.sliderCard}>
      <span className={styles.stepNum}>{num}</span>
      <p className={styles.stepTitle}>{name}</p>
      <div className={styles.stars}>{stars}</div>
      <p className={styles.review}>{text}</p>
    </div>
  );
};

export default function Reviews({ steps }: { steps: StepFromCMS[] }) {
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
          <SwiperSlide key={`${card.num}-${idx}`} className={styles.slide}>
            <SliderCard
              num={card.num}
              name={card.name}
              text={card.text}
              rating={card.rating ?? 5}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
