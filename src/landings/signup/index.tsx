"use client";
import { Page } from "@/containers/Page";
import styles from "./signup.module.scss";
import { data } from "./const";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Link from "next/link";
import "react-datepicker/dist/react-datepicker.css";

export function SignUpPage() {
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [activity, setActivity] = useState<number | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLettersOnly = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFn: (val: string) => void
  ) => {
    const value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, "");
    setFn(value);
  };

  const handleNumbersOnly = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFn: (val: string) => void
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setFn(value);
  };

  const handleSubmit = () => {
    if (!name || !surname || !height || !weight || !isValidEmail(email) || !password) {
      alert("Please fill all fields correctly!");
      return;
    }
    alert("Form submitted!");
  };

  return (
    <div className={styles.pageBackground}>
      <Page>
        <section className={styles.wrapper}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.subtitle}>{data.subtitle}</p>

          <div className={styles.block}>
            <input
              placeholder={data.fields.name}
              className={styles.input}
              value={name}
              onChange={(e) => handleLettersOnly(e, setName)}
            />
            <input
              placeholder={data.fields.surname}
              className={styles.input}
              value={surname}
              onChange={(e) => handleLettersOnly(e, setSurname)}
            />

            <div className={styles.labelRow}>
              <p className={styles.label}>Select your sex</p>
              <div className={styles.rowOptions}>
                <button
                  className={`${styles.option} ${styles.genderOption} ${gender === "male" ? styles.active : ""}`}
                  onClick={() => setGender("male")}
                >
                  ♂
                </button>
                <button
                  className={`${styles.option} ${styles.genderOption} ${gender === "female" ? styles.active : ""}`}
                  onClick={() => setGender("female")}
                >
                  ♀
                </button>
              </div>
            </div>

            <div className={styles.labelRow}>
              <p className={styles.label}>Enter your date of birth</p>
              <DatePicker
                selected={birthDate}
                onChange={(date: Date | null) => setBirthDate(date)}
                placeholderText="DD/MM/YYYY"
                className={styles.inputDate}
                calendarClassName={styles.datepickerCalendar}
                dateFormat="dd/MM/yyyy"
                popperPlacement="bottom-start"
                portalId="root-portal"
              />
            </div>
          </div>

          <div className={styles.block}>
            <h2 className={styles.sectionTitle}>{data.sections.personal}</h2>

            <input
              placeholder={data.fields.height}
              className={styles.input}
              value={height}
              onChange={(e) => handleNumbersOnly(e, setHeight)}
            />
            <input
              placeholder={data.fields.weight}
              className={styles.input}
              value={weight}
              onChange={(e) => handleNumbersOnly(e, setWeight)}
            />

            <div className={styles.labelRow}>
              <p className={styles.label}>
                Enter your activity level from low (sedentary lifestyle) to high (regular exercise)
              </p>
              <div className={styles.rowOptions}>
                {data.activity.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.option} ${activity === i ? styles.active : ""}`}
                    onClick={() => setActivity(i)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.block}>
            <h2 className={styles.sectionTitle}>{data.sections.safety}</h2>

            <input
              placeholder={data.fields.email}
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isValidEmail(email) && email.length > 0 && (
              <span style={{ color: "red", fontSize: "14px" }}>Invalid email format</span>
            )}

            <div className={styles.passwordWrapper}>
              <input
                placeholder={data.fields.password}
                type={showPassword ? "text" : "password"}
                className={styles.inputPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ fontWeight: password && !showPassword ? 700 : 400 }}
              />
              <span
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "⌣" : "👁"}
              </span>
            </div>
          </div>

          <div className={styles.signInBlock}>
            <p className={styles.signInText}>
              {data.actions.haveAccount}{" "}
              <Link href="/signin" className={styles.signInLink}>
                {data.actions.signIn}
              </Link>
            </p>

            <button className={styles.submit} onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
        </section>
      </Page>
    </div>
  );
}
