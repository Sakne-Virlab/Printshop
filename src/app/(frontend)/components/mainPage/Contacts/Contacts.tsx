'use client'

import { useEffect, useRef } from "react"
import Image from "next/image"
import styles from "./Contacts.module.scss"

declare global {
  interface Window {
    ymaps: any
  }
}

type Media = { url?: string }

type ContactsData = {
  title?: string
  map?: {
    centerLat: number
    centerLng: number
    zoom: number
    placemarkText?: string
  }
  address?: { label?: string; value?: string }
  contact?: { label?: string; phone?: string; phoneHref?: string }
  socials?: { text: string; url: string; icon?: Media }[]
}

export default function Contacts({ data }: { data: ContactsData }) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const centerLat = data?.map?.centerLat ?? 55.751574
    const centerLng = data?.map?.centerLng ?? 37.573856
    const zoom = data?.map?.zoom ?? 15
    const placemarkText = data?.map?.placemarkText ?? "Мы здесь"

    function initMap() {
      window.ymaps.ready(() => {
        if (!mapRef.current) return

        // чтобы не создавать карту повторно при fast-refresh
        mapRef.current.innerHTML = ""

        const map = new window.ymaps.Map(mapRef.current, {
          center: [centerLat, centerLng],
          zoom,
          controls: [],
        })

        const placemark = new window.ymaps.Placemark(
          [centerLat, centerLng],
          { balloonContent: placemarkText },
          { preset: "islands#redIcon" }
        )

        map.geoObjects.add(placemark)
      })
    }

    if (window.ymaps) {
      initMap()
      return
    }

    const script = document.createElement("script")
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU"
    script.async = true
    script.onload = initMap
    document.body.appendChild(script)
  }, [data?.map?.centerLat, data?.map?.centerLng, data?.map?.zoom, data?.map?.placemarkText])

  const title = data?.title ?? "Контакты"
  const addressLabel = data?.address?.label ?? "Адрес"
  const addressValue = data?.address?.value ?? ""
  const contactLabel = data?.contact?.label ?? "Мы на связи"
  const phone = data?.contact?.phone ?? ""
  const phoneHref = data?.contact?.phoneHref ?? (phone ? `tel:${phone}` : "#")

  const socials = Array.isArray(data?.socials) ? data.socials : []

  return (
    <section className={styles.contactsSection}>
      <div ref={mapRef} className={styles.map} />

      <div className={styles.contactsBlock}>
        <h2 className={styles.contactsTitle}>{title}</h2>

        <div>
          <p className={styles.titleBlock}>{addressLabel}</p>
          <p className={styles.textBlock}>{addressValue}</p>
        </div>

        <div>
          <p className={styles.titleBlock}>{contactLabel}</p>
          <a className={styles.linkBlock} href={phoneHref}>
            {phone}
          </a>
        </div>

        <div className={styles.socialsBlock}>
          {socials.map((s, i) => (
            <a key={i} href={s.url} className={styles.socialLink}>
              <span className={styles.socialText}>{s.text}</span>
              <span className={styles.socialIcon}>
                {s.icon?.url && <Image src={s.icon.url} alt="" width={30} height={30} />}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
