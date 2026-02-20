'use client';

import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Media = { url?: string };

type HeaderData = {
  logo?: Media;
  nav?: { label: string; href: string }[];
  pillItems?: { icon?: Media; label: string; href: string }[];
};

export default function Header({ data }: { data: HeaderData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastYRef = useRef(0);
  const tickingRef = useRef(false);
  const hiddenRef = useRef(false);

  const nav = Array.isArray(data?.nav) ? data.nav : [];
  const pillItems = Array.isArray(data?.pillItems) ? data.pillItems : [];
  const logoUrl = data?.logo?.url;

  useEffect(() => {
    if (menuOpen) return;

    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) return;

    lastYRef.current = window.scrollY;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastYRef.current;

        const START_HIDE_AFTER = 120;
        const HIDE_DELTA = 10;
        const SHOW_DELTA = -10;

        let nextHidden = hiddenRef.current;

        if (y > START_HIDE_AFTER && delta > HIDE_DELTA) nextHidden = true;
        if (delta < SHOW_DELTA) nextHidden = false;
        if (y < 40) nextHidden = false;

        if (nextHidden !== hiddenRef.current) {
          hiddenRef.current = nextHidden;
          setHidden(nextHidden);
        }

        lastYRef.current = y;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header
      className={`${styles.Header}
      ${scrolled ? styles.scrolled : ""}
      ${hidden && !menuOpen ? styles.hidden : ""}
      ${menuOpen ? styles.menuOpen : ""}`}
    >
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          {logoUrl && (
            <Image className={styles.logoSVG} src={logoUrl} height={135} width={135} alt="logo" />
          )}
        </Link>

        <div className={styles.sides}>
          <div className={styles.left}>
            <nav className={styles.nav}>
              {nav.map((item, i) => (
                <Link key={i} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.right}>
            <div className={styles.pill}>
              {pillItems.map((it, i) => (
                <Link key={i} className={styles.pillItem} href={it.href}>
                  {it.icon?.url && <Image src={it.icon.url} alt="" width={26} height={26} />}
                  {it.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          className={styles.burger}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* MOBILE */}
      <div className={`${styles.mobileOverlay} ${menuOpen ? styles.open : ""}`}>
        <div className={styles.mobileMenu}>
          <div className={styles.mobileTop}>
            <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
              {logoUrl && (
                <Image className={styles.logoSVG} src={logoUrl} height={135} width={135} alt="logo" />
              )}
            </Link>

            <button
              type="button"
              className={styles.closeBtn}
              aria-label="Закрыть меню"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className={styles.mobileContent}>
            <nav className={styles.mobileNav}>
              {nav.map((item, i) => (
                <Link key={i} href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className={styles.mobileContacts}>
              {pillItems.map((it, i) => (
                <Link key={i} className={styles.pillItem} href={it.href}>
                  {it.icon?.url && <Image src={it.icon.url} alt="" width={26} height={26} />}
                  {it.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
