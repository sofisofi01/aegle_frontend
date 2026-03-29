import { HeaderProps } from "./types";
import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "./assets/icon.png";

export function Header({ menu }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image src={logo} alt="Logo" width={180} height={180} className={styles.image} />
        <div className={styles.logoText}>
          <h1 className={styles.logoMain}>Equilibria</h1>
          <h2 className={styles.logoSub}>your wellness app</h2>
        </div>
      </Link>

      <nav>
        <ul className={styles.nav}>
          {menu.map((item) => (
            <li key={item.id}>
              <Link href={item.href} className={styles.link}>
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}