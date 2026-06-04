"use client";
import { Page } from "@/containers/Page";
import styles from "./main.module.scss";
import { hero } from "./const";
import Image from "next/image";
import checkIcon from "./assets/check.png";
import heroImg from "./assets/yoga.jpg";
import food1 from "./assets/food 1.png";
import food2 from "./assets/food 2.png";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

export function MainPage() {
  const { accessToken } = useAuthStore();

  return (
    <Page>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={styles.subtitle}>{hero.subtitle}</p>

          <div className={styles.features}>
            {hero.features.map((feature, i) => (
              <div key={i} className={styles.featureItem}>
                <Image src={checkIcon} alt="check" width={50} height={50} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {!accessToken && (
            <Link href="/signup">
              <button className={styles.cta}>Начать уже сегодня</button>
            </Link>
          )}
        </div>

        <div className={styles.heroImage}>
          <Image src={heroImg} alt="hero" width={850} height={550} />
        </div>
      </section>

      <section className={styles.advantagesBlock}>
        <div className={styles.foodImages}>
          <Image src={food1} alt="Food 1" className={styles.foodImage1} />
          <Image src={food2} alt="Food 2" className={styles.foodImage2} />
        </div>

        <div className={styles.advHeader}>
          <p className={styles.advSmallTitle}>Всё, что нужно для заботы о себе</p>
          <h2 className={styles.advBigTitle}>Преимущества нашей платформы</h2>
        </div>

        <div className={styles.advCard}>
          <filter id="blur">
            <feGaussianBlur stdDeviation="6"></feGaussianBlur>
          </filter>
          <h3 className={styles.sectionTitle}>ОСНОВНЫЕ ВОЗМОЖНОСТИ</h3>
          <p className={styles.sectionSubtitle}>Отслеживайте, планируйте и становитесь здоровее — шаг за шагом.</p>

          <div className={styles.featuresGrid}>
            <div>
              <p className={styles.featureTitle}>Отслеживание питания ↦</p>
              <p>
                Записывайте свои приемы пищи, считайте калории и понимайте свой ежедневный потребление с помощью умного поиска продуктов.
              </p>
            </div>

            <div>
              <p className={styles.featureTitle}>Персональные тренировки ↦</p>
              <p>
                Создавайте планы тренировок или выбирайте из готовых, разработанных для ваших целей.
              </p>
            </div>

            <div>
              <p className={styles.featureTitle}>Прогресс и аналитика ↦</p>
              <p>Визуализируйте свой путь через интерактивные графики и реальное время insights.</p>
            </div>

            <div>
              <p className={styles.featureTitle}>AI wellness-помощник ↦</p>
              <p>Получайте персональные рекомендации по питанию, мотивации и полезным привычкам.</p>
            </div>
          </div>

          <h3 className={styles.sectionTitle}>КАК ЭТО РАБОТАЕТ</h3>

          <div className={styles.steps}>
            <p>
              <b>✦ Установите свои цели</b>
              <br />
              Создайте профиль, укажите желаемый вес и уровень физической активности.
            </p>

            <p>
              <b>✦ Отслеживайте ежедневные привычки</b>
              <br />
              Записывайте приемы пищи, тренировки и показатели здоровья с легкостью.
            </p>

            <p>
              <b>✦ Следите за результатами</b>
              <br />
              Наблюдайте за своим прогрессом и сохраняйте баланс каждый день.
            </p>
          </div>

          <h3 className={styles.sectionTitle}>ЧТО ГОВОРЯТ НАШИ ПОЛЬЗОВАТЕЛИ</h3>

          <div className={styles.reviews}>
            <p>
              <span className={styles.quote}>
                “Эквилибриа помогла мне наконец понять свои пищевые привычки”
              </span>
              <span className={styles.author}> — Шатик, 27</span>
            </p>

            <p>
              <span className={styles.quote}>
                “Очень мотивирует видеть свой прогресс так наглядно”
              </span>
              <span className={styles.author}> — Чупик, 13</span>
            </p>
          </div>
        </div>
      </section>
    </Page>
  );
}
