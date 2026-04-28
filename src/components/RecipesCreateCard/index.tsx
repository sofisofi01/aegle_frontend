"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./RecipesCreateCard.module.scss";
import plusIcon from "@/landings/recipes/assets/plusIcon.svg";
import minusIcon from "@/landings/recipes/assets/minus.png";
import { availableIngredients } from "../RecipesIngredientsFilter/const";
import {
  CreateRecipesCardProps,
  NewRecipe,
  IngredientWithAmount,
  RECIPE_TYPES,
  AMOUNT_UNITS,
} from "./types";

import { useSearchParams, useRouter } from "next/navigation";
import { nutritionService } from "@/services/nutritionService";

export function CreateRecipesCard({ onSave, onCancel, initialData }: CreateRecipesCardProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const day = searchParams.get("day");
  const mealType = searchParams.get("mealType");

  const [recipe, setRecipe] = useState<NewRecipe>({
    title: initialData?.title || "",
    type: initialData?.type || "Breakfast",
    calories: initialData?.calories || 200,
    proteins: initialData?.proteins || 23,
    fats: initialData?.fats || 3,
    carbohydrates: initialData?.carbohydrates || 33,
    ingredients: initialData?.ingredients || [],
    recipe: initialData?.recipe || "",
    time: initialData?.time || "",
    image: initialData?.image || "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [imagePreview, setImagePreview] = useState<string>(
    typeof recipe.image === "string" ? recipe.image : ""
  );

  const filteredIngredients = availableIngredients.filter((ingredient) =>
    ingredient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (
    field: keyof NewRecipe,
    value: string | number | IngredientWithAmount[]
  ) => {
    setRecipe((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddIngredient = (ingredientName: string) => {
    const newIngredient: IngredientWithAmount = {
      name: ingredientName,
      amount: 100,
      unit: "g",
    };

    if (!recipe.ingredients.some((ing) => ing.name === ingredientName)) {
      setRecipe((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient],
      }));
    }
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const handleUpdateIngredientAmount = (index: number, amount: number) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index].amount = Math.max(0, amount);
    setRecipe((prev) => ({ ...prev, ingredients: updatedIngredients }));
  };

  const handleUpdateIngredientUnit = (index: number, unit: string) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index].unit = unit;
    setRecipe((prev) => ({ ...prev, ingredients: updatedIngredients }));
  };

  const handleRemoveIngredient = (index: number) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setRecipe((prev) => ({ ...prev, image: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (recipe.title && recipe.recipe && recipe.ingredients.length > 0) {
      if (onSave) {
        onSave(recipe);
      }

      if (day && mealType) {
        const dayMap: Record<string, number> = {
          Monday: 1,
          Tuesday: 2,
          Wednesday: 3,
          Thursday: 4,
          Friday: 5,
          Saturday: 6,
          Sunday: 7,
        };

        try {
          await nutritionService.addFoodToPlan({
            day_number: dayMap[day] || 1,
            meal_type: mealType.toLowerCase(),
            food_name: recipe.title,
            calories: recipe.calories,
            protein: recipe.proteins,
            carbs: recipe.carbohydrates,
            fat: recipe.fats,
            image_url: imagePreview,
          });
          router.push("/nutrition");
        } catch (error) {
          console.error("Failed to add custom food to plan:", error);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.card}>
        <div className={styles.cardChars}>
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
                    onClick={() => document.getElementById("imageUpload")?.click()}
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

            <div className={styles.macronutrients}>
              <input
                type="text"
                placeholder="Recipe title"
                value={recipe.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className={styles.titleInput}
                required
              />
              <div className={styles.macroDisplay}>
                <div className={styles.macroItem}>
                  <span className={styles.macroLabel}>Calories</span>
                  <input
                    type="number"
                    value={recipe.calories}
                    onChange={(e) => handleChange("calories", parseInt(e.target.value) || 0)}
                    className={styles.macroInput}
                  />
                </div>
                <div className={styles.macroItem}>
                  <span className={styles.macroLabel}>Proteins</span>
                  <input
                    type="number"
                    value={recipe.proteins}
                    onChange={(e) => handleChange("proteins", parseInt(e.target.value) || 0)}
                    className={styles.macroInput}
                  />
                </div>
                <div className={styles.macroItem}>
                  <span className={styles.macroLabel}>Fats</span>
                  <input
                    type="number"
                    value={recipe.fats}
                    onChange={(e) => handleChange("fats", parseInt(e.target.value) || 0)}
                    className={styles.macroInput}
                  />
                </div>
                <div className={styles.macroItem}>
                  <span className={styles.macroLabel}>Carbohydrates</span>
                  <input
                    type="number"
                    value={recipe.carbohydrates}
                    onChange={(e) => handleChange("carbohydrates", parseInt(e.target.value) || 0)}
                    className={styles.macroInput}
                  />
                </div>
              </div>
              <div className={styles.macroField}>
                <label>Type</label>
                <select
                  value={recipe.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className={styles.selectInput}
                >
                  {RECIPE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={styles.recipeContainer}>
            <div className={styles.ingredients}>
              <div className={styles.ingredientsTitle}>Ingredients</div>
              <div className={styles.selectedIngredients}>
                {recipe.ingredients.map((ingredient, idx) => (
                  <div key={idx} className={styles.ingredientItem}>
                    <div className={styles.ingredientInfo}>
                      <div className={styles.ingredientAmountControls}>
                        <input
                          type="number"
                          value={ingredient.amount}
                          onChange={(e) =>
                            handleUpdateIngredientAmount(idx, parseInt(e.target.value) || 0)
                          }
                          className={styles.ingredientAmountInput}
                        />
                        <select
                          value={ingredient.unit}
                          onChange={(e) => handleUpdateIngredientUnit(idx, e.target.value)}
                          className={styles.ingredientUnitSelect}
                        >
                          {AMOUNT_UNITS.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
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
              </div>
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
                    <input
                      type="text"
                      placeholder="Search or type new..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={styles.dropdownSearch}
                      autoFocus
                    />
                    <div className={styles.dropdownList}>
                      {filteredIngredients.map((ing) => (
                        <div
                          key={ing}
                          className={styles.dropdownItem}
                          onClick={() => handleAddIngredient(ing)}
                        >
                          {ing}
                        </div>
                      ))}
                      {searchTerm && !availableIngredients.includes(searchTerm) && (
                        <div
                          className={styles.dropdownItem}
                          onClick={() => handleAddIngredient(searchTerm)}
                        >
                          Add new: &ldquo;{searchTerm}&rdquo;
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.recipeText}>
              <div className={styles.recipeTitle}>Recipe</div>
              <textarea
                value={recipe.recipe}
                onChange={(e) => handleChange("recipe", e.target.value)}
                placeholder="Describe the cooking process..."
                className={styles.recipeTextarea}
                required
              />
            </div>
          </div>
        </div>
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
