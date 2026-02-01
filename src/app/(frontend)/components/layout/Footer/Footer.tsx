'use client'
import styles from "./Footer.module.scss"
import Image from "next/image";
import Link from "next/link";

export default function Footer(){
    return(
        <footer className={`container ${styles.Footer}`}>
            <div className={styles.leftSide}>
                <Image src="/icons/logo.svg" height={135} width={135} alt="logo"/>
                <div className={styles.infoGrid}>
                    <div className={styles.infoBlock}>
                        <Image src="/icons/map.svg" height={30} width={30} alt="logo"/>
                        <p>Кемерово</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <Image src="/icons/clock.svg" height={30} width={30} alt="logo"/>
                        <p>Пн-Сб 9:00-20:00 <br/>Вс: 10:00-18:00</p>
                    </div>
                </div>
            </div>
            <div className={styles.centerSide}>
                <div className={styles.top}>
                    <Link href="#">О компании</Link>
                    <Link href="#">Этапы работы</Link>
                    <Link href="#">Услуги</Link>
                    <Link href="#">FAQ</Link>
                    <Link href="#">Контакты</Link>
                </div>
                <div>
                    <Link href="#">Политика конфиденциальности </Link>
                </div>
                
            </div>
            <div>

            </div>
        </footer>
    );
}
