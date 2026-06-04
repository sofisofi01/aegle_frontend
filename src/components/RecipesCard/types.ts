import { FoodSearchResult } from "@/services/nutritionService";

export type RecipesCardProps = {
  selectedType: string | null;
  selectedIngredients: string[];
  caloriesRange?: { min: number; max: number };
  carbsRange?: { min: number; max: number };
  proteinsRange?: { min: number; max: number };
  fatsRange?: { min: number; max: number };
  onAdd?: (recipe: FoodSearchResult) => void;
  mealType?: string | null;
};
