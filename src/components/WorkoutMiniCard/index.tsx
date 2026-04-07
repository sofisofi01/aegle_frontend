import styles from './WorkoutMiniCard.module.scss';
import Image, { StaticImageData } from 'next/image';
import { WorkoutMiniCardProps } from './types';

export function WorkoutMiniCard( {title, sets, image} : WorkoutMiniCardProps) {
    return (
        <div className={styles.card}>
            {image && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={image}
                        alt={title}
                        className={styles.image}
                    />
                </div>
            )}
            <div className={styles.bottom}>
                <div className={styles.title}>{title}</div>
                <div className={styles.sets}>{sets}</div>
            </div>
        </div>
    )
}