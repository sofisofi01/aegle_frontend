'use client';

import styles from '../RecipesFilterSidebar/RecipesFilterSidebar.module.scss'; 
import { TypeFilterProps } from './types';

const types = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export function TypeFilter({ selectedType, onSelectType }: TypeFilterProps) {
    return (
        <div className={styles.filterGroup}>
            <h3>Type</h3>
            <div className={styles.options}>
                {types.map((type) => (
                    <div 
                        key={type}
                        className={`${styles.option} ${selectedType === type ? styles.active : ''}`}
                        onClick={() => onSelectType(type)}
                    >
                        {type}
                    </div>
                ))}
            </div>
        </div>
    );
}