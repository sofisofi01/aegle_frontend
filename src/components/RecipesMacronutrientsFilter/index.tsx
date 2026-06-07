'use client';

import styles from '../RecipesFilterSidebar/RecipesFilterSidebar.module.scss'; 
import { MacroSlider } from '../RecipesMacroSlider';
import { MacronutrientsFilterProps } from './types';


export function MacronutrientsFilter({ 
    onCarbsRangeChange, 
    onProteinsRangeChange, 
    onFatsRangeChange 
}: MacronutrientsFilterProps) {
    return (
        <div className={styles.filterGroup}>
            <h3>КБЖУ</h3>
            
            <MacroSlider 
                title="Углеводы"
                onRangeChange={onCarbsRangeChange}
                maxValue={100}
                unit="г"
            />
            
            <MacroSlider 
                title="Белки"
                onRangeChange={onProteinsRangeChange}
                maxValue={60}
                unit="г"
            />
            
            <MacroSlider 
                title="Жиры"
                onRangeChange={onFatsRangeChange}
                maxValue={100}
                unit="г"
            />
        </div>
    );
}