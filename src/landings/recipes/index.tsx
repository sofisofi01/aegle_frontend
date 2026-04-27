"use client";

import { useState } from "react";
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
  const [, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const results = await nutritionService.searchFood(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddToPlan = async (food: FoodSearchResult) => {
    if (!day || !mealType) return;

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
        food_name: food.name,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        image_url: food.image_url,
      });
      router.push("/nutrition");
    } catch (error) {
      console.error("Failed to add food to plan:", error);
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
        {/* Попап с CreateRecipesCard */}
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
              Find your perfect dish <br /> or create it yourself
            </h1>
            <div className={styles.searchContainer}>
              <div className={styles.searchWrapper}>
                <input
                  type="text"
                  placeholder="Search for the recipe or food..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <button className={styles.searchButton} onClick={handleSearch}>
                  <Image src={searchIcon} alt="Search icon" width={20} height={20} />
                </button>
              </div>
              <button className={styles.createButton} onClick={() => setIsCreatePopupOpen(true)}>
                <span>create</span>
                <Image src={plusIcon} alt="Create icon" width={20} height={20} />
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
            />
          </div>

          <button
            className={styles.filterButton}
            onClick={() => setIsFiltersOpen(true)}
            aria-label="Open filters"
          >
            <Image src={filterIcon} alt="Filters" width={40} height={40} />
          </button>

          <div className={styles.mainContent}>
            {searchResults.length > 0 && (
              <div className={styles.searchResults}>
                <h2>Search Results</h2>
                <div className={styles.resultsGrid}>
                  {searchResults.map((food, idx) => (
                    <div key={idx} className={styles.resultCard}>
                      <div className={styles.resultInfo}>
                        <h3>{food.name}</h3>
                        <p>
                          {food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | F:{" "}
                          {food.fat}g
                        </p>
                      </div>
                      {day && mealType && (
                        <button className={styles.addButton} onClick={() => handleAddToPlan(food)}>
                          Add to {mealType}
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
              />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
