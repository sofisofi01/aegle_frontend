import styles from './WorkoutMiniCard.module.scss';
import Image, { StaticImageData } from 'next/image';
import { WorkoutMiniCardProps } from './types';
import doneIcon from '@/landings/workout/assets/doneIcon.svg';

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
                    <div className={styles.buttonGroup}>
                        <button className={styles.doneButton} onClick={() => {}}>
                            <Image
                                src={doneIcon}
                                alt="done"
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