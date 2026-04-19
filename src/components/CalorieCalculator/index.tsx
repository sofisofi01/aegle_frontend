'use client'

import { useState } from 'react';
import styles from './CalorieCalculator.module.scss';
import Image from 'next/image';
import arrow from './image.png';

export function CalorieCalculator() {

    const [gender, setGender] = useState('female');
    
    // Состояния для дропдаунов
    const [selectedGoal, setSelectedGoal] = useState('to gain weight');
    const [isGoalDropdownOpen, setIsGoalDropdownOpen] = useState(false);
    
    const [selectedActivity, setSelectedActivity] = useState('low');
    const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);

    // Варианты для дропдаунов
    const goalOptions = ['lose weight', 'maintain weight', 'gain weight'];
    const activityOptions = ['sedentary', 'low', 'medium', 'high'];

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
                <h1>Calorie Calculator</h1>
                <div className={styles.firstRow}>
                    <div className={styles.sexContainer}>
                        <h2>sex</h2>
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
                                <label htmlFor="female" className={styles.radioLabel}>female</label>

                                <input 
                                type="radio" 
                                id="male" 
                                name="gender" 
                                value="male"
                                checked={gender === 'male'}
                                onChange={(e) => setGender(e.target.value)}
                                className={styles.radioInput}
                                />
                                <label htmlFor="male" className={styles.radioLabel}>male</label>
                            </div>
                    </div>
                    <div className={styles.ageContainer}>
                        <h2>age</h2>
                        <input
                            type="text"
                            placeholder="0"
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.weightContainer}>
                            <h2>weight(kg)</h2>
                            <input
                                type="text"
                                placeholder="0"
                                className={styles.input}
                                required
                            />
                    </div>
                    <div className={styles.heightContainer}>
                            <h2>height(sm)</h2>
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
                        <h2>goal</h2>
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
                        <h2>activity level</h2>
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
                <button className={styles.calculateButton}>calculate</button>
            </div>
        </div>
    )
}