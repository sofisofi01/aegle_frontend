"use client";

import classNames from "classnames";

import Header from "@/containers/Header";
import Footer from "@/containers/Footer";

import styles from "./Page.module.scss";
import { PageProps } from "./types";

export default function Page({ children }: PageProps) {
  return (
    <div className={classNames(styles.body)}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
