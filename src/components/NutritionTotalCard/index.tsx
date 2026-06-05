"use client";

import styles from "./NutritionTotalCard.module.scss";
import { NutritionTotalCardProps } from "./types";

export function NutritionTotalCard({ calories, proteins, fats, carbs }: NutritionTotalCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <span className={styles.label}>Калории:</span>
        <span className={`${styles.value} ${styles.green}`}>{calories.toFixed(0)} ккал</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Белки:</span>
        <span className={`${styles.value} ${styles.green}`}>{proteins.toFixed(1)}г</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Жиры:</span>
        <span className={`${styles.value} ${styles.green}`}>{fats.toFixed(1)}г</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Углеводы:</span>
        <span className={`${styles.value} ${styles.green}`}>{carbs.toFixed(1)}г</span>
      </div>
    </div>
  );
}
