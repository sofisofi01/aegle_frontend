import { Header } from "@/containers/Header";
import { Footer } from "@/containers/Footer";
import styles from "./Page.module.scss";
import { data } from "./const";
import { PageProps } from "./types";

export function Page({ children }: PageProps) {
  return (
    <div className={styles.pageWrapper}>
      <Header menu={data} />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}