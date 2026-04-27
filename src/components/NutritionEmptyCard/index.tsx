"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import plusIcon from "@/landings/nutrition/assets/plusIcon.svg";
import styles from "./NutritionEmptyCard.module.scss";

export function NutritionEmptyCard() {
  const router = useRouter();

  const handleAddClick = () => {
    router.push(`/recipes?day=\${day}&mealType=\${mealType}`);
  };

  return (
    <div className={styles.card}>
      <button className={styles.addButton} onClick={handleAddClick}>
        <Image src={plusIcon} alt="plusIcon" className={styles.plusIcon} />
        <p>add</p>
      </button>
    </div>
  );
}
