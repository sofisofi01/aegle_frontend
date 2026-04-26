'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './nutrition.module.scss';
import { Page } from '@/containers/Page';
import { CalorieCalculator } from '@/components/CalorieCalculator';
import { NutritionCard } from '@/components/NutritionCard';
import { NutritionEmptyCard } from '@/components/NutritionEmptyCard';
import { NutritionTotalCard } from '@/components/NutritionTotalCard';
import { NutritionTableCard } from '@/components/NutritionTableCard'; 
import { cardData as initialCardData } from './const';
import { tableCardData } from './const';

import mondayImg from './assets/mon.png';
import tuesdayImg from './assets/tue.png';
import wednesdayImg from './assets/wed.png';
import thursdayImg from './assets/thur.png';
import fridayImg from './assets/fri.png';
import saturdayImg from './assets/sat.png';
import sundayImg from './assets/sun.png';

const daysOfWeek = [
    { name: 'Monday', image: mondayImg },
    { name: 'Tuesday', image: tuesdayImg },
    { name: 'Wednesday', image: wednesdayImg },
    { name: 'Thursday', image: thursdayImg },
    { name: 'Friday', image: fridayImg },
    { name: 'Saturday', image: saturdayImg },
    { name: 'Sunday', image: sundayImg }
];

const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Total'];

export function NutritionPage() {
    const [cardData, setCardData] = useState(initialCardData);
    const [tableCardDataState, setTableCardDataState] = useState(tableCardData);
    
    const [tableData, setTableData] = useState(() => {
        const initialData: any = {};
        daysOfWeek.forEach(day => {
            initialData[day.name] = {};
            mealTypes.forEach(meal => {
                initialData[day.name][meal] = null;
            });
        });
        return initialData;
    });

    const handleAddMeal = (day: string, meal: string) => {
        console.log(`Add meal to ${day} - ${meal}`);
    };

    const handleDeleteTableCard = (id: number) => {
        setTableCardDataState(tableCardDataState.filter(item => item.id !== id));
    };

    const getTableCardForDayAndMeal = (day: string, meal: string) => {
        return tableCardDataState.find(item => item.day === day && item.mealType === meal);
    };

    return (
        <Page>
            <div className={styles.page}>
                <div className={styles.upperContainer}>
                    <div className={styles.cardsTitle}>
                        <h1 className={styles.title}>Your meals today are...</h1>
                        <div className={styles.cardContainer}>
                            {cardData.map((item) => (
                                <NutritionCard
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    calories={item.calories}
                                    proteins={item.proteins}
                                    carbs={item.carbs}
                                    fats={item.fats}
                                    image={item.image}
                                    onDelete={() => {
                                        setCardData(cardData.filter(data => data.id !== item.id));
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={styles.calorieCalculatorContainer}>
                        <CalorieCalculator />
                    </div>
                </div>
                
                {/* Таблица-календарь */}
                <div className={styles.calendarContainer}>
                    <div className={styles.nutritionTable}>
                        {/* Угловая ячейка */}
                        <div className={styles.cornerCell}></div>
                        
                        {/* Заголовки приёмов пищи */}
                        {mealTypes.map(meal => (
                            <div key={meal} className={styles.headerCell}>
                                {meal}
                            </div>
                        ))}
                        
                        {/* Дни недели и ячейки */}
                        {daysOfWeek.map(day => (
                            <React.Fragment key={day.name}>
                                <div className={styles.dayCell}>
                                    <Image 
                                        src={day.image} 
                                        alt={day.name}
                                        className={styles.dayImage}
                                    />
                                </div>
                                
                                {mealTypes.map(meal => {
                                    const tableCard = getTableCardForDayAndMeal(day.name, meal);
                                    
                                    return (
                                        <div 
                                            key={`${day.name}-${meal}`} 
                                            className={`${styles.cell} ${meal === 'Total' ? styles.totalCell : ''}`}
                                        >
                                            {meal === 'Total' ? (
                                                <NutritionTotalCard />
                                            ) : tableCard ? (
                                                <NutritionTableCard 
                                                    id={tableCard.id}
                                                    title={tableCard.title}
                                                    calories={tableCard.calories}
                                                    proteins={tableCard.proteins}
                                                    carbs={tableCard.carbs}
                                                    fats={tableCard.fats}
                                                    image={tableCard.image}
                                                    onDelete={handleDeleteTableCard}
                                                />
                                            ) : (
                                                <NutritionEmptyCard day={day.name} mealType={meal} />
                                            )}
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </Page>
    )
}