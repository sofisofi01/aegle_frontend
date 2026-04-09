import styles from './WorkoutMiniCard.module.scss';
import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { WorkoutMiniCardProps } from './types';
import doneIcon from '@/landings/workout/assets/doneIcon.png';
import nodoneIcon from '@/landings/workout/assets/nodoneIcon.svg';

export function WorkoutMiniCard( {title, sets, image} : WorkoutMiniCardProps) {
    const [showDone, setShowDone] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false)

    const handleComplete = () => {
        const newStatus = !isCompleted;
        setIsCompleted(newStatus);
        
        if (newStatus) {
            setShowDone(true);
            setTimeout(() => {
                setShowDone(false);
            }, 1500);
        }
    };

    return (
        <div className={styles.card}>
            {image && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={image}
                        alt={title}
                        className={styles.image}
                    />
                    {showDone && (
                        <div className={styles.donePopup}>
                            Done!
                        </div>
                    )}
                    <div className={styles.buttonGroup}>
                        <button className={styles.doneButton} onClick={handleComplete}>
                            <Image
                                src={isCompleted ? doneIcon : nodoneIcon}
                                alt={isCompleted ? "done" : "no done"}
                                width={20}
                                height={20}
                                className={styles.doneIcon}
                            />
                        </button>
                        <button className={styles.deleteButton} onClick={() => {}}>
                            <span>—</span>
                        </button>
                    </div>
                </div>
            )}
            <div className={styles.bottom}>
                <div className={styles.title}>{title}</div>
                <div className={styles.sets}>{sets}</div>
            </div>
        </div>
    )
}