"use client";

import { MainProps } from './types'
import { hero, advantages, footer } from "./const";
import styles from "./Main.module.scss";

export function MainPage() {
  return (
    <div>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={styles.subtitle}>{hero.subtitle}</p>
          <div className={styles.features}>
            {hero.features.map((f, i) => (
              <span key={i} className={styles.featureItem}>
                ✓ {f}
              </span>
            ))}
          </div>
          <div className={styles.cta}>
            <button>Get started today</button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img src="/images/yoga.png" alt="Wellness" />
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className={styles.advantagesSection}>
        <h2 className={styles.advTitle}>{advantages.title}</h2>
        {/* Можем сюда добавить карточки с преимуществами */}
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>{footer.text}</p>
        <div className={styles.footerLinks}>
          {footer.links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              {link.text}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}