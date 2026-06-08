'use client'

import { useState } from 'react';
import styles from './CalorieCalculator.module.scss';
import Image from 'next/image';
import arrow from './image.png';

export function CalorieCalculator() {
    const [gender, setGender] = useState('женщина');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    
    // Состояния для дропдаунов
    const [selectedGoal, setSelectedGoal] = useState('поддерживать вес');
    const [isGoalDropdownOpen, setIsGoalDropdownOpen] = useState(false);
    
    const [selectedActivity, setSelectedActivity] = useState('низкая');
    const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);

    // Результат
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState('');

    // Варианты для дропдаунов
    const goalOptions = ['снизить вес', 'поддерживать вес', 'набрать вес'];
    const activityOptions = [
        { label: 'очень низкая', value: 1.2 },
        { label: 'низкая', value: 1.375 },
        { label: 'средняя', value: 1.55 },
        { label: 'высокая', value: 1.725 }
    ];

    const handleSelectGoal = (goal: string) => {
        setSelectedGoal(goal);
        setIsGoalDropdownOpen(false);
    };

    const handleSelectActivity = (activity: string) => {
        setSelectedActivity(activity);
        setIsActivityDropdownOpen(false);
    };

    const calculateCalories = () => {
        // Проверка заполнения полей
        if (!age || !weight || !height) {
            setError('Заполните все поля');
            setResult(null);
            return;
        }

        const ageNum = parseInt(age);
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height);

        if (isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum)) {
            setError('Введите корректные числа');
            setResult(null);
            return;
        }

        setError('');

        // Формула Миффлина-Сан Жеора
        let bmr: number;
        if (gender === 'мужчина') {
            bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
        } else {
            bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
        }

        // Коэффициент активности
        const activityCoefficient = activityOptions.find(a => a.label === selectedActivity)?.value || 1.2;
        const tdee = bmr * activityCoefficient;

        // Корректировка по цели
        let finalCalories = tdee;
        if (selectedGoal === 'снизить вес') {
            finalCalories = tdee - 500; // Дефицит 500 ккал
        } else if (selectedGoal === 'набрать вес') {
            finalCalories = tdee + 500; // Профицит 500 ккал
        }

        setResult(Math.round(finalCalories));
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Калькулятор калорий</h1>
                <div className={styles.firstRow}>
                    <div className={styles.sexContainer}>
                        <h2>пол</h2>
                        <div className={styles.radioGroup}>
                            <input 
                                type="radio" 
                                id="female" 
                                name="gender" 
                                value="женщина"
                                checked={gender === 'женщина'}
                                onChange={(e) => setGender(e.target.value)}
                                className={styles.radioInput}
                            />
                            <label htmlFor="female" className={styles.radioLabel}>женщина</label>

                            <input 
                                type="radio" 
                                id="male" 
                                name="gender" 
                                value="мужчина"
                                checked={gender === 'мужчина'}
                                onChange={(e) => setGender(e.target.value)}
                                className={styles.radioInput}
                            />
                            <label htmlFor="male" className={styles.radioLabel}>мужчина</label>
                        </div>
                    </div>
                    <div className={styles.ageContainer}>
                        <h2>возраст</h2>
                        <input
                            type="text"
                            placeholder="0"
                            className={styles.input}
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className={styles.weightContainer}>
                        <h2>вес (кг)</h2>
                        <input
                            type="text"
                            placeholder="0"
                            className={styles.input}
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                    <div className={styles.heightContainer}>
                        <h2>рост (см)</h2>
                        <input
                            type="text"
                            placeholder="0"
                            className={styles.input}
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.secondRow}>
                    <div className={styles.goalContainer}>
                        <h2>цель</h2>
                        <div className={styles.dropdownContainer}>
                            <button
                                type="button"
                                className={styles.dropdownButton}
                                onClick={() => setIsGoalDropdownOpen(!isGoalDropdownOpen)}
                            >
                                {selectedGoal}
                                <Image
                                    src={arrow}
                                    alt="arrow"
                                    width={15}
                                    height={7}
                                />
                            </button>
                            {isGoalDropdownOpen && (
                                <div className={styles.dropdownMenu}>
                                    {goalOptions.map((goal) => (
                                        <div
                                            key={goal}
                                            className={`${styles.dropdownItem} ${selectedGoal === goal ? styles.active : ''}`}
                                            onClick={() => handleSelectGoal(goal)}
                                        >
                                            {goal}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.activitylevelContainer}>
                        <h2>активность</h2>
                        <div className={styles.dropdownContainer}>
                            <button
                                type="button"
                                className={styles.dropdownButton}
                                onClick={() => setIsActivityDropdownOpen(!isActivityDropdownOpen)}
                            >
                                {selectedActivity}
                                <Image
                                    src={arrow}
                                    alt="arrow"
                                    width={15}
                                    height={7}
                                />
                            </button>
                            {isActivityDropdownOpen && (
                                <div className={styles.dropdownMenu}>
                                    {activityOptions.map((activity) => (
                                        <div
                                            key={activity.label}
                                            className={`${styles.dropdownItem} ${selectedActivity === activity.label ? styles.active : ''}`}
                                            onClick={() => handleSelectActivity(activity.label)}
                                        >
                                            {activity.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <button className={styles.calculateButton} onClick={calculateCalories}>
                    рассчитать
                </button>

                {error && <div className={styles.error}>{error}</div>}

                {result !== null && (
                    <div className={styles.result}>
                        <h2>Ваша дневная норма:</h2>
                        <div className={styles.caloriesNumber}>{result} ккал</div>
                        <p>
                            {selectedGoal === 'снизить вес' && 'С дефицитом 500 ккал для похудения'}
                            {selectedGoal === 'поддерживать вес' && 'Для поддержания текущего веса'}
                            {selectedGoal === 'набрать вес' && 'С профицитом 500 ккал для набора массы'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}