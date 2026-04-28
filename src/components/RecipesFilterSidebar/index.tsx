"use client";

import styles from "./RecipesFilterSidebar.module.scss";
import { TypeFilter } from "../RecipesTypeFilter";
import { IngredientsFilter } from "../RecipesIngredientsFilter";
import { CaloriesSlider } from "../RecipesCaloriesSlider";
import { MacronutrientsFilter } from "../RecipesMacronutrientsFilter";
import { RecipesFilterSidebarProps } from "./types";

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
  maxValue = 900,
  availableIngredients,
}: RecipesFilterSidebarProps) {
  return (
    <>
      {/* Оверлей (затемнение фона) */}
      <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`} onClick={onClose} />

      {/* Боковая панель фильтров */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.content}>
          <TypeFilter selectedType={selectedType} onSelectType={onSelectType} />

          <IngredientsFilter
            selectedIngredients={selectedIngredients}
            onSelectIngredients={onSelectIngredients}
            availableIngredients={availableIngredients}
          />

          <CaloriesSlider onRangeChange={onRangeChange} minValue={minValue} maxValue={maxValue} />

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
