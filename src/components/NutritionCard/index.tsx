"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./NutritionCard.module.scss";
import doneIcon from "@/landings/workout/assets/doneIcon.png";
import nodoneIcon from "@/landings/workout/assets/nodoneIcon.svg";
import { NutritionCardProps } from "./types";

export function NutritionCard({
  id,
  title,
  calories = 200,
  image,
  proteins,
  carbs,
  fats,
  isEaten,
  onToggleEaten,
}: NutritionCardProps) {
  const [showDone, setShowDone] = useState(false);

  const handleComplete = () => {
    if (onToggleEaten) {
      onToggleEaten(id);
    }

    if (!isEaten) {
      setShowDone(true);
      setTimeout(() => {
        setShowDone(false);
      }, 1500);
    }
  };

  return (
    <div className={styles.card}>
      {image && (
        <div className={styles.imageWrapper}>
          <Image
            src={typeof image === "string" ? image : image.src}
            alt={title}
            width={200}
            height={200}
            className={styles.image}
          />
          {showDone && <div className={styles.donePopup}>Done!</div>}
          <button className={styles.doneButton} onClick={handleComplete}>
            <Image
              src={isEaten ? doneIcon : nodoneIcon}
              alt={isEaten ? "done" : "no done"}
              width={20}
              height={20}
              className={styles.doneIcon}
            />
          </button>
        </div>
      )}
      <div className={styles.bottom}>
        <div className={styles.title}>{title}</div>
        <div className={styles.calories}>{calories} kkal</div>
      </div>
      <div className={styles.macros}>
        <div className={styles.macroRow}>
          <span className={styles.macroName}>Proteins:</span>
          <span className={styles.macroValue}>{proteins}g</span>
        </div>
        <div className={styles.macroRow}>
          <span className={styles.macroName}>Carbs:</span>
          <span className={styles.macroValue}>{carbs}g</span>
        </div>
        <div className={styles.macroRow}>
          <span className={styles.macroName}>Fats:</span>
          <span className={styles.macroValue}>{fats}g</span>
        </div>
      </div>
    </div>
  );
}
