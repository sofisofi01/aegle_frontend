import styles from './WorkoutMiniCard.module.scss';
import Image, { StaticImageData } from 'next/image';
import { WorkoutMiniCardProps } from './types';
import workout from '@/landings/workout/assets/workout.png'

export function WorkoutMiniCard( {title, sets} : WorkoutMiniCardProps) {
    return (
        <div className={styles.card}>
            {workout && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={workout}
                        alt={title}
                        width={200}
                        height={200}
                        className={styles.image}
                    />
                </div>
            )}
            <div className={styles.bottom}>
                <h3>{title}</h3>
                <p>{sets}</p>
            </div>
        </div>
    )
}