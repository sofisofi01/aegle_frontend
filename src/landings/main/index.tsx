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
              <button className={styles.cta}>Get Started Today</button>
            </Link>
          )}
        </div>

        <div className={styles.heroImage}>
          <Image src={heroImg} alt="hero" width={850} height={550} />
        </div>
      </section>

      <section className={styles.advantagesBlock}>
        <div className={styles.foodImages}>
          <div className={styles.foodImages}>
            <Image src={food1} alt="Food 1" className={styles.foodImage1} />
            <Image src={food2} alt="Food 2" className={styles.foodImage2} />
          </div>
        </div>

        <div className={styles.advHeader}>
          <p className={styles.advSmallTitle}>Everything you need to take care of yourself</p>
          <h2 className={styles.advBigTitle}>Advantages of our platform</h2>
        </div>

        <div className={styles.advCard}>
          <filter id="blur">
            <feGaussianBlur stdDeviation="6"></feGaussianBlur>
          </filter>
          <h3 className={styles.sectionTitle}>CORE FEATURES</h3>
          <p className={styles.sectionSubtitle}>Track, plan, and grow healthier — step by step.</p>

          <div className={styles.featuresGrid}>
            <div>
              <p className={styles.featureTitle}>Nutrition tracking ↦</p>
              <p>
                Log your meals, count calories, and understand your daily intake with smart food
                search.
              </p>
            </div>

            <div>
              <p className={styles.featureTitle}>Personalized workouts ↦</p>
              <p>
                Create training plans or choose from curated ones designed for your fitness goals.
              </p>
            </div>

            <div>
              <p className={styles.featureTitle}>Progress & analytics ↦</p>
              <p>Visualize your journey through interactive graphs and real-time insights.</p>
            </div>

            <div>
              <p className={styles.featureTitle}>AI wellness coach ↦</p>
              <p>Get tailored advice on nutrition, motivation, and healthy habits.</p>
            </div>
          </div>

          <h3 className={styles.sectionTitle}>HOW IT WORKS</h3>

          <div className={styles.steps}>
            <p>
              <b>✦ Set your goals</b>
              <br />
              Create your profile, define your target weight and activity level.
            </p>

            <p>
              <b>✦ Track daily habits</b>
              <br />
              Log meals, workouts, and wellness stats with ease.
            </p>

            <p>
              <b>✦ See your results</b>
              <br />
              Watch your progress and celebrate balance every day.
            </p>
          </div>

          <h3 className={styles.sectionTitle}>WHAT OUR USERS SAY</h3>

          <div className={styles.reviews}>
            <p>
              <span className={styles.quote}>
                “Equilibria helped me finally understand my nutrition habits.”
              </span>
              <span className={styles.author}> — Chatik, 27</span>
            </p>

            <p>
              <span className={styles.quote}>
                “It’s motivating to see my progress visualized so clearly.”
              </span>
              <span className={styles.author}> — Chupik, 13</span>
            </p>
          </div>
        </div>
      </section>
    </Page>
  );
}
