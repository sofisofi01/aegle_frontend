'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './RecipesCreateCard.module.scss';
import time from '@/landings/recipes/assets/time.png';
import plusIcon from '@/landings/recipes/assets/plusIcon.svg';
import minusIcon from '@/landings/recipes/assets/minus.png';
import { availableIngredients } from '../RecipesIngredientsFilter/const';
import { 
    CreateRecipesCardProps, 
    NewRecipe, 
    IngredientWithAmount,
    RECIPE_TYPES,
    AMOUNT_UNITS 
} from './types';

export function CreateRecipesCard({ onSave, onCancel, initialData }: CreateRecipesCardProps) {
    const [recipe, setRecipe] = useState<NewRecipe>({
        title: initialData?.title || '',
        type: initialData?.type || 'Breakfast',
        calories: 200,
        proteins: 23,
        fats: 3,
        carbohydrates: 33,
        ingredients: initialData?.ingredients || [],
        recipe: initialData?.recipe || '',
        time: initialData?.time || '',
        image: initialData?.image || '',
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [imagePreview, setImagePreview] = useState<string>(
        typeof recipe.image === 'string' ? recipe.image : ''
    );
    const [timeUnit, setTimeUnit] = useState('min'); 

    const filteredIngredients = availableIngredients.filter(ingredient =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChange = (field: keyof NewRecipe, value: string | number | IngredientWithAmount[]) => {
        if (field === 'time' && typeof value === 'string') {
            const numValue = parseInt(value);
            if (!isNaN(numValue) && numValue < 0) {
                return; 
            }
        }
        setRecipe(prev => ({ ...prev, [field]: value }));
    };

    const handleAddIngredient = (ingredientName: string) => {
        const newIngredient: IngredientWithAmount = {
            name: ingredientName,
            amount: 100,
            unit: 'g'
        };
        
        if (!recipe.ingredients.some(ing => ing.name === ingredientName)) {
            setRecipe(prev => ({
                ...prev,
                ingredients: [...prev.ingredients, newIngredient]
            }));
        }
        setIsDropdownOpen(false);
        setSearchTerm('');
    };

    const handleUpdateIngredientAmount = (index: number, amount: number) => {
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients[index].amount = Math.max(0, amount);
        setRecipe(prev => ({ ...prev, ingredients: updatedIngredients }));
    };

    const handleUpdateIngredientUnit = (index: number, unit: string) => {
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients[index].unit = unit;
        setRecipe(prev => ({ ...prev, ingredients: updatedIngredients }));
    };

    const handleRemoveIngredient = (index: number) => {
        setRecipe(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index)
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setRecipe(prev => ({ ...prev, image: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (recipe.title && recipe.recipe && recipe.ingredients.length > 0) {
            onSave?.(recipe);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.card}>
                <div className={styles.cardChars}>
                    {/* Левая колонка - изображение */}
                    <div className={styles.previewContainer}>
                        <div className={styles.imageWrapper}>
                            {imagePreview ? (
                                <div className={styles.imagePreviewContainer}>
                                    <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        width={150}
                                        height={150}
                                        className={styles.recipeImage}
                                    />
                                    <button
                                        type="button"
                                        className={styles.changeImageButton}
                                        onClick={() => document.getElementById('imageUpload')?.click()}
                                    >
                                        Change image
                                    </button>
                                </div>
                            ) : (
                                <label className={styles.imageUploadLabel}>
                                    <input
                                        id="imageUpload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className={styles.imageInput}
                                    />
                                    <div className={styles.imagePlaceholder}>
                                        <Image src={plusIcon} alt="Upload" width={40} height={40} />
                                        <span>Upload image</span>
                                    </div>
                                </label>
                            )}
                        </div>

                        {/* Блок с макроэлементами*/}
                        <div className={styles.macronutrients}>
                            <input
                                type="text"
                                placeholder="Recipe title"
                                value={recipe.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                className={styles.titleInput}
                                required
                            />
                            
                            <div className={styles.macroDisplay}>
                                <div className={styles.macroItem}>
                                    <span className={styles.macroLabel}>Calories</span>
                                    <span className={styles.macroValue}>{recipe.calories} kcal</span>
                                </div>
                                <div className={styles.macroItem}>
                                    <span className={styles.macroLabel}>Proteins</span>
                                    <span className={styles.macroValue}>{recipe.proteins} g</span>
                                </div>
                                <div className={styles.macroItem}>
                                    <span className={styles.macroLabel}>Fats</span>
                                    <span className={styles.macroValue}>{recipe.fats} g</span>
                                </div>
                                <div className={styles.macroItem}>
                                    <span className={styles.macroLabel}>Carbohydrates</span>
                                    <span className={styles.macroValue}>{recipe.carbohydrates} g</span>
                                </div>
                            </div>
                            
                            <div className={styles.macroField}>
                                <label>Type</label>
                                <select
                                    value={recipe.type}
                                    onChange={(e) => handleChange('type', e.target.value)}
                                    className={styles.selectInput}
                                >
                                    {RECIPE_TYPES.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Правая колонка - ингредиенты и рецепт */}
                    <div className={styles.recipeContainer}>
                        <div className={styles.ingredients}>
                            <div className={styles.ingredientsTitle}>
                                Ingredients
                            </div>
                            
                            {/* Список ингредиентов */}
                            <div className={styles.selectedIngredients}>
                                {recipe.ingredients.map((ingredient, idx) => (
                                    <div key={idx} className={styles.ingredientItem}>
                                        <div className={styles.ingredientInfo}>
                                            <div className={styles.ingredientAmountControls}>
                                                <input
                                                    type="number"
                                                    value={ingredient.amount}
                                                    onChange={(e) => handleUpdateIngredientAmount(idx, parseInt(e.target.value) || 0)}
                                                    className={styles.ingredientAmountInput}
                                                />
                                                <select
                                                    value={ingredient.unit}
                                                    onChange={(e) => handleUpdateIngredientUnit(idx, e.target.value)}
                                                    className={styles.ingredientUnitSelect}
                                                >
                                                    {AMOUNT_UNITS.map(unit => (
                                                        <option key={unit} value={unit}>{unit}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <span className={styles.ingredientName}>{ingredient.name}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveIngredient(idx)}
                                            className={styles.removeButton}
                                        >
                                            <Image src={minusIcon} alt="Remove" width={14} height={14} />
                                        </button>
                                    </div>
                                ))}
                                {recipe.ingredients.length === 0 && (
                                    <div className={styles.emptyIngredients}>
                                        No ingredients added yet
                                    </div>
                                )}
                            </div>
                            
                            {/* Кнопка добавления ингредиента */}
                            <div className={styles.addButtonWrapper}>
                                <button 
                                    type="button"
                                    className={styles.addButton}
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    Add ingredient...
                                </button>
                                
                                {isDropdownOpen && (
                                    <div className={styles.dropdown}>
                                        <div className={styles.searchWrapper}>
                                            <input
                                                type="text"
                                                placeholder="Search ingredients..."
                                                className={styles.searchInput}
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                autoFocus
                                            />
                                        </div>
                                        
                                        <div className={styles.dropdownList}>
                                            {filteredIngredients.length > 0 ? (
                                                filteredIngredients.map((ingredient) => (
                                                    <div 
                                                        key={ingredient}
                                                        className={styles.dropdownItem}
                                                        onClick={() => handleAddIngredient(ingredient)}
                                                    >
                                                        {ingredient}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className={styles.noResults}>
                                                    No ingredients found
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className={styles.recipe}>
                            <div className={styles.recipeHeader}>
                                <div className={styles.recipeTitle}>Recipe</div>
                                <div className={styles.timeContainer}>
                                    <div className={styles.timeLabel}>
                                        <Image src={time} alt="Time" height={20} width={20} />
                                        <span>Cooking time</span>
                                    </div>
                                    <div className={styles.timeControls}>
                                        <input
                                            type="number"
                                            value={recipe.time}
                                            onChange={(e) => handleChange('time', e.target.value)}
                                            className={styles.timeAmountInput}
                                            placeholder="0"
                                        />
                                        <select
                                            value={timeUnit}
                                            onChange={(e) => setTimeUnit(e.target.value)}
                                            className={styles.timeUnitSelect}
                                        >
                                            <option value="min">min</option>
                                            <option value="hour">hour</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <textarea
                                placeholder="Write the recipe steps here..."
                                value={recipe.recipe}
                                onChange={(e) => handleChange('recipe', e.target.value)}
                                className={styles.recipeTextarea}
                                rows={8}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Кнопки действий */}
                <div className={styles.actions}>
                    <button type="button" onClick={onCancel} className={styles.cancelButton}>
                        Cancel
                    </button>
                    <button type="submit" className={styles.saveButton}>
                        Save Recipe
                    </button>
                </div>
            </div>
        </form>
    );
}