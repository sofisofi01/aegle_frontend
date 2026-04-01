import { Page } from "@/containers/Page";
import styles from "./profile.module.scss";
import Image from "next/image";
import caloriesIcon from "./assets/calories.svg";
import workoutIcon from "./assets/workout.svg";
import timeIcon from "./assets/time.svg";
import stepsIcon from "./assets/steps.svg";
import decorProfile from "./assets/decor-profile.png";
import decorGoals from "./assets/decor-goals.png";

import { profileData, goalsData } from "./const";

export function ProfilePage() {
  return (
    <Page>
      <div className={styles.profilePage}>
        <div className={styles.profileLeft}>
          <Image
            src={profileData.avatar}
            alt="Avatar"
            className={styles.avatar}
            width={150}
            height={150}
          />

          <h1 className={styles.name}>{profileData.name}</h1>

          <div className={styles.memberInfo}>
            <p>Member since: {profileData.memberSince}</p>
            <p>Your current level: {profileData.level}</p>
            <p>Streak: {profileData.strikeDays} days</p>
          </div>

          <div className={styles.infoCard}>
            <p>{profileData.email}</p>
            <p>{profileData.sex}, {profileData.age} y.o</p>
            <p>{profileData.height} cm</p>
            <p>{profileData.weight} kg</p>
            <span className={styles.editProfile}>Edit profile</span>

            <Image
              src={decorProfile}
              alt=""
              className={styles.cardImage}
              width={120}
              height={120}
            />
          </div>
        </div>

        <div className={styles.profileRight}>
          <h2>Your goals are...</h2>

          <div className={styles.goalsCard}>
            <div className={styles.goalRow}>
              <div className={styles.left}>
                <Image src={caloriesIcon} alt="" width={30} height={30} />
                <span className={styles.label}>Daily calories:</span>
              </div>
              <span>
                <span className={styles.value}>{goalsData.dailyCalories}</span>{" "}
                <span className={styles.unit}>kcal</span>
              </span>
            </div>

            <div className={styles.goalRow}>
              <div className={styles.left}>
                <Image src={workoutIcon} alt="" width={30} height={30} />
                <span className={styles.label}>Workout:</span>
              </div>
              <span>
                <span className={styles.value}>{goalsData.workoutSessions}</span>{" "}
                <span className={styles.unit}>sessions/week</span>
              </span>
            </div>

            <div className={styles.goalRow}>
              <div className={styles.left}>
                <Image src={timeIcon} alt="" width={30} height={30} />
                <span className={styles.label}>Workout time:</span>
              </div>
              <span>
                <span className={styles.value}>{goalsData.workoutMinutes}</span>{" "}
                <span className={styles.unit}>min/week</span>
              </span>
            </div>

            <div className={styles.goalRow}>
              <div className={styles.left}>
                <Image src={stepsIcon} alt="" width={30} height={30} />
                <span className={styles.label}>Steps:</span>
              </div>
              <span>
                <span className={styles.value}>{goalsData.stepsPerDay}</span>{" "}
                <span className={styles.unit}>steps/day</span>
              </span>
            </div>

            <span className={styles.editGoals}>Edit goals</span>

            <Image
              src={decorGoals}
              alt=""
              className={styles.cardImage}
              width={140}
              height={140}
            />
          </div>
        </div>
      </div>
    </Page>
  );
}