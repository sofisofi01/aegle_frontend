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

export const RECIPE_TYPES = ['Завтрак', 'Обед', 'Ужин', 'Снеки'] as const;
export const AMOUNT_UNITS = ['г', 'кг', 'мл', 'л', 'ч.л.', 'ст.л.', 'кружка'] as const;

export type RecipeType = typeof RECIPE_TYPES[number];
export type AmountUnit = typeof AMOUNT_UNITS[number];