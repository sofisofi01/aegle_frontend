'use client';

import { useState } from 'react';
import { WorkoutProps } from './types'
import { Popup } from '@/components/WorkoutPopup';
import { WorkoutCard } from '@/components/WorkoutCard';
import styles from './workout.module.scss';
import { data } from './const'; 

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

            <div className={styles.cardsContainer}>
                {data.map((workout) => (
                    <WorkoutCard
                        key={workout.id}
                        title={workout.title}
                        muscles={workout.muscles}
                        text={workout.text}
                        image={workout.image}
                    />
                ))}
            </div>

            <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </div>
    )
}