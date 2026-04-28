"use client";

import { useState, useEffect } from "react";
import styles from "./RecipesCard.module.scss";
import Image from "next/image";
import time from "@/landings/recipes/assets/time.png";
import { data as mockData } from "@/landings/recipes/const";
import { RecipesCardProps } from "./types";
import { nutritionService } from "@/services/nutritionService";

import { StaticImageData } from "next/image";

interface RecipeData {
  title: string;
  type: string;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  ingredients: string;
  recipe: string;
  time: string;
  image: string | StaticImageData;
}

export function RecipesCard({
  selectedType,
  selectedIngredients,
  caloriesRange,
  carbsRange,
  proteinsRange,
  fatsRange,
}: RecipesCardProps) {
  const [userRecipes, setUserRecipes] = useState<RecipeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const results = await nutritionService.getUserFoodItems();
        // Преобразуем формат бэкенда в формат карточки
        const formatted: RecipeData[] = results.map((item) => {
          return {
            title: item.name,
            type: item.meal_type || "custom",
            calories: item.calories,
            proteins: item.protein,
            fats: item.fat,
            carbohydrates: item.carbs,
            ingredients: item.ingredients || "No ingredients listed",
            recipe: item.recipe || "No recipe instructions",
            time: `${item.cooking_time || 15} min`,
            image: item.image_url || mockData[0].image,
          };
        });
        setUserRecipes(formatted);
      } catch (error) {
        console.error("Failed to fetch user recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserRecipes();
  }, []);

  const allData = userRecipes;

  // Фильтрация по типу
  let filteredData = selectedType
    ? allData.filter((item) => item.type === selectedType.toLowerCase())
    : allData;

  // Фильтрация по ингредиентам
  if (selectedIngredients.length > 0) {
    filteredData = filteredData.filter((recipe) => {
      const recipeIngredients = recipe.ingredients.toLowerCase();
      return selectedIngredients.every((ingredient) =>
        recipeIngredients.includes(ingredient.toLowerCase())
      );
    });
  }

  // Фильтрация по калориям
  if (caloriesRange) {
    filteredData = filteredData.filter((recipe) => {
      return recipe.calories >= caloriesRange.min && recipe.calories <= caloriesRange.max;
    });
  }

  // Фильтрация по углеводам
  if (carbsRange) {
    filteredData = filteredData.filter((recipe) => {
      return recipe.carbohydrates >= carbsRange.min && recipe.carbohydrates <= carbsRange.max;
    });
  }

  // Фильтрация по белкам
  if (proteinsRange) {
    filteredData = filteredData.filter((recipe) => {
      return recipe.proteins >= proteinsRange.min && recipe.proteins <= proteinsRange.max;
    });
  }

  // Фильтрация по жирам
  if (fatsRange) {
    filteredData = filteredData.filter((recipe) => {
      return recipe.fats >= fatsRange.min && recipe.fats <= fatsRange.max;
    });
  }

  // Показываем загрузку
  if (isLoading) {
    return (
      <div className={styles.emptyState}>
        <p>Loading recipes...</p>
      </div>
    );
  }

  // Если нет рецептов
  if (filteredData.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No recipes found</p>
        {(selectedType ||
          selectedIngredients.length > 0 ||
          caloriesRange ||
          carbsRange ||
          proteinsRange ||
          fatsRange) && <p className={styles.emptyStateHint}>Try changing your filters</p>}
      </div>
    );
  }

  return (
    <div className={styles.cardsContainer}>
      {filteredData.map((item, index) => (
        <div className={styles.card} key={index}>
          <div className={styles.cardChars}>
            <div className={styles.previewContainer}>
              <div className={styles.imageWrapper}>
                <Image
                  src={
                    typeof item.image === "string"
                      ? item.image.startsWith("http")
                        ? item.image
                        : `https://xn--80abcyabjk1czh.xn--p1ai${item.image}`
                      : item.image.src
                  }
                  alt="Recipe"
                  width={150}
                  height={150}
                  className={styles.recipeImage}
                  quality={95}
                  priority={index === 0}
                />
              </div>

              <div className={styles.macronutrients}>
                <h1 className={styles.title}>{item.title}</h1>
                <div>
                  Calories: <span className={styles.value}>{item.calories}</span>
                </div>
                <div>
                  Proteins: <span className={styles.value}>{item.proteins}</span>
                </div>
                <div>
                  Fats: <span className={styles.value}>{item.fats}</span>
                </div>
                <div>
                  Carbohydrates: <span className={styles.value}>{item.carbohydrates}</span>
                </div>
                <div className={styles.perunit}>(Per 100 gramm)</div>
              </div>
            </div>
            <div className={styles.recipeContainer}>
              <div className={styles.ingredients}>
                <div className={styles.ingredientsTitle}>Ingredients</div>
                <div className={styles.ingredientsList}>{item.ingredients}</div>
              </div>
              <div className={styles.recipe}>
                <div className={styles.recipeTitle}>
                  Recipe
                  <div className={styles.time}>
                    <Image src={time} alt="Time" height={20} width={20} />
                    <div>{item.time}</div>
                  </div>
                </div>

                <div className={styles.recipeText}>{item.recipe}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
