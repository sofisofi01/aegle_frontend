"use client";
import { Page } from "@/containers/Page";
import styles from "./signup.module.scss";
import { data } from "./const";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import "react-datepicker/dist/react-datepicker.css";

export function SignUpPage() {
  const [gender, setGender] = useState<"M" | "F" | null>(null);
  const [activityLevel, setActivityLevel] = useState<number | null>(null);
  const [goal, setGoal] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Валидация данных
  const validateForm = (): string | null => {
    if (!name || !surname) return "Заполните имя и фамилию";
    if (!isValidEmail(email)) return "Введите корректный email";
    if (!password || password.length < 4) return "Пароль должен быть минимум 4 символа";
    if (!height || isNaN(parseInt(height)) || parseInt(height) < 100 || parseInt(height) > 300) 
      return "Рост должен быть между 100 и 300 см";
    if (!weight || isNaN(parseInt(weight)) || parseInt(weight) < 30 || parseInt(weight) > 500) 
      return "Вес должен быть между 30 и 500 кг";
    if (!targetWeight || isNaN(parseInt(targetWeight)) || parseInt(targetWeight) < 30 || parseInt(targetWeight) > 500) 
      return "Целевой вес должен быть между 30 и 500 кг";
    if (!age || isNaN(parseInt(age)) || parseInt(age) < 13 || parseInt(age) > 120) 
      return "Возраст должен быть между 13 и 120 лет";
    if (!gender) return "Выберите пол";
    if (!activityLevel) return "Выберите уровень активности";
    if (!goal) return "Выберите цель";
    return null;
  };

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

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await authService.register({
        email,
        password,
        first_name: name,
        last_name: surname,
        height: parseInt(height),
        weight: parseInt(weight),
        target_weight: parseInt(targetWeight),
        gender: gender,
        age: parseInt(age),
        activity_level: activityLevel || 1,
        goal: goal,
      });

      setAuth(data.user, data.access, data.refresh);
      router.push("/profile");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || "Registration failed. Please try again.");
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
          <p className={styles.subtitle}>{data.subtitle}</p>
          {error && (
            <p
              className={styles.error}
              style={{ color: "red", textAlign: "center", marginBottom: "10px" }}
            >
              {error}
            </p>
          )}

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
              <p className={styles.label}>Выберите ваш пол</p>
              <div className={styles.rowOptions}>
                <button
                  className={`${styles.option} ${styles.genderOption} ${gender === "M" ? styles.active : ""}`}
                  onClick={() => setGender("M")}
                >
                  ♂
                </button>
                <button
                  className={`${styles.option} ${styles.genderOption} ${gender === "F" ? styles.active : ""}`}
                  onClick={() => setGender("F")}
                >
                  ♀
                </button>
              </div>
            </div>

            <div className={styles.labelRow}>
              <p className={styles.label}>{data.fields.age}</p>
              <input
                placeholder="Возраст"
                className={styles.input}
                value={age}
                onChange={(e) => handleNumbersOnly(e, setAge)}
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
            <input
              placeholder={data.fields.targetWeight}
              className={styles.input}
              value={targetWeight}
              onChange={(e) => handleNumbersOnly(e, setTargetWeight)}
            />

            <div className={styles.labelRow}>
              <p className={styles.label}>Выберите уровень активности</p>
              <div className={styles.rowOptions} style={{ flexWrap: "wrap", gap: "10px" }}>
                {data.activity.map((act) => (
                  <button
                    key={act.id}
                    className={`${styles.option} ${activityLevel === act.id ? styles.active : ""}`}
                    onClick={() => setActivityLevel(act.id)}
                    style={{ padding: "5px 15px", fontSize: "14px" }}
                  >
                    {act.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.labelRow}>
              <p className={styles.label}>Выберите вашу цель</p>
              <div className={styles.rowOptions}>
                {data.goals.map((g) => (
                  <button
                    key={g.id}
                    className={`${styles.option} ${goal === g.id ? styles.active : ""}`}
                    onClick={() => setGoal(g.id)}
                    style={{ padding: "5px 15px", fontSize: "14px" }}
                  >
                    {g.label}
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
              <span style={{ color: "red", fontSize: "14px" }}>Неверный формат почты</span>
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

            <button className={styles.submit} onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Регистрация..." : "Зарегистрироваться"}
            </button>
          </div>
        </section>
      </Page>
    </div>
  );
}
