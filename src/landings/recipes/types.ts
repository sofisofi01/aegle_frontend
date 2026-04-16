import { StaticImageData } from "next/image";

export type RecipesProps = {
    image?: string | StaticImageData;
};

export type TypeFilterProps = {
    selectedType: string | null;
    onSelectType: (type: string) => void;
}

export type IngredientsFilterProps = {
    selectedIngredients: string[];
    onSelectIngredients: (ingredients: string[]) => void;
}

export type MacroSliderProps = {
    title: string;
    onRangeChange?: (min: number, max: number) => void;
    minValue?: number;
    maxValue?: number;
    unit?: string;
}

export type RecipesFilterSidebarProps = {
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
}

export type RecipesCardProps  = {
    selectedType: string | null;
    selectedIngredients: string[];
    caloriesRange?: { min: number; max: number };
    carbsRange?: { min: number; max: number };
    proteinsRange?: { min: number; max: number };
    fatsRange?: { min: number; max: number };
}

export type CaloriesSliderProps = {
    onRangeChange?: (min: number, max: number) => void;
    minValue?: number;
    maxValue?: number;
}