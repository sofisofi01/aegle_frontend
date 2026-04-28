export type IngredientsFilterProps = {
  selectedIngredients: string[];
  onSelectIngredients: (ingredients: string[]) => void;
  availableIngredients?: string[];
};
