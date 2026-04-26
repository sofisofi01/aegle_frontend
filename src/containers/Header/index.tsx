"use client";
import { HeaderProps } from "./types";
import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "./assets/icon.png";
import { useAuthStore } from "@/store/useAuthStore";

export function Header({ menu }: HeaderProps) {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();

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
              <Link
                href={item.href}
                className={`${styles.link} ${pathname === item.href ? styles.active : ""}`}
              >
                {item.text}
              </Link>
            </li>
          ))}
          <li>
            {isAuthenticated ? (
              <Link
                href="/profile"
                className={`${styles.link} ${pathname === "/profile" ? styles.active : ""}`}
              >
                {user?.first_name || "Profile"}
              </Link>
            ) : (
              <Link
                href="/signin"
                className={`${styles.link} ${pathname === "/signin" ? styles.active : ""}`}
              >
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
