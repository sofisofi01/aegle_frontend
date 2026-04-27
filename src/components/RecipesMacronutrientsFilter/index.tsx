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
            <h3>Macronutrients</h3>
            
            <MacroSlider 
                title="Carbohydrates"
                onRangeChange={onCarbsRangeChange}
                maxValue={100}
                unit="g"
            />
            
            <MacroSlider 
                title="Proteins"
                onRangeChange={onProteinsRangeChange}
                maxValue={60}
                unit="g"
            />
            
            <MacroSlider 
                title="Fats"
                onRangeChange={onFatsRangeChange}
                maxValue={100}
                unit="g"
            />
        </div>
    );
}