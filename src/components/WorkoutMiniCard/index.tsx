import styles from "./WorkoutMiniCard.module.scss";
import { useState } from "react";
import Image from "next/image";
import { WorkoutMiniCardProps } from "./types";
import doneIcon from "@/landings/workout/assets/doneIcon.png";
import nodoneIcon from "@/landings/workout/assets/nodoneIcon.svg";

export function WorkoutMiniCard({
  id,
  title,
  sets,
  image,
  isCompleted: initialIsCompleted,
  onDelete,
  onUpdateSets,
  onToggleComplete,
}: WorkoutMiniCardProps) {
  const [showDone, setShowDone] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSets, setEditedSets] = useState(sets);

  const handleComplete = () => {
    if (onToggleComplete) {
      onToggleComplete(id);
    }

    if (!initialIsCompleted) {
      setShowDone(true);
      setTimeout(() => {
        setShowDone(false);
      }, 1500);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleSetsClick = () => {
    setIsEditing(true);
  };

  const handleSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 8) {
      setEditedSets(value);
    }
  };

  const handleSetsBlur = () => {
    setIsEditing(false);

    if (editedSets.trim() !== "") {
      if (editedSets !== sets && onUpdateSets) {
        onUpdateSets(id, editedSets);
      }
    } else {
      setEditedSets(sets);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSetsBlur();
    }
  };

  return (
    <div className={styles.card}>
      {image && (
        <div className={styles.imageWrapper}>
          <Image src={image} alt={title} className={styles.image} />
          {showDone && <div className={styles.donePopup}>Done!</div>}
          <div className={styles.buttonGroup}>
            <button className={styles.doneButton} onClick={handleComplete}>
              <Image
                src={initialIsCompleted ? doneIcon : nodoneIcon}
                alt={initialIsCompleted ? "done" : "no done"}
                width={20}
                height={20}
                className={styles.doneIcon}
              />
            </button>
            <button className={styles.deleteButton} onClick={handleDelete}>
              <span>—</span>
            </button>
          </div>
        </div>
      )}
      <div className={styles.bottom}>
        <div className={styles.title}>{title}</div>
        <div className={styles.sets}>
          {isEditing ? (
            <input
              type="text"
              value={editedSets}
              onChange={handleSetsChange}
              onBlur={handleSetsBlur}
              onKeyPress={handleKeyPress}
              className={styles.setsInput}
              autoFocus
            />
          ) : (
            <span onClick={handleSetsClick} className={styles.setsText}>
              {editedSets}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
