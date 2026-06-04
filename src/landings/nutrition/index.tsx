"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./nutrition.module.scss";
import { Page } from "@/containers/Page";
import { CalorieCalculator } from "@/components/CalorieCalculator";
import { NutritionCard } from "@/components/NutritionCard";
import { NutritionEmptyCard } from "@/components/NutritionEmptyCard";
import { NutritionTotalCard } from "@/components/NutritionTotalCard";
import { NutritionTableCard } from "@/components/NutritionTableCard";
import { nutritionService, NutritionPlan } from "@/services/nutritionService";

import mondayImg from "./assets/mon.png";
import tuesdayImg from "./assets/tue.png";
import wednesdayImg from "./assets/wed.png";
import thursdayImg from "./assets/thur.png";
import fridayImg from "./assets/fri.png";
import saturdayImg from "./assets/sat.png";
import sundayImg from "./assets/sun.png";

import foodDefaultImg from "./assets/food.png";

const daysOfWeek = [
  { id: 1, name: "Monday", image: mondayImg },
  { id: 2, name: "Tuesday", image: tuesdayImg },
  { id: 3, name: "Wednesday", image: wednesdayImg },
  { id: 4, name: "Thursday", image: thursdayImg },
  { id: 5, name: "Friday", image: fridayImg },
  { id: 6, name: "Saturday", image: saturdayImg },
  { id: 7, name: "Sunday", image: sundayImg },
];

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Total"];

export function NutritionPage() {
  const [activePlan, setActivePlan] = useState<NutritionPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const plan = await nutritionService.getActivePlan();
      setActivePlan(plan);
    } catch (error) {
      console.error("Failed to fetch nutrition plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCurrentDayNumber = () => {
    const day = new Date().getDay(); // 0 (Sun) - 6 (Sat)
    return day === 0 ? 7 : day;
  };

  const currentDayNumber = getCurrentDayNumber();
  const todayPlan = activePlan?.days.find((d) => d.day_number === currentDayNumber);

  const handleToggleEaten = async (entryId: number) => {
    const entry = activePlan?.days.flatMap((d) => d.entries).find((e) => e.id === entryId);
    if (entry) {
      try {
        await nutritionService.updateNutritionEntry(entryId, { is_eaten: !entry.is_eaten });
        await fetchData();
      } catch (error) {
        console.error("Failed to update entry:", error);
      }
    }
  };

  const handleDeleteEntry = async (entryId: number) => {
    try {
      await nutritionService.deleteNutritionEntry(entryId);
      await fetchData();
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  };

  const getEntriesForDayAndMeal = (dayNumber: number, mealType: string) => {
    const day = activePlan?.days.find((d) => d.day_number === dayNumber);
    return day?.entries.filter((e) => e.meal_type.toLowerCase() === mealType.toLowerCase()) || [];
  };

  const calculateDayTotals = (dayNumber: number) => {
    const day = activePlan?.days.find((d) => d.day_number === dayNumber);
    if (!day) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    return day.entries.reduce(
      (acc, e) => ({
        calories: acc.calories + e.calories,
        protein: acc.protein + e.protein,
        carbs: acc.carbs + e.carbs,
        fat: acc.fat + e.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.upperContainer}>
          <div className={styles.cardsTitle}>
            <h1 className={styles.title}>Your meals today are...</h1>
            <div className={styles.cardContainer}>
              {isLoading ? (
                <p>Loading...</p>
              ) : todayPlan?.entries.length === 0 ? (
                <p>No meals planned for today.</p>
              ) : (
                todayPlan?.entries.map((item) => (
                  <NutritionCard
                    key={item.id}
                    id={item.id}
                    title={item.food_name}
                    calories={item.calories}
                    proteins={item.protein}
                    carbs={item.carbs}
                    fats={item.fat}
                    image={item.image_url || foodDefaultImg}
                    isEaten={item.is_eaten}
                    ingredients={item.ingredients}
                    recipe={item.recipe}
                    onToggleEaten={handleToggleEaten}
                    onDelete={handleDeleteEntry}
                  />
                ))
              )}
            </div>
          </div>
          <div className={styles.calorieCalculatorContainer}>
            <CalorieCalculator />
          </div>
        </div>

        <div className={styles.calendarContainer}>
          <div className={styles.nutritionTable}>
            <div className={styles.cornerCell}></div>
            {mealTypes.map((meal) => (
              <div key={meal} className={styles.headerCell}>
                {meal}
              </div>
            ))}

            {daysOfWeek.map((day) => (
              <React.Fragment key={day.name}>
                <div className={styles.dayCell}>
                  <Image src={day.image} alt={day.name} className={styles.dayImage} />
                </div>

                {mealTypes.map((meal) => {
                  if (meal === "Total") {
                    const totals = calculateDayTotals(day.id);
                    return (
                      <div
                        key={`${day.name}-total`}
                        className={`${styles.cell} ${styles.totalCell}`}
                      >
                        <NutritionTotalCard
                          calories={totals.calories}
                          proteins={totals.protein}
                          carbs={totals.carbs}
                          fats={totals.fat}
                        />
                      </div>
                    );
                  }

                  const entries = getEntriesForDayAndMeal(day.id, meal);

                  return (
                    <div key={`${day.name}-${meal}`} className={styles.cell}>
                      {entries.length > 0 ? (
                        entries.map((entry) => (
                          <NutritionTableCard
                            key={entry.id}
                            id={entry.id}
                            title={entry.food_name}
                            calories={entry.calories}
                            proteins={entry.protein}
                            carbs={entry.carbs}
                            fats={entry.fat}
                            image={entry.image_url || foodDefaultImg}
                            isEaten={entry.is_eaten}
                            ingredients={entry.ingredients}
                            recipe={entry.recipe}
                            onToggleEaten={handleToggleEaten}
                            onDelete={handleDeleteEntry}
                          />
                        ))
                      ) : (
                        <NutritionEmptyCard day={day.name} mealType={meal} />
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}
