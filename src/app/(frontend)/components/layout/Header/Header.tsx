'use client';

import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.Header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            <Image src="/icons/logoWhite.svg" height={115} width={115} alt="logo" />
          </Link>

          <nav className={styles.nav}>
            <Link href="#steps">Этапы работы</Link>
            <Link href="#products">Продукция</Link>
            <Link href="#calc">Калькулятор</Link>
            <Link href="#about">О компании</Link>
          </nav>
        </div>

        <div className={styles.right}>
          <div className={styles.pill}>
            <div className={styles.pillItem}>
              <Image src="/icons/phone.svg" alt="" width={27} height={27} />
              <a href="tel:+79413422355">+7 (941) 342 23 55</a>
            </div>

            <div className={styles.pillItem}>
              <Image src="/icons/email.svg" alt="" width={25} height={18} />
              <a href="mailto:tvoya.tipographia@mail.ru">tvoya.tipographia@mail.ru</a>
            </div>

            <div className={styles.pillItem}>
              <a href="#" className={styles.socialLink}>
                <Image src="/icons/telegram.svg" alt="" width={18} height={18} />
                Telegram
              </a>
            </div>

            <div className={styles.pillItem}>
              <a href="#" className={styles.socialLink}>
                <Image src="/icons/max.svg" alt="" width={18} height={18} />
                MAX
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
