'use client'

import { useEffect, useRef } from "react"
import styles from "./Contacts.module.scss"

declare global {
  interface Window {
    ymaps: any
  }
}

export default function Contacts() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.ymaps) {
      initMap()
      return
    }

    const script = document.createElement("script")
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU"
    script.async = true
    script.onload = initMap
    document.body.appendChild(script)

    function initMap() {
      window.ymaps.ready(() => {
        if (!mapRef.current) return

        const map = new window.ymaps.Map(mapRef.current, {
          center: [55.751574, 37.573856], // ⬅️ замени на свои координаты
          zoom: 15,
          controls: [],
        })

        const placemark = new window.ymaps.Placemark(
          [55.751574, 37.573856],
          {
            balloonContent: "Мы здесь",
          },
          {
            preset: "islands#redIcon",
          }
        )

        map.geoObjects.add(placemark)
      })
    }
  }, [])

  return (
    <section className={styles.contactsSection}>
      <div ref={mapRef} className={styles.map} />
        <div className={styles.contactsBlock}>
            <h2 className={styles.contactsTitle}>Контакты</h2>
            <div>
                Адрес
                Кемерово
            </div>
            <div>
                Мы на связи
                +7 (999) 99 99 9
            </div>
        </div>
    </section>
  )
}
