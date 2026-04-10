'use client';

import { useState } from 'react';
import { Page } from '@/containers/Page';
import { Popup } from '@/components/WorkoutPopup';
import { WorkoutCard } from '@/components/WorkoutCard';
import { WorkoutFilterSidebar } from '@/components/WorkoutFilterSidebar';
import { WorkoutMiniCard } from '@/components/WorkoutMiniCard';
import styles from './workout.module.scss';
import { data } from './const'; 
import { minicardData as initialMinicardData } from './const'; 
import Image from 'next/image'; 
import filterIcon from './assets/filterIcon.svg';
import checkIcon from './assets/checkIcon.png';

export function WorkoutPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [minicardData, setMinicardData] = useState(initialMinicardData);
    const [nextId, setNextId] = useState(initialMinicardData.length + 1);

    const handleAddToWorkout = (workout: {
        title: string;
        sets?: string;
        image: any;
    }) => {
        const newMiniCard = {
            id: nextId,
            title: workout.title,
            sets: workout.sets || '10x3',
            image: workout.image
        };
        
        setMinicardData([...minicardData, newMiniCard]);
        setNextId(nextId + 1);
    };

    return (
        <Page>
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

                <div className={styles.minicardContainer}>
                    {minicardData.map((workout) => (
                        <WorkoutMiniCard
                            key={workout.id}
                            id={workout.id}
                            title={workout.title}
                            sets={workout.sets}
                            image={workout.image}
                            onDelete={() => {
                                setMinicardData(minicardData.filter(item => item.id !== workout.id));
                            }}
                        />
                    ))}
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
                                    onAddToWorkout={() => handleAddToWorkout({
                                        title: workout.title,
                                        image: workout.image,
                                        sets: '10x3'
                                    })}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
            </div>
        </Page>
    )
}