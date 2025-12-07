import styles from "./Footer.module.scss";
import { FooterProps } from "./types";

export default function Footer({}: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="#privacy">Privacy policy</a>
        <a href="#terms">Terms of use</a>
      </div>

      <p className={styles.copy}>Equilibria ©2025 — State of balance</p>
    </footer>
  );
}
