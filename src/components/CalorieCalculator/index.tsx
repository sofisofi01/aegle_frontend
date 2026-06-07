'use client'

import { useState } from 'react';
import styles from './CalorieCalculator.module.scss';
import Image from 'next/image';
import arrow from './image.png';

export function CalorieCalculator() {

    const [gender, setGender] = useState('женщина');
    
    // Состояния для дропдаунов
    const [selectedGoal, setSelectedGoal] = useState('набрать вес');
    const [isGoalDropdownOpen, setIsGoalDropdownOpen] = useState(false);
    
    const [selectedActivity, setSelectedActivity] = useState('низкая');
    const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);

    // Варианты для дропдаунов
    const goalOptions = ['снизить вес', 'поддерживать вес', 'набрать вес'];
    const activityOptions = ['очень низкая', 'низкая', 'средняя', 'высокая'];

    const handleSelectGoal = (goal: string) => {
        setSelectedGoal(goal);
        setIsGoalDropdownOpen(false);
    };

    const handleSelectActivity = (activity: string) => {
        setSelectedActivity(activity);
        setIsActivityDropdownOpen(false);
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
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={(e) => setGender(e.target.value)}
                                    className={styles.radioInput}
                                />
                                <label htmlFor="female" className={styles.radioLabel}>женщина</label>

                                <input 
                                type="radio" 
                                id="male" 
                                name="gender" 
                                value="male"
                                checked={gender === 'male'}
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
                            required
                        />
                    </div>
                    <div className={styles.weightContainer}>
                            <h2>вес(kg)</h2>
                            <input
                                type="text"
                                placeholder="0"
                                className={styles.input}
                                required
                            />
                    </div>
                    <div className={styles.heightContainer}>
                            <h2>рост(см)</h2>
                            <input
                                type="text"
                                placeholder="0"
                                className={styles.input}
                                required
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
                                            key={activity}
                                            className={`${styles.dropdownItem} ${selectedActivity === activity ? styles.active : ''}`}
                                            onClick={() => handleSelectActivity(activity)}
                                        >
                                            {activity}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <button className={styles.calculateButton}>рассчитать</button>
            </div>
        </div>
    )
}