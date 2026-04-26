'use client';

import { useState } from 'react';
import styles from '../RecipesFilterSidebar/RecipesFilterSidebar.module.scss'; 
import { MacroSliderProps } from './types';

export function MacroSlider({ 
    title, 
    onRangeChange,
    minValue = 0,
    maxValue = 100,
    unit = 'g'
}: MacroSliderProps) {
    const MIN_LIMIT = 0;
    const MAX_LIMIT = maxValue;
    
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
    
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDraggingMin && !isDraggingMax) return;
        
        const sliderRect = e.currentTarget.getBoundingClientRect();
        let percent = ((e.clientX - sliderRect.left) / sliderRect.width) * 100;
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
    
    const handleMouseUp = () => {
        setIsDraggingMin(false);
        setIsDraggingMax(false);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove as any);
    };
    
    const handleMouseDownMin = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDraggingMin(true);
        document.addEventListener('mousemove', handleMouseMove as any);
        document.addEventListener('mouseup', handleMouseUp);
    };
    
    const handleMouseDownMax = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDraggingMax(true);
        document.addEventListener('mousemove', handleMouseMove as any);
        document.addEventListener('mouseup', handleMouseUp);
    };
    
    const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const sliderRect = e.currentTarget.getBoundingClientRect();
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
        <div className={styles.macroSliderGroup}>
            <h4 className={styles.macroTitle}>{title}</h4>
            <div className={styles.sliderContainer}>
                <div 
                    className={styles.sliderTrack}
                    onClick={handleSliderClick}
                    onMouseMove={handleMouseMove}
                >
                    <div 
                        className={styles.sliderRange}
                        style={{
                            left: `${minPercent}%`,
                            width: `${maxPercent - minPercent}%`
                        }}
                    />
                    <div 
                        className={styles.sliderHandle}
                        style={{ left: `${minPercent}%` }}
                        onMouseDown={handleMouseDownMin}
                    />
                    <div 
                        className={styles.sliderHandle}
                        style={{ left: `${maxPercent}%` }}
                        onMouseDown={handleMouseDownMax}
                    />
                </div>
                <div className={styles.sliderValues}>
                    <span>{minNumber}{unit}</span>
                    <span>{maxNumber}{unit}</span>
                </div>
            </div>
        </div>
    );
}