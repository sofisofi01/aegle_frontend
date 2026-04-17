'use client'

import styles from './nutrition.module.scss';
import Image from 'next/image';
import { Page } from '@/containers/Page';
import { CalorieCalculator } from '@/components/CalorieCalculator';

export function NutritionPage() {
    return (
        <Page>
            <div className={styles.page}>
                <div className={styles.upperContainer}>
                    <div className={styles.miniCardContainer}>

                    </div>
                    <div className={styles.calorieCalculatorContainer}>
                        <CalorieCalculator></CalorieCalculator>
                    </div>
                </div>
            </div>
        </Page>
    )
}