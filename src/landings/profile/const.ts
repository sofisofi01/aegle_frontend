import avatarImg from "./assets/avatar.png";
import breakfastImg from "./assets/breakfast.png";

export const profileData = {
  avatar: avatarImg,
  name: "Chatik de Sad",
  memberSince: "October 2024",
  level: "Beginner",
  strikeDays: 7,
  email: "chatik.sad@example.com",
  sex: "male",
  age: 24,
  height: 168,
  weight: 58,
};

export const goalsData = {
  dailyCalories: 1800,
  workoutSessions: 15,
  workoutMinutes: 240,
  stepsPerDay: 8000,
};

export const mealsData = [
  {
    day: "Monday",
    macros: { calories: 1100, carbs: 150, protein: 40, fats: 20 },
    totalMeals: 3,
    meals: [
      { name: "Oatmeal with berries", image: breakfastImg, kcal: 320, carbs: 55, protein: 8, fat: 5 },
      { name: "Avocado toast", image: breakfastImg, kcal: 280, carbs: 30, protein: 6, fat: 12 },
      { name: "Protein shake", image: breakfastImg, kcal: 200, carbs: 10, protein: 20, fat: 5 },
    ],
  },
  {
    day: "Tuesday",
    macros: { calories: 1150, carbs: 140, protein: 45, fats: 18 },
    totalMeals: 3,
    meals: [
      { name: "Scrambled eggs", image: breakfastImg, kcal: 300, carbs: 5, protein: 20, fat: 22 },
      { name: "Chicken salad", image: breakfastImg, kcal: 350, carbs: 10, protein: 30, fat: 15 },
      { name: "Fruit smoothie", image: breakfastImg, kcal: 250, carbs: 50, protein: 5, fat: 2 },
    ],
  },
  {
    day: "Wednesday",
    macros: { calories: 1200, carbs: 160, protein: 50, fats: 25 },
    totalMeals: 4,
    meals: [
      { name: "Eggs & toast", image: breakfastImg, kcal: 350, carbs: 30, protein: 20, fat: 15 },
      { name: "Greek yogurt", image: breakfastImg, kcal: 200, carbs: 15, protein: 12, fat: 5 },
      { name: "Smoothie bowl", image: breakfastImg, kcal: 300, carbs: 50, protein: 8, fat: 6 },
      { name: "Grilled chicken", image: breakfastImg, kcal: 400, carbs: 5, protein: 40, fat: 20 },
    ],
  },
  {
    day: "Thursday",
    macros: { calories: 1000, carbs: 130, protein: 35, fats: 15 },
    totalMeals: 2,
    meals: [
      { name: "Pancakes", image: breakfastImg, kcal: 400, carbs: 60, protein: 8, fat: 10 },
      { name: "Fruit salad", image: breakfastImg, kcal: 200, carbs: 40, protein: 3, fat: 1 },
    ],
  },
  {
    day: "Friday",
    macros: { calories: 1250, carbs: 170, protein: 55, fats: 22 },
    totalMeals: 3,
    meals: [
      { name: "Smoothie", image: breakfastImg, kcal: 250, carbs: 45, protein: 5, fat: 2 },
      { name: "Tuna sandwich", image: breakfastImg, kcal: 350, carbs: 30, protein: 25, fat: 10 },
      { name: "Protein bar", image: breakfastImg, kcal: 200, carbs: 20, protein: 15, fat: 7 },
    ],
  },
  {
    day: "Saturday",
    macros: { calories: 1300, carbs: 180, protein: 60, fats: 25 },
    totalMeals: 4,
    meals: [
      { name: "Omelette", image: breakfastImg, kcal: 300, carbs: 5, protein: 20, fat: 22 },
      { name: "Salmon salad", image: breakfastImg, kcal: 400, carbs: 10, protein: 35, fat: 25 },
      { name: "Fruit bowl", image: breakfastImg, kcal: 200, carbs: 45, protein: 3, fat: 1 },
      { name: "Yogurt parfait", image: breakfastImg, kcal: 300, carbs: 40, protein: 10, fat: 8 },
    ],
  },
  {
    day: "Sunday",
    macros: { calories: 1100, carbs: 150, protein: 40, fats: 20 },
    totalMeals: 3,
    meals: [
      { name: "French toast", image: breakfastImg, kcal: 350, carbs: 50, protein: 10, fat: 12 },
      { name: "Smoothie", image: breakfastImg, kcal: 250, carbs: 45, protein: 5, fat: 2 },
      { name: "Chicken wrap", image: breakfastImg, kcal: 400, carbs: 35, protein: 30, fat: 15 },
    ],
  },
];

export const workoutsData = [
  {
    day: "Monday",
    stats: { totalWorkouts: 5, totalTime: "4h 15m", caloriesBurned: 1150, steps: 5000 },
    totalWorkouts: 3,
    workouts: [
      { name: "Bent Over Dumbbell Fly", image: breakfastImg, type: "Strength", duration: 25, calories: 280 },
      { name: "Chest Press", image: breakfastImg, type: "Strength", duration: 20, calories: 240 },
      { name: "Cardio Plus Endurance", image: breakfastImg, type: "Cardio", duration: 35, calories: 320 },
    ],
  },
  {
    day: "Tuesday",
    stats: { totalWorkouts: 4, totalTime: "3h 45m", caloriesBurned: 980, steps: 4500 },
    totalWorkouts: 3,
    workouts: [
      { name: "Leg Press", image: breakfastImg, type: "Strength", duration: 30, calories: 350 },
      { name: "Squats", image: breakfastImg, type: "Strength", duration: 25, calories: 300 },
      { name: "HIIT Training", image: breakfastImg, type: "Cardio", duration: 20, calories: 330 },
    ],
  },
  {
    day: "Wednesday",
    stats: { totalWorkouts: 6, totalTime: "5h", caloriesBurned: 1300, steps: 6200 },
    totalWorkouts: 4,
    workouts: [
      { name: "Pull Ups", image: breakfastImg, type: "Strength", duration: 20, calories: 280 },
      { name: "Rows", image: breakfastImg, type: "Strength", duration: 25, calories: 300 },
      { name: "Running", image: breakfastImg, type: "Cardio", duration: 40, calories: 480 },
      { name: "Core Work", image: breakfastImg, type: "Strength", duration: 15, calories: 180 },
    ],
  },
  {
    day: "Thursday",
    stats: { totalWorkouts: 3, totalTime: "2h 30m", caloriesBurned: 720, steps: 3800 },
    totalWorkouts: 2,
    workouts: [
      { name: "Shoulder Press", image: breakfastImg, type: "Strength", duration: 30, calories: 340 },
      { name: "Cycling", image: breakfastImg, type: "Cardio", duration: 35, calories: 380 },
    ],
  },
  {
    day: "Friday",
    stats: { totalWorkouts: 5, totalTime: "4h", caloriesBurned: 1100, steps: 5500 },
    totalWorkouts: 3,
    workouts: [
      { name: "Deadlifts", image: breakfastImg, type: "Strength", duration: 25, calories: 360 },
      { name: "Bench Press", image: breakfastImg, type: "Strength", duration: 20, calories: 280 },
      { name: "Jump Rope", image: breakfastImg, type: "Cardio", duration: 20, calories: 280 },
    ],
  },
  {
    day: "Saturday",
    stats: { totalWorkouts: 4, totalTime: "3h 20m", caloriesBurned: 950, steps: 4700 },
    totalWorkouts: 2,
    workouts: [
      { name: "Swimming", image: breakfastImg, type: "Cardio", duration: 60, calories: 600 },
      { name: "Yoga Flow", image: breakfastImg, type: "Flexibility", duration: 40, calories: 200 },
    ],
  },
  {
    day: "Sunday",
    stats: { totalWorkouts: 2, totalTime: "1h 30m", caloriesBurned: 450, steps: 3000 },
    totalWorkouts: 2,
    workouts: [
      { name: "Light Stretching", image: breakfastImg, type: "Flexibility", duration: 30, calories: 80 },
      { name: "Walking", image: breakfastImg, type: "Cardio", duration: 60, calories: 280 },
    ],
  },
];