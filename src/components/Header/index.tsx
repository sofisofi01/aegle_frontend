import { HeaderProps } from "./types";
import styles from "./Header.module.scss";
import classNames from "classnames";

export default function Header({ active, isAuth }: HeaderProps) {
  const menuItems = [
    { id: "nutrition", name: "Nutrition" },
    { id: "workouts", name: "Workouts" },
    { id: "progress", name: "Progress" },
    { id: "profile", name: "Profile" }
  ];

  return (
    <header className={styles.header}>
      <div className={styles.logo}>E Q U I L I B R I A</div>

      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={classNames(styles.menuItem, {
                [styles.active]: active === item.id,
              })}
            >
              <a href={`/#${item.id}`}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>

      <button className={styles.signIn}>
        {isAuth ? "My account" : "Sign in"}
      </button>
    </header>
  );
}
