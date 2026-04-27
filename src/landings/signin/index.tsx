"use client";
import { Page } from "@/containers/Page";
import styles from "./signin.module.scss";
import { data } from "./const";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";

export function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isValidEmail(email) || !password) {
      setError("Please enter valid email and password!");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await authService.login({ email, password });
      setAuth(data.user, data.access, data.refresh);
      router.push("/profile");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || "Failed to sign in. Please check your credentials.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
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
            {error && (
              <p className={styles.error} style={{ marginBottom: "10px" }}>
                {error}
              </p>
            )}

            <input
              placeholder={data.fields.email}
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
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
                disabled={isLoading}
              />
              <span
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "⌣" : "👁"}
              </span>
            </div>

            <div className={styles.signInRow}>
              <button type="submit" className={styles.submit} disabled={isLoading}>
                {isLoading ? "Signing in..." : data.actions.submit}
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
