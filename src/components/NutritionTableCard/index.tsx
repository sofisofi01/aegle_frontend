'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './NutritionTableCard.module.scss';
import { NutritionTableCardProps } from './types';

export function NutritionTableCard({ 
    id,
    title, 
    calories, 
    proteins, 
    carbs,   
    fats,
    image,
    onDelete
}: NutritionTableCardProps) {
    const [showDelete, setShowDelete] = useState(false);

    const handleDelete = () => {
        if (onDelete && id) {
            onDelete(id);
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
                    <button 
                        className={styles.deleteButton}
                        onClick={handleDelete}
                        onMouseEnter={() => setShowDelete(true)}
                        onMouseLeave={() => setShowDelete(false)}
                    >
                        —
                    </button>
                    {showDelete && (
                        <div className={styles.deletePopup}>
                            Remove?
                        </div>
                    )}
                </div>
            )}
            <div className={styles.bottom}>
                <div className={styles.title}>{title}</div>
                <div className={styles.calories}>{calories} kcal</div>
            </div>
        </div>
    );
}