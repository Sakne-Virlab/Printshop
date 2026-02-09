'use client'
import styles from "./Footer.module.scss"
import Image from "next/image"
import Link from "next/link"

type Media = { url?: string }

type FooterData = {
  site?: string
  // logo?: Media
  info?: {
    city?: string
    workTime?: string
  }
  menu?: { label: string; url: string }[]
  policy?: { label: string; url: string }
  contact?: { phone?: string; phoneHref?: string }
  socials?: { icon?: Media; url: string }[]
}

export default function Footer({ data }: { data: FooterData }) {
  const menu = data.menu ?? []
  const socials = data.socials ?? []

  const site = data.site ?? "Твоя | типография";

  return (
    <footer className={styles.Footer}>
      <div className="container" style={{margin: "0 auto"}}>
        <div className={styles.inner}>
          {/* LEFT */}
          <div className={styles.leftSide}>
            {/* {data.logo?.url && (
              <Image src={data.logo.url} height={135} width={135} alt="logo" />
            )} */}
            <Link href="/">
              <p className={styles.TitleSite}>
                {site.split("|").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </Link>
            

            <div className={styles.infoGrid}>
              <div className={styles.infoBlock}>
                <Image src="/icons/map.svg" height={30} width={30} alt="" />
                <p>{data.info?.city}</p>
              </div>

              <div className={styles.infoBlock}>
                <Image src="/icons/clock.svg" height={30} width={30} alt="" />
                <p style={{ whiteSpace: "pre-line" }}>
                  {data.info?.workTime}
                </p>
              </div>
            </div>
          </div>

          {/* CENTER */}
          <div className={styles.centerSide}>
            <div className={styles.top}>
              {menu.map((item, i) => (
                <Link key={i} href={item.url}>
                  {item.label}
                </Link>
              ))}
            </div>

            {data.policy && (
              <div className={styles.bottom}>
                <Link href={data.policy.url}>
                  {data.policy.label}
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className={styles.rightSide}>
            {data.contact?.phone && (
              <Link href={data.contact.phoneHref ?? "#"}>
                {data.contact.phone}
              </Link>
            )}

            <div className={styles.socialLinks}>
              {socials.map((s, i) => (
                <Link key={i} href={s.url}>
                  {s.icon?.url && (
                    <Image src={s.icon.url} height={40} width={40} alt="" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
