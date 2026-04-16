'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Page } from '@/containers/Page';
import { RecipesCard } from '@/components/RecipesCard';
import { RecipesFilterSidebar } from '@/components/RecipesFilterSidebar';
import { RecipesProps } from './types';
import styles from './recipes.module.scss';
import searchIcon from './assets/searchIcon.svg';
import plusIcon from './assets/plusIcon.svg';
import filterIcon from './assets/filterIcon.svg';

export function RecipesPage({ image }: RecipesProps) {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    
    // Состояния для слайдеров
    const [caloriesRange, setCaloriesRange] = useState<{ min: number; max: number }>();
    const [carbsRange, setCarbsRange] = useState<{ min: number; max: number }>();
    const [proteinsRange, setProteinsRange] = useState<{ min: number; max: number }>();
    const [fatsRange, setFatsRange] = useState<{ min: number; max: number }>();

    const handleSelectType = (type: string) => {
        setSelectedType(prev => prev === type ? null : type);
        setIsFiltersOpen(false);
    };

    const handleSelectIngredients = (ingredients: string[]) => {
        setSelectedIngredients(ingredients);
    };

    const handleCaloriesChange = (min: number, max: number) => {
        setCaloriesRange({ min, max });
    };

    const handleCarbsChange = (min: number, max: number) => {
        setCarbsRange({ min, max });
    };

    const handleProteinsChange = (min: number, max: number) => {
        setProteinsRange({ min, max });
    };

    const handleFatsChange = (min: number, max: number) => {
        setFatsRange({ min, max });
    };

    return (
        <Page>
            <div className={styles.page}>
                <div className={styles.searchBlock}>
                    <div className={styles.headerContainer}>
                        <h1 className={styles.title}>
                            Find your perfect dish <br /> or create it yourself
                        </h1>
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
                                        alt="Search icon"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </div>
                            <button className={styles.createButton}>
                                <span>create</span>
                                <Image
                                    src={plusIcon}
                                    alt="Create icon"
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
                            selectedIngredients={selectedIngredients}
                            onSelectIngredients={handleSelectIngredients}
                            onRangeChange={handleCaloriesChange}
                            onCarbsRangeChange={handleCarbsChange}
                            onProteinsRangeChange={handleProteinsChange}
                            onFatsRangeChange={handleFatsChange}
                        />
                    </div>
                    
                    <button 
                        className={styles.filterButton}
                        onClick={() => setIsFiltersOpen(true)}
                        aria-label="Open filters"
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
                            <RecipesCard 
                                selectedType={selectedType}
                                selectedIngredients={selectedIngredients}
                                caloriesRange={caloriesRange}
                                carbsRange={carbsRange}
                                proteinsRange={proteinsRange}
                                fatsRange={fatsRange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}