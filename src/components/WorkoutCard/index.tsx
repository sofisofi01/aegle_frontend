"use client";

import styles from "./WorkoutCard.module.scss";
import Image from "next/image";
import plusIcon from "@/landings/workout/assets/plusIcon.svg";
import { WorkoutCardProps } from "./types";
import { useState, useEffect } from "react";
import { breakpoints } from "@/styles/variables/breakpoints";

export function WorkoutCard({ title, muscles, text, image, onAddToWorkout }: WorkoutCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxLength, setMaxLength] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= breakpoints.lg) {
        setMaxLength(350);
      } else if (width >= breakpoints.md) {
        setMaxLength(150);
      } else if (width >= breakpoints.sm) {
        setMaxLength(100);
      } else {
        setMaxLength(80);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldTruncate = text.length > maxLength && !isExpanded;
  const displayText = shouldTruncate ? text.slice(0, maxLength) : text;

  const handleAddClick = () => {
    if (onAddToWorkout) {
      onAddToWorkout();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        {image && (
          <div className={styles.imageWrapper}>
            <Image src={image} alt={title} width={200} height={200} className={styles.image} />
          </div>
        )}
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.muscles}>{muscles}</div>
          <p className={styles.text}>
            {displayText}
            {text.length > maxLength && (
              <button className={styles.moreButton} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? " Show less" : "...Show more"}
              </button>
            )}
          </p>
        </div>
      </div>
      <div className={styles.addButtonContainer}>
        <button className={styles.addButton} onClick={handleAddClick}>
          <span>Add to your workout</span>
          <Image src={plusIcon} alt="Add" width={30} height={30} className={styles.plusIcon} />
        </button>
      </div>
    </div>
  );
}
