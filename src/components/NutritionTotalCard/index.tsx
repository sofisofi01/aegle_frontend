'use client';

import styles from './NutritionTotalCard.module.scss';
import { NutritionTotalCardProps} from './types';

export function NutritionTotalCard({ 
    calories = 250, 
    proteins = 13.98, 
    fats = 12.3, 
    carbs = 11.07 
}: NutritionTotalCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.row}>
                <span className={styles.label}>Calories:</span>
                <span className={`${styles.value} ${styles.green}`}>{calories}</span>
            </div>
            <div className={styles.row}>
                <span className={styles.label}>Proteins:</span>
                <span className={`${styles.value} ${styles.green}`}>{proteins}</span>
            </div>
            <div className={styles.row}>
                <span className={styles.label}>Fats:</span>
                <span className={`${styles.value} ${styles.green}`}>{fats}</span>
            </div>
            <div className={styles.row}>
                <span className={styles.label}>Carbs:</span>
                <span className={`${styles.value} ${styles.green}`}>{carbs}</span>
            </div>
        </div>
    );
}
