"use client";

import styles from "./WorkoutFilterSidebar.module.scss";
import { WorkoutFilterSidebarProps } from "./types";

export function WorkoutFilterSidebar({
  isOpen,
  selectedMuscles = [],
  selectedEquipment = [],
  onClose,
  onMuscleToggle,
  onEquipmentToggle,
  onResetFilters,
}: WorkoutFilterSidebarProps) {
  const muscles = [
    "Дельтовидные",
    "Пресс",
    "Грудные",
    "Ноги",
    "Мышцы спины",
    "Руки",
    "Трапеции",
    "Кардио",
    "Разминка",
  ];
  const equipment = [
    "Гантели",
    "Гиря",
    "Скакалка",
    "Эспандер",
    "Коврик",
    "Утяжелители",
    "Штанга",
    "Турник",
  ];

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`} onClick={onClose} />

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.content}>
          <button className={styles.resetButton} onClick={onResetFilters}>
            Сбросить фильтры
          </button>
          <div className={styles.filterGroup}>
            <h3>Мышцы</h3>
            <div className={styles.options}>
              {muscles.map((m) => (
                <div
                  key={m}
                  className={`${styles.option} ${
                    selectedMuscles.includes(m.toLowerCase()) ? styles.active : ""
                  }`}
                  onClick={() => onMuscleToggle(m.toLowerCase())}
                >
                  {m}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3>Снаряжение</h3>
            <div className={styles.options}>
              {equipment.map((e) => (
                <div
                  key={e}
                  className={`${styles.option} ${
                    selectedEquipment.includes(e.toLowerCase()) ? styles.active : ""
                  }`}
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