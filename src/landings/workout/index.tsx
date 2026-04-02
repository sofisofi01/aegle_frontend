'use client';

import { useState } from 'react';
import { WorkoutProps } from './types'
import { Popup } from '@/components/WorkoutPopup';
import { WorkoutCard } from '@/components/WorkoutCard';
import { WorkoutFilterSidebar } from '@/components/WorkoutFilterSidebar';
import styles from './workout.module.scss';
import { data } from './const'; 
import Image from 'next/image'; 
import filterIcon from './assets/filterIcon.svg';
import checkIcon from './assets/checkIcon.png';

export function WorkoutPage({}: WorkoutProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    return (
        <div className={styles.page}>
            <div className={styles.textStart}>
                <h1 className={styles.title}>Start your daily workout</h1>
                <button 
                    onClick={() => setIsPopupOpen(true)}
                    className={styles.openButton}
                >
                    <Image
                        src={checkIcon}
                        alt="Check"
                        width={20}
                        height={20}
                    />
                    Check our recommendations
                </button>
            </div>

            <div className={styles.container}>
                <WorkoutFilterSidebar 
                    isOpen={isFiltersOpen}
                    onClose={() => setIsFiltersOpen(false)}
                />
                
                <button 
                    className={styles.filterButton}
                    onClick={() => setIsFiltersOpen(true)}
                >
                    <Image 
                        src={filterIcon} 
                        alt="Filters" 
                        width={40} 
                        height={40} 
                    />
                </button>
                
                <div className={styles.mainContent}>
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
                </div>
            </div>

            <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </div>
    )
}