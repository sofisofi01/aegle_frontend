'use client';

import styles from './RecipesFilterSidebar.module.scss';
import { TypeFilter } from '../RecipesTypeFilter';
import { IngredientsFilter } from '../RecipesIngredientsFilter';
import { CaloriesSlider } from '../RecipesCaloriesSlider';
import { MacronutrientsFilter } from '../RecipesMacronutrientsFilter';

interface RecipesFilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    selectedType: string | null;
    onSelectType: (type: string) => void;
    selectedIngredients: string[];
    onSelectIngredients: (ingredients: string[]) => void;
    onRangeChange?: (min: number, max: number) => void;
    onCarbsRangeChange?: (min: number, max: number) => void;
    onProteinsRangeChange?: (min: number, max: number) => void;
    onFatsRangeChange?: (min: number, max: number) => void;
    minValue?: number;
    maxValue?: number;
}

export function RecipesFilterSidebar({ 
    isOpen, 
    onClose, 
    selectedType, 
    onSelectType,
    selectedIngredients,
    onSelectIngredients,
    onRangeChange,
    onCarbsRangeChange,
    onProteinsRangeChange,
    onFatsRangeChange,
    minValue = 0,
    maxValue = 900
}: RecipesFilterSidebarProps) {
    return (
        <>
            {/* Оверлей (затемнение фона) */}
            <div 
                className={`${styles.overlay} ${isOpen ? styles.open : ''}`} 
                onClick={onClose}
            />
            
            {/* Боковая панель фильтров */}
            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.content}>
                    <TypeFilter 
                        selectedType={selectedType}
                        onSelectType={onSelectType}
                    />

                    <IngredientsFilter 
                        selectedIngredients={selectedIngredients}
                        onSelectIngredients={onSelectIngredients}
                    />

                    <CaloriesSlider 
                        onRangeChange={onRangeChange}
                        minValue={minValue}
                        maxValue={maxValue}
                    />

                    <MacronutrientsFilter 
                        onCarbsRangeChange={onCarbsRangeChange}
                        onProteinsRangeChange={onProteinsRangeChange}
                        onFatsRangeChange={onFatsRangeChange}
                    />
                </div>
            </aside>
        </>
    );
}