"use client";

import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Use</a>
      </div>
      <div className={styles.bottom}>
        © Equilibria, 2026 – State of balance
      </div>
    </footer>
  );
}