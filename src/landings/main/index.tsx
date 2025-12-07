"use client";

import styles from "./Main.module.scss";
import { MainProps } from "./types";
import { hero, advantages } from "./const";

export default function Main({}: MainProps) {
  return (
    <div>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={styles.subtitle}>{hero.subtitle}</p>

          <div className={styles.features}>
            {hero.features.map((feature, i) => (
              <span key={i} className={styles.featureItem}>
                ✓ {feature}
              </span>
            ))}
          </div>

          <div className={styles.cta}>
            <button>Get started today</button>
          </div>
        </div>

        <div className={styles.heroImage}>
          <img
            src="/images/yoga.png" 
            alt="Wellness"
          />
        </div>
      </section>

      {/* ADVANTAGES SECTION */}
      <section className={styles.advantagesSection}>
        <h2 className={styles.advTitle}>{advantages.title}</h2>
      </section>
    </div>
  );
}
