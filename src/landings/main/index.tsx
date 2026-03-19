"use client";

import { Page } from "@/containers/Page";
import styles from "./Main.module.scss";
import { hero, advantages } from "./const";
import Image from "next/image";

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
              <Image src="/assets/check.png" alt="check" width={20} height={20} />
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