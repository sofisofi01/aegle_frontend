'use client';

import { useState } from 'react';
import { RecipesProps } from './types';
import { Page } from '@/containers/Page';
import styles from './recipes.module.scss';
import Image from 'next/image';
import searchIcon from './assets/searchIcon.svg';
import plusIcon from './assets/plusIcon.svg';
import filterIcon from './assets/filterIcon.svg';
import { RecipesCard } from '@/components/RecipesCard';
import { RecipesFilterSidebar } from '@/components/RecipesFilterSidebar';

export function RecipesPage({image}: RecipesProps) {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleSelectType = (type: string) => {
        if (selectedType === type) {
            setSelectedType(null);
        } else {
            setSelectedType(type);
        }
        setIsFiltersOpen(false);
    };

    return (
        <Page>
            <div className={styles.page}>
                <div className={styles.searchBlock}>
                    <div className={styles.headerContainer}>
                        <h1 className={styles.title}>Find your perfect dish <br/> or create it yourself</h1>
                        <div className={styles.searchContainer}>
                            <div className={styles.searchWrapper}>
                                <input
                                    type="text"
                                    placeholder="Search for the recipe..."
                                    className={styles.searchInput}
                                />
                                <button className={styles.searchButton}>
                                    <Image
                                        src={searchIcon}
                                        alt={"Search icon"}
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </div>
                            <button className={styles.createButton}>
                                <span>create</span>
                                <Image
                                    src={plusIcon}
                                    alt={"Create icon"}
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.filtersWrapper}>
                        <RecipesFilterSidebar 
                            isOpen={isFiltersOpen}
                            onClose={() => setIsFiltersOpen(false)}
                            selectedType={selectedType}
                            onSelectType={handleSelectType}
                        />
                    </div>
                    
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
                            <RecipesCard selectedType={selectedType} />
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}