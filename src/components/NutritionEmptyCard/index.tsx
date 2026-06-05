"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import plusIcon from "@/landings/nutrition/assets/plusIcon.svg";
import styles from "./NutritionEmptyCard.module.scss";
import { NutritionEmptyCardProps } from "./types";

export function NutritionEmptyCard({ day, mealType }: NutritionEmptyCardProps) {
  const router = useRouter();

  const handleAddClick = () => {
    router.push(`/recipes?day=${day}&mealType=${mealType}`);
  };

  return (
    <div className={styles.card}>
      <button className={styles.addButton} onClick={handleAddClick}>
        <Image src={plusIcon} alt="plusIcon" className={styles.plusIcon} />
        <p>добавить</p>
      </button>
    </div>
  );
}
