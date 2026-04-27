"use client";

import { useState, useEffect } from "react";
import { Page } from "@/containers/Page";
import { Popup } from "@/components/WorkoutPopup";
import { WorkoutCard } from "@/components/WorkoutCard";
import { WorkoutFilterSidebar } from "@/components/WorkoutFilterSidebar";
import { WorkoutMiniCard } from "@/components/WorkoutMiniCard";
import styles from "./workout.module.scss";
import { minicardData as initialMinicardData } from "./const";
import { exerciseService, Exercise } from "@/services/exerciseService";
import Image, { StaticImageData } from "next/image";
import filterIcon from "./assets/filterIcon.svg";
import checkIcon from "./assets/checkIcon.png";
import racket from "./assets/racket.png";
import weights from "./assets/weights.png";
import workoutDefaultImg from "@/landings/workout/assets/workout.png";

export function WorkoutPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [minicardData, setMinicardData] = useState<
    Array<{
      id: number;
      title: string;
      sets: string;
      image: string | StaticImageData;
    }>
  >(initialMinicardData);
  const [nextId, setNextId] = useState(initialMinicardData.length + 1);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await exerciseService.getExercises();
        setExercises(data);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const handleAddToWorkout = (workout: {
    title: string;
    sets?: string;
    image: StaticImageData | string;
  }) => {
    const newMiniCard = {
      id: nextId,
      title: workout.title,
      sets: workout.sets || "10x3",
      image: workout.image,
    };

    setMinicardData([...minicardData, newMiniCard]);
    setNextId(nextId + 1);
  };

  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.textStart}>
          <h1 className={styles.title}>Start your daily workout</h1>
          <button onClick={() => setIsPopupOpen(true)} className={styles.openButton}>
            <Image src={checkIcon} alt="Check" width={20} height={20} />
            Check our recommendations
          </button>
        </div>

        <div className={styles.minicardContainer}>
          {minicardData.map((workout) => (
            <WorkoutMiniCard
              key={workout.id}
              id={workout.id}
              title={workout.title}
              sets={workout.sets}
              image={workout.image}
              onDelete={() => {
                setMinicardData(minicardData.filter((item) => item.id !== workout.id));
              }}
            />
          ))}
        </div>

        <div className={styles.container}>
          {/* Оборачиваем фильтры и картинки в один div с position relative */}
          <div className={styles.filtersWrapper}>
            <WorkoutFilterSidebar isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} />
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
                exercises.map((exercise) => (
                  <WorkoutCard
                    key={exercise.id}
                    title={exercise.name}
                    muscles={exercise.target_muscles.join(", ")}
                    text={exercise.description}
                    image={exercise.image || workoutDefaultImg}
                    onAddToWorkout={() =>
                      handleAddToWorkout({
                        title: exercise.name,
                        image: exercise.image || workoutDefaultImg,
                        sets: "10x3",
                      })
                    }
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
