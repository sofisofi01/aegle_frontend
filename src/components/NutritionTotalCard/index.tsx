"use client";

import styles from "./NutritionTotalCard.module.scss";
import { NutritionTotalCardProps } from "./types";

export function NutritionTotalCard({ calories, proteins, fats, carbs }: NutritionTotalCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <span className={styles.label}>Calories:</span>
        <span className={`${styles.value} ${styles.green}`}>{calories.toFixed(0)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Proteins:</span>
        <span className={`${styles.value} ${styles.green}`}>{proteins.toFixed(1)}g</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Fats:</span>
        <span className={`${styles.value} ${styles.green}`}>{fats.toFixed(1)}g</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Carbs:</span>
        <span className={`${styles.value} ${styles.green}`}>{carbs.toFixed(1)}g</span>
      </div>
    </div>
  );
}
