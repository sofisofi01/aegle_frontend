"use client";

import { useState, useEffect } from "react";
import { Page } from "@/containers/Page";
import { Popup } from "@/components/WorkoutPopup";
import { WorkoutCard } from "@/components/WorkoutCard";
import { WorkoutFilterSidebar } from "@/components/WorkoutFilterSidebar";
import { WorkoutMiniCard } from "@/components/WorkoutMiniCard";
import styles from "./workout.module.scss";
import { exerciseService, Exercise, WorkoutPlan } from "@/services/exerciseService";
import Image from "next/image";
import filterIcon from "./assets/filterIcon.svg";
import checkIcon from "./assets/checkIcon.png";
import racket from "./assets/racket.png";
import weights from "./assets/weights.png";
import workoutDefaultImg from "@/landings/workout/assets/workout.png";

export function WorkoutPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(null);

  const daysOfWeek = [
    { id: 1, name: "Mon" },
    { id: 2, name: "Tue" },
    { id: 3, name: "Wed" },
    { id: 4, name: "Thu" },
    { id: 5, name: "Fri" },
    { id: 6, name: "Sat" },
    { id: 7, name: "Sun" },
  ];

  const fetchData = async () => {
    try {
      const [exercisesData, planData] = await Promise.all([
        exerciseService.getExercises(),
        exerciseService.getActivePlan().catch(() => null),
      ]);
      setExercises(exercisesData);
      setActivePlan(planData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMuscleToggle = (muscle: string) => {
    setSelectedMuscles((prev) =>
      prev.includes(muscle) ? prev.filter((m) => m !== muscle) : [...prev, muscle]
    );
  };

  const handleEquipmentToggle = (equipment: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(equipment) ? prev.filter((e) => e !== equipment) : [...prev, equipment]
    );
  };

  const handleResetFilters = () => {
    setSelectedMuscles([]);
    setSelectedEquipment([]);
  };

  const filteredExercises = exercises.filter((exercise) => {
    const matchesMuscle =
      selectedMuscles.length === 0 ||
      exercise.target_muscles.some((m) => selectedMuscles.includes(m.toLowerCase()));
    const matchesEquipment =
      selectedEquipment.length === 0 ||
      exercise.equipment.some((e) => selectedEquipment.includes(e.toLowerCase()));
    return matchesMuscle && matchesEquipment;
  });

  const currentDayPlan = activePlan?.days.find((d) => d.day_number === selectedDay);

  const totalCalories =
    currentDayPlan?.exercises.reduce((sum, ex) => sum + Number(ex.total_calories), 0) || 0;

  const totalTime =
    currentDayPlan?.exercises.reduce(
      (sum, ex) => sum + ex.sets * 2 + (ex.sets * ex.rest_seconds) / 60,
      0
    ) || 0;

  const handleAddToWorkout = async (exercise: Exercise) => {
    try {
      await exerciseService.addExerciseToPlan(selectedDay, exercise.id, { sets: 3, reps: 10 });
      await fetchData();
    } catch (error) {
      console.error("Failed to add exercise:", error);
    }
  };

  const handleDeleteExercise = async (workoutExerciseId: number) => {
    try {
      await exerciseService.removeExerciseFromPlan(workoutExerciseId);
      await fetchData();
    } catch (error) {
      console.error("Failed to delete exercise:", error);
    }
  };

  const handleUpdateSets = async (workoutExerciseId: number, newSetsString: string) => {
    try {
      const [reps, sets] = newSetsString
        .toLowerCase()
        .split("x")
        .map((n) => parseInt(n.trim()));
      if (!isNaN(reps) && !isNaN(sets)) {
        await exerciseService.updateWorkoutExercise(workoutExerciseId, { reps, sets });
        await fetchData();
      }
    } catch (error) {
      console.error("Failed to update sets:", error);
    }
  };

  const handleToggleComplete = async (workoutExerciseId: number) => {
    try {
      const exercise = currentDayPlan?.exercises.find((ex) => ex.id === workoutExerciseId);
      if (exercise) {
        await exerciseService.updateWorkoutExercise(workoutExerciseId, {
          is_completed: !exercise.is_completed,
        });
        await fetchData();
      }
    } catch (error) {
      console.error("Failed to toggle complete:", error);
    }
  };

  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.textStart}>
          <h1 className={styles.title}>Start your daily workout</h1>
          <div className={styles.stats}>
            <span>Total Calories: {totalCalories.toFixed(0)} kcal</span>
            <span>Estimated Time: {totalTime.toFixed(0)} min</span>
          </div>
          <button onClick={() => setIsPopupOpen(true)} className={styles.openButton}>
            <Image src={checkIcon} alt="Check" width={20} height={20} />
            Check our recommendations
          </button>
        </div>

        <div className={styles.daysContainer}>
          {daysOfWeek.map((day) => (
            <button
              key={day.id}
              className={`${styles.dayButton} ${selectedDay === day.id ? styles.activeDay : ""}`}
              onClick={() => setSelectedDay(day.id)}
            >
              {day.name}
            </button>
          ))}
        </div>

        <div className={styles.minicardContainer}>
          {currentDayPlan?.exercises.map((ex) => (
            <WorkoutMiniCard
              key={ex.id}
              id={ex.id}
              title={ex.exercise.name}
              sets={`${ex.reps}x${ex.sets}`}
              image={ex.exercise.image || workoutDefaultImg}
              isCompleted={ex.is_completed}
              onDelete={() => handleDeleteExercise(ex.id)}
              onUpdateSets={handleUpdateSets}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>

        <div className={styles.container}>
          <div className={styles.filtersWrapper}>
            <WorkoutFilterSidebar
              isOpen={isFiltersOpen}
              onClose={() => setIsFiltersOpen(false)}
              selectedMuscles={selectedMuscles}
              selectedEquipment={selectedEquipment}
              onMuscleToggle={handleMuscleToggle}
              onEquipmentToggle={handleEquipmentToggle}
              onResetFilters={handleResetFilters}
            />
            <div className={styles.peekingImages}>
              <div className={`${styles.imageContainer} ${styles.racket}`}>
                <Image
                  src={racket}
                  alt="racket"
                  width={120}
                  height={120}
                  className={styles.peekingImage}
                />
              </div>
              <div className={`${styles.imageContainer} ${styles.weights}`}>
                <Image
                  src={weights}
                  alt="weights"
                  width={120}
                  height={120}
                  className={styles.peekingImage}
                />
              </div>
            </div>
          </div>

          <button className={styles.filterButton} onClick={() => setIsFiltersOpen(true)}>
            <Image src={filterIcon} alt="Filters" width={40} height={40} />
          </button>

          <div className={styles.mainContent}>
            <div className={styles.cardsContainer}>
              {isLoading ? (
                <p>Loading exercises...</p>
              ) : (
                filteredExercises.map((exercise) => (
                  <WorkoutCard
                    key={exercise.id}
                    title={exercise.name}
                    muscles={exercise.target_muscles.join(", ")}
                    text={exercise.description}
                    image={exercise.image || undefined}
                    videoUrl={exercise.video_url}
                    onAddToWorkout={() => handleAddToWorkout(exercise)}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      </div>
    </Page>
  );
}
