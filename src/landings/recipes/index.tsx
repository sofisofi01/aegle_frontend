"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Page } from "@/containers/Page";
import { RecipesCard } from "@/components/RecipesCard";
import { RecipesFilterSidebar } from "@/components/RecipesFilterSidebar";
import { CreateRecipesCard } from "@/components/RecipesCreateCard";
import styles from "./recipes.module.scss";
import searchIcon from "./assets/searchIcon.svg";
import plusIcon from "./assets/plusIcon.svg";
import filterIcon from "./assets/filterIcon.svg";
import { useSearchParams, useRouter } from "next/navigation";
import { nutritionService, FoodSearchResult } from "@/services/nutritionService";

export function RecipesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const day = searchParams.get("day");
  const mealType = searchParams.get("mealType");

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const [caloriesRange, setCaloriesRange] = useState<{ min: number; max: number }>();
  const [carbsRange, setCarbsRange] = useState<{ min: number; max: number }>();
  const [proteinsRange, setProteinsRange] = useState<{ min: number; max: number }>();
  const [fatsRange, setFatsRange] = useState<{ min: number; max: number }>();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FoodSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [availableIngredients, setAvailableIngredients] = useState<string[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const results = await nutritionService.getUserFoodItems();
        const ingredientsSet = new Set<string>();
        results.forEach((item) => {
          if (item.ingredients) {
            item.ingredients.split(",").forEach((ing) => {
              const name = ing.split("(")[0].trim();
              if (name) ingredientsSet.add(name);
            });
          }
        });
        // Добавляем стандартные
        ["яйца", "молоко", "помидоры", "курица", "сыр", "мука"].forEach((i) =>
          ingredientsSet.add(i)
        );
        setAvailableIngredients(Array.from(ingredientsSet));
      } catch (e) {
        console.error("Не удалось загрузить ингредиенты:", e);
      }
    };
    fetchIngredients();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const results = await nutritionService.searchFood(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Ошибка поиска:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddToPlan = async (food: FoodSearchResult) => {
    if (!day || !mealType) return;

    const dayMap: Record<string, number> = {
      Понедельник: 1,
      Вторник: 2,
      Среда: 3,
      Четверг: 4,
      Пятница: 5,
      Суббота: 6,
      Воскресенье: 7,
    };

    try {
      await nutritionService.addFoodToPlan({
        day_number: dayMap[day] || 1,
        meal_type: mealType.toLowerCase(),
        food_name: food.name,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        image_url: food.image_url,
      });
      router.push("/nutrition");
    } catch (error) {
      console.error("Не удалось добавить блюдо в план:", error);
    }
  };

  const handleSelectType = (type: string) => {
    setSelectedType((prev) => (prev === type ? null : type));
    setIsFiltersOpen(false);
  };

  const handleSelectIngredients = (ingredients: string[]) => {
    setSelectedIngredients(ingredients);
  };

  const handleCaloriesChange = (min: number, max: number) => {
    setCaloriesRange({ min, max });
  };

  const handleCarbsChange = (min: number, max: number) => {
    setCarbsRange({ min, max });
  };

  const handleProteinsChange = (min: number, max: number) => {
    setProteinsRange({ min, max });
  };

  const handleFatsChange = (min: number, max: number) => {
    setFatsRange({ min, max });
  };

  const handleClosePopup = () => {
    setIsCreatePopupOpen(false);
  };

  return (
    <Page>
      <div className={styles.page}>
        {isCreatePopupOpen && (
          <div className={styles.popupOverlay} onClick={handleClosePopup}>
            <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
              <CreateRecipesCard onCancel={handleClosePopup} />
            </div>
          </div>
        )}

        <div className={styles.searchBlock}>
          <div className={styles.headerContainer}>
            <h1 className={styles.title}>
              Найдите своё идеальное блюдо <br /> или создайте его сами
            </h1>
            <div className={styles.searchContainer}>
              <div className={styles.searchWrapper}>
                <input
                  type="text"
                  placeholder="Поиск рецептов..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <button className={styles.searchButton} onClick={handleSearch}>
                  <Image src={searchIcon} alt="Иконка поиска" width={20} height={20} />
                </button>
              </div>
              <button className={styles.createButton} onClick={() => setIsCreatePopupOpen(true)}>
                <span>создать</span>
                <Image src={plusIcon} alt="Иконка создания" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.filtersWrapper}>
            <RecipesFilterSidebar
              isOpen={isFiltersOpen}
              onClose={() => setIsFiltersOpen(false)}
              selectedType={selectedType}
              onSelectType={handleSelectType}
              selectedIngredients={selectedIngredients}
              onSelectIngredients={handleSelectIngredients}
              onRangeChange={handleCaloriesChange}
              onCarbsRangeChange={handleCarbsChange}
              onProteinsRangeChange={handleProteinsChange}
              onFatsRangeChange={handleFatsChange}
              availableIngredients={availableIngredients}
            />
          </div>

          <button
            className={styles.filterButton}
            onClick={() => setIsFiltersOpen(true)}
            aria-label="Открыть фильтры"
          >
            <Image src={filterIcon} alt="Фильтры" width={40} height={40} />
          </button>

          <div className={styles.mainContent}>
            {isSearching && <p className={styles.loadingText}>Поиск в FatSecret...</p>}

            {!isSearching && searchQuery && searchResults.length === 0 && (
              <div className={styles.noResults}>
                <p>Не нашли то, что искали в нашей базе данных?</p>
                <button
                  className={styles.createCustomButton}
                  onClick={() => setIsCreatePopupOpen(true)}
                >
                  Создать своё блюдо
                </button>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className={styles.searchResults}>
                <h2>Результаты поиска</h2>
                <div className={styles.resultsGrid}>
                  {searchResults.map((food, idx) => (
                    <div key={idx} className={styles.resultCard}>
                      <div className={styles.resultInfo}>
                        <h3>{food.name}</h3>
                        <p>
                          {food.calories} ккал | Б: {food.protein}г | Ж: {food.carbs}г | У:{" "}
                          {food.fat}г
                        </p>
                      </div>
                      {day && mealType && (
                        <button className={styles.addButton} onClick={() => handleAddToPlan(food)}>
                          Добавить к {mealType}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.cardsContainer}>
              <RecipesCard
                selectedType={selectedType}
                selectedIngredients={selectedIngredients}
                caloriesRange={caloriesRange}
                carbsRange={carbsRange}
                proteinsRange={proteinsRange}
                fatsRange={fatsRange}
                onAdd={handleAddToPlan}
                mealType={mealType}
              />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}