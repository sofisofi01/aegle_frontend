"use client";

import { Page } from "@/containers/Page";
import styles from "./Main.module.scss";
import { hero, advantages } from "./const";

// СДЕЛАЛИ ИМЕННОВАННЫЙ ЭКСПОРТ
export function MainPage() {
  return (
    <Page>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <h1 className={styles.title}>{hero.title}</h1>
        <p className={styles.subtitle}>{hero.subtitle}</p>
        <div className={styles.features}>
          {hero.features.map((feature, i) => (
            <span key={i} className={styles.featureItem}>
              ✓ {feature}
            </span>
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