"use client";

import { useState, useRef, useEffect } from "react";
import styles from "../RecipesFilterSidebar/RecipesFilterSidebar.module.scss";
import { CaloriesSliderProps } from "./types";

export function CaloriesSlider({
  onRangeChange,
  minValue = 0,
  maxValue = 900,
}: CaloriesSliderProps) {
  const MIN_LIMIT = 0;
  const MAX_LIMIT = 900;

  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [minNumber, setMinNumber] = useState(minValue);
  const [maxNumber, setMaxNumber] = useState(maxValue);
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);

  const numberToPercent = (value: number): number => {
    return ((value - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100;
  };

  const percentToNumber = (percent: number): number => {
    return MIN_LIMIT + (percent / 100) * (MAX_LIMIT - MIN_LIMIT);
  };

  const updateByClientX = (clientX: number) => {
    if (!sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    let percent = ((clientX - sliderRect.left) / sliderRect.width) * 100;
    percent = Math.max(0, Math.min(percent, 100));

    const newNumber = Math.round(percentToNumber(percent));

    if (isDraggingMin) {
      const newMin = Math.min(newNumber, maxNumber - 1);
      setMinNumber(newMin);
      onRangeChange?.(newMin, maxNumber);
    }

    if (isDraggingMax) {
      const newMax = Math.max(newNumber, minNumber + 1);
      setMaxNumber(newMax);
      onRangeChange?.(minNumber, newMax);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingMin || isDraggingMax) {
        updateByClientX(e.clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingMin(false);
      setIsDraggingMax(false);
    };

    if (isDraggingMin || isDraggingMax) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingMin, isDraggingMax, maxNumber, minNumber]);

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    let percent = ((e.clientX - sliderRect.left) / sliderRect.width) * 100;
    percent = Math.max(0, Math.min(percent, 100));

    const clickedNumber = Math.round(percentToNumber(percent));
    const distToMin = Math.abs(clickedNumber - minNumber);
    const distToMax = Math.abs(clickedNumber - maxNumber);

    if (distToMin < distToMax) {
      const newMin = Math.min(clickedNumber, maxNumber - 1);
      setMinNumber(newMin);
      onRangeChange?.(newMin, maxNumber);
    } else {
      const newMax = Math.max(clickedNumber, minNumber + 1);
      setMaxNumber(newMax);
      onRangeChange?.(minNumber, newMax);
    }
  };

  const minPercent = numberToPercent(minNumber);
  const maxPercent = numberToPercent(maxNumber);

  return (
    <div className={styles.filterGroup}>
      <h3>Калории</h3>
      <div className={styles.sliderContainer}>
        <div ref={sliderRef} className={styles.sliderTrack} onClick={handleSliderClick}>
          <div
            className={styles.sliderRange}
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
          <div
            className={styles.sliderHandle}
            style={{ left: `${minPercent}%` }}
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDraggingMin(true);
            }}
          />
          <div
            className={styles.sliderHandle}
            style={{ left: `${maxPercent}%` }}
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDraggingMax(true);
            }}
          />
        </div>
        <div className={styles.sliderValues}>
          <span>{minNumber} ккал</span>
          <span>{maxNumber} ккал</span>
        </div>
      </div>
    </div>
  );
}
