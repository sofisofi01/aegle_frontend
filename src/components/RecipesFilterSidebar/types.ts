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
    minValue?: number;
    maxValue?: number;
}