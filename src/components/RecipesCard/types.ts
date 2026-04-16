export type RecipesFilterSidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedType: string | null;
    onSelectType: (type: string) => void;
}

export type RecipesCardProps = {
    selectedType: string | null;
}