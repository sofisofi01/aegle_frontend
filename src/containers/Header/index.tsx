"use client";

import { HeaderProps } from "./types";
import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "./assets/icon.png";

export function Header({ menu }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image src={logo} alt="Logo" width={60} height={60} className={styles.image} />
        <h1 className={styles.title}>Equilibria Your Wellness App</h1>
      </Link>
      <nav className={styles.nav}>
        {menu.map((item) => (
          <Link key={item.id} href={item.href} className={styles.link}>
            {item.text}
          </Link>
        ))}
      </nav>
    </header>
  );
}