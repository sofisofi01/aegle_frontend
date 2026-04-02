import styles from './WorkoutCard.module.scss';
import Image, { StaticImageData } from 'next/image';
import plusIcon from '@/landings/workout/assets/plusIcon.svg'; 
import { WorkoutCardProps } from './types';

export function WorkoutCard({ title, muscles, text, image, onAddToWorkout }: WorkoutCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.cardInner}>
                {image && (
                    <div className={styles.imageWrapper}>
                        <Image
                            src={image}
                            alt={title}
                            width={200}
                            height={200}
                            className={styles.image}
                        />
                    </div>
                )}
                <div className={styles.content}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.muscles}>{muscles}</div>
                    <p className={styles.text}>{text}</p>
                </div>
            </div>
            <div className={styles.addButtonContainer}>
                <button 
                    className={styles.addButton}
                    onClick={onAddToWorkout}
                >
                    <span>Add to your workout</span>
                    <Image 
                        src={plusIcon}
                        alt="Add"
                        width={30}
                        height={30}
                        className={styles.plusIcon}
                    />
                </button>
            </div>
        </div>
    );
}