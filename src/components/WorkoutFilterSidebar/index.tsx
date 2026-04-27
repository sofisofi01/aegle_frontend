"use client";

import styles from "./WorkoutFilterSidebar.module.scss";
import { WorkoutFilterSidebarProps } from "./types";

export function WorkoutFilterSidebar({
  isOpen,
  onClose,
  selectedMuscles,
  selectedEquipment,
  onMuscleToggle,
  onEquipmentToggle,
}: WorkoutFilterSidebarProps) {
  const muscles = [
    "Deltoid",
    "Abs",
    "Chest",
    "Legs",
    "Back muscles",
    "Hands",
    "Trapezoid",
    "Cardio",
    "Warm",
  ];
  const equipment = [
    "Dumbbells",
    "Kettlebell",
    "Jump rope",
    "Resistance band",
    "Mat",
    "Weights",
    "Barbell",
    "Horizontal bar",
  ];

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`} onClick={onClose} />

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.content}>
          <div className={styles.filterGroup}>
            <h3>Muscles</h3>
            <div className={styles.options}>
              {muscles.map((m) => (
                <div
                  key={m}
                  className={`${styles.option} ${selectedMuscles.includes(m.toLowerCase()) ? styles.active : ""}`}
                  onClick={() => onMuscleToggle(m.toLowerCase())}
                >
                  {m}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3>Equipment</h3>
            <div className={styles.options}>
              {equipment.map((e) => (
                <div
                  key={e}
                  className={`${styles.option} ${selectedEquipment.includes(e.toLowerCase()) ? styles.active : ""}`}
                  onClick={() => onEquipmentToggle(e.toLowerCase())}
                >
                  {e}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
