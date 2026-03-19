"use client";

import { Page } from "@/containers/Page";
import styles from "./Main.module.scss";
import { hero, advantages } from "./const";
import Image from "next/image";
import checkIcon from './assets/check.png';

// СДЕЛАН ИМЕННОВАННЫЙ ЭКСПОРТ
export function MainPage() {
  return (
    <Page>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <h1 className={styles.title}>{hero.title}</h1>
        <p className={styles.subtitle}>{hero.subtitle}</p>
        <div className={styles.features}>
          {hero.features.map((feature, i) => (
            <div key={i} className={styles.featureItem}>
              <Image src={checkIcon} alt="check" width={50} height={50} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <button className={styles.cta}>Get Started Today</button>
      </section>

      {/* ADVANTAGES SECTION */}
      <section className={styles.advantages}>
        <h2>{advantages.title}</h2>
      </section>
    </Page>
  );
}