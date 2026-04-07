"use client";
import { Page } from "@/containers/Page";
import styles from "./signin.module.scss";
import { data } from "./const";
import { useState } from "react";
import Link from "next/link";

export function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (!isValidEmail(email) || !password) {
      alert("Please enter valid email and password!");
      return;
    }
    alert("Signed in!");
  };

  return (
    <div className={styles.pageBackground}>
      <Page>
        <section className={styles.wrapper}>
          <h1 className={styles.title}>{data.title}</h1>

          <form
            className={styles.block}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              placeholder={data.fields.email}
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {!isValidEmail(email) && email.length > 0 && (
              <span className={styles.error}>Invalid email format</span>
            )}

            <div className={styles.passwordWrapper}>
              <input
                placeholder={data.fields.password}
                type={showPassword ? "text" : "password"} 
                className={styles.inputPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ fontWeight: showPassword ? 400 : 700 }}
              />
              <span
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "⌣" : "👁"}
              </span>
            </div>

            <div className={styles.signInRow}>
              <button type="submit" className={styles.submit}>
                {data.actions.submit}
              </button>

              <p className={styles.signInText}>
                {data.actions.noAccount}{" "}
                <Link href="/signup" className={styles.signInLink}>
                  {data.actions.signUp}
                </Link>
              </p>
            </div>
          </form>
        </section>
      </Page>
    </div>
  );
}