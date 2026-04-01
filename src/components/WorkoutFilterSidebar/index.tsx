'use client';

import styles from './WorkoutFilterSidebar.module.scss';
import { WorkoutFilterSidebarProps } from '@/landings/workout/types';

export function WorkoutFilterSidebar({ isOpen, onClose }: WorkoutFilterSidebarProps) {
    return (
        <>
            <div 
                className={`${styles.overlay} ${isOpen ? styles.open : ''}`} 
                onClick={onClose}
            />
            
            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.content}>
                    <div className={styles.filterGroup}>
                            <h3>Muscles</h3>
                        <div className={styles.options}>
                            <div>Deltoid</div>
                            <div>Abs</div>
                            <div>Chest</div>
                            <div>Legs</div>
                            <div>Back muscles</div>
                            <div>Hands</div>
                            <div>Trapezoid</div>
                            <div>Cardio</div>
                            <div>Warm</div>
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                            <h3>Equipment</h3>
                        <div className={styles.options}>
                            <div>Dumbbells</div>
                            <div>Kettlebell</div>
                            <div>Jump rope</div>
                            <div>Resistance band</div>
                            <div>Mat</div>
                            <div>Weights</div>
                            <div>Barbell</div>
                            <div>Horizontal bar</div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}