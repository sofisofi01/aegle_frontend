'use client';

import { useState } from 'react';
import { WorkoutProps } from './types'
import { Popup } from '@/components/WorkoutPopup';
import styles from './workout.module.scss';

export function WorkoutPage({}: WorkoutProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Workout Page</h1>
            <button 
                onClick={() => setIsPopupOpen(true)}
                className={styles.openButton}
            >
                Check our recommendations
            </button>

            <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </div>
    )
}