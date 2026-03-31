import { Page } from "@/containers/Page";
import styles from "./profile.module.scss";
import Image from "next/image";
import { profileData, goalsData } from "./const";

export function ProfilePage() {
  return (
    <Page>
      <div className={styles.profilePage}>
        {/* Левая колонка */}
        <div className={styles.profileLeft}>
          <Image
            src={profileData.avatar}
            alt="Avatar"
            className={styles.avatar}
            width={100}
            height={100}
          />
          <h1 className={styles.name}>{profileData.name}</h1>

          {/* Текст под именем разбит на строки */}
          <div className={styles.memberInfo}>
            <p>Member since: {profileData.memberSince}</p>
            <p>Your current level: {profileData.level}</p>
            <p>Streak: {profileData.strikeDays} days</p>
          </div>

          {/* Контактный блок как карточка */}
          <div className={styles.infoCard}>
            <p>{profileData.email}, {profileData.age} years</p>
            <p>{profileData.height} cm, {profileData.weight} kg</p>
            <span className={styles.editProfile}>Edit profile</span>
          </div>
        </div>

        {/* Правая колонка: Goals */}
        <div className={styles.profileRight}>
          <h2>Your goals are</h2>
          <div className={styles.goalsCard}>
            <p>Daily calories: {goalsData.dailyCalories}</p>
            <p>Workout sessions: {goalsData.workoutSessions} per week</p>
            <p>Workout minutes: {goalsData.workoutMinutes} min/week</p>
            <p>Steps per day: {goalsData.stepsPerDay}</p>
            <span className={styles.editGoals}>Edit goals</span>
          </div>
        </div>
      </div>
    </Page>
  );
}