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
  onDelete,
}: NutritionCardProps & { onDelete?: (id: number) => void }) {
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
                typeof image === "string"
                  ? image.startsWith("http")
                    ? image
                    : `https://xn--80abcyabjk1czh.xn--p1ai${image}`
                  : image.src
              }
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
                    ? image.startsWith("http")
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
                  <span className={styles.macroLabel}>Calories</span>
                  <span className={styles.macroValue}>{calories} kcal</span>
                </div>
                <div className={styles.modalMacroItem}>
                  <span className={styles.macroLabel}>Proteins</span>
                  <span className={styles.macroValue}>{proteins}g</span>
                </div>
                <div className={styles.modalMacroItem}>
                  <span className={styles.macroLabel}>Carbs</span>
                  <span className={styles.macroValue}>{carbs}g</span>
                </div>
                <div className={styles.modalMacroItem}>
                  <span className={styles.macroLabel}>Fats</span>
                  <span className={styles.macroValue}>{fats}g</span>
                </div>
              </div>
              <div className={styles.modalStatus}>
                Status: <strong>{isEaten ? "Eaten" : "Planned"}</strong>
              </div>
              {onDelete && (
                <button
                  className={styles.deleteButton}
                  onClick={() => {
                    onDelete(id);
                    setIsModalOpen(false);
                  }}
                >
                  Remove from plan
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
