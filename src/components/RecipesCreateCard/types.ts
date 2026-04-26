export type IngredientWithAmount = {
    name: string;
    amount: number;
    unit: string;
}

export type NewRecipe = {
    title: string;
    type: string;
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
    ingredients: IngredientWithAmount[];
    recipe: string;
    time: string;
    image: string | File;
}

export type CreateRecipesCardProps = {
    onSave?: (recipe: NewRecipe) => void;
    onCancel?: () => void;
    initialData?: Partial<NewRecipe>;
}

export const RECIPE_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'] as const;
export const AMOUNT_UNITS = ['g', 'kg', 'ml', 'l', 'pcs', 'tbsp', 'tsp', 'cup'] as const;

export type RecipeType = typeof RECIPE_TYPES[number];
export type AmountUnit = typeof AMOUNT_UNITS[number];