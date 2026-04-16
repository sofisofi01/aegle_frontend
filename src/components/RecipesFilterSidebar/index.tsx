'use client';

import styles from './RecipesFilterSidebar.module.scss';
import { RecipesFilterSidebarProps } from './types';

export function RecipesFilterSidebar({ isOpen, onClose, selectedType, onSelectType }: RecipesFilterSidebarProps) {
    const types = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

    return (
        <>
            <div 
                className={`${styles.overlay} ${isOpen ? styles.open : ''}`} 
                onClick={onClose}
            />
            
            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.content}>
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
                </div>
            </aside>
        </>
    );
}