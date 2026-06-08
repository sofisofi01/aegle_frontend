"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./NutritionCard.module.scss";
import doneIcon from "@/landings/workout/assets/doneIcon.png";
import nodoneIcon from "@/landings/workout/assets/nodoneIcon.svg";
import workoutDefaultImg from "@/landings/workout/assets/workout.png";
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
  onDelete,
  ingredients,
  recipe,
}: NutritionCardProps) {
  const [showDone, setShowDone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <>
      <div className={styles.card} onClick={() => setIsModalOpen(true)}>
        {image && (
          <div className={styles.imageWrapper}>
            <Image
              src={
                image &&
                typeof image === "string" &&
                (image.startsWith("http") || image.startsWith("data:"))
                  ? image
                  : image && typeof image === "string"
                    ? `https://xn--80abcyabjk1czh.xn--p1ai${image}`
                    : image && typeof image !== "string"
                      ? image.src
                      : workoutDefaultImg.src
              }
              alt={title}
              width={200}
              height={200}
              className={styles.image}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = workoutDefaultImg.src;
              }}
            />
            {showDone && <div className={styles.donePopup}>Готово!</div>}
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
          <div className={styles.calories}>{calories} ккал</div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <div className={styles.modalHeader}>
              <Image
                src={
                  typeof image === "string"
                    ? image.startsWith("http") || image.startsWith("data:")
                      ? image
                      : `https://xn--80abcyabjk1czh.xn--p1ai${image}`
                    : image?.src || ""
                }
                alt={title}
                width={300}
                height={300}
                className={styles.modalImage}
              />
              <h2>{title}</h2>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalMacros}>
                <div className={styles.modalMacroItem}>
                  <span className={styles.macroLabel}>Калории</span>
                  <span className={styles.macroValue}>{calories} ккал</span>
                </div>
                <div className={styles.modalMacroItem}>
                  <span className={styles.macroLabel}>Белки</span>
                  <span className={styles.macroValue}>{proteins}г</span>
                </div>
                <div className={styles.modalMacroItem}>
                  <span className={styles.macroLabel}>Углеводы</span>
                  <span className={styles.macroValue}>{carbs}г</span>
                </div>
                <div className={styles.modalMacroItem}>
                  <span className={styles.macroLabel}>Жиры</span>
                  <span className={styles.macroValue}>{fats}г</span>
                </div>
              </div>

              {ingredients && (
                <div className={styles.modalSection}>
                  <h3>Ингредиенты</h3>
                  <p>{ingredients}</p>
                </div>
              )}

              {recipe && (
                <div className={styles.modalSection}>
                  <h3>Рецепт</h3>
                  <p className={styles.recipeText}>{recipe}</p>
                </div>
              )}

              <div className={styles.modalStatus}>
                Статус: <strong>{isEaten ? "Eaten" : "Planned"}</strong>
              </div>
              {onDelete && (
                <button
                  className={styles.deleteButton}
                  onClick={() => {
                    onDelete(id);
                    setIsModalOpen(false);
                  }}
                >
                  Убрать из плана
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
