"use client";

import { PropsWithChildren } from "react";
import { Header } from "@/containers/Header";
import { Footer } from "@/containers/Footer";
import styles from "./Page.module.scss";
import { data } from "./const";

type PageProps = PropsWithChildren<{}>;

export function Page({ children }: PageProps) {
  return (
    <div className={styles.body}>
      <Header menu={data} />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}