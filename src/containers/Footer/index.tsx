import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <span>Equilibria</span>
        <span>Wellness platform</span>
      </div>

      <div className={styles.bottom}>
        © 2026 — State of balance
      </div>
    </footer>
  );
}