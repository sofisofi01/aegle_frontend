import avatarImg from "./assets/avatar.png";
import breakfastImg from "./assets/breakfast.png";

export const profileData = {
  avatar: avatarImg,
  name: "Чатик де Сад",
  memberSince: "Октябрь 2024",
  level: "Начинающий",
  strikeDays: 7,
  email: "chatik.sad@example.com",
  sex: "муж.",
  age: 24,
  height: 168,
  weight: 58,
};

export const getYearWord = (age: number) => {
  const lastTwo = age % 100;
  const last = age % 10;

  if (lastTwo >= 11 && lastTwo <= 14) return "лет";
  if (last === 1) return "год";
  if (last >= 2 && last <= 4) return "года";
  return "лет";
};

export const goalsData = {
  dailyCalories: 1800,
  workoutSessions: 15,
  workoutMinutes: 240,
  stepsPerDay: 8000,
};

export const mealsData = [
  {
    day: "Понедельник",
    macros: { calories: 1100, carbs: 150, protein: 40, fats: 20 },
    totalMeals: 3,
    meals: [
      { name: "Овсянка с ягодами", image: breakfastImg, kcal: 320, carbs: 55, protein: 8, fat: 5 },
      { name: "Тост с авокадо", image: breakfastImg, kcal: 280, carbs: 30, protein: 6, fat: 12 },
      { name: "Протеиновый шейк", image: breakfastImg, kcal: 200, carbs: 10, protein: 20, fat: 5 },
    ],
  },
  {
    day: "Вторник",
    macros: { calories: 1150, carbs: 140, protein: 45, fats: 18 },
    totalMeals: 3,
    meals: [
      { name: "Яичница-болтунья", image: breakfastImg, kcal: 300, carbs: 5, protein: 20, fat: 22 },
      { name: "Куриный салат", image: breakfastImg, kcal: 350, carbs: 10, protein: 30, fat: 15 },
      { name: "Фруктовый смузи", image: breakfastImg, kcal: 250, carbs: 50, protein: 5, fat: 2 },
    ],
  },
  {
    day: "Среда",
    macros: { calories: 1200, carbs: 160, protein: 50, fats: 25 },
    totalMeals: 4,
    meals: [
      { name: "Яйца с тостом", image: breakfastImg, kcal: 350, carbs: 30, protein: 20, fat: 15 },
      { name: "Греческий йогурт", image: breakfastImg, kcal: 200, carbs: 15, protein: 12, fat: 5 },
      { name: "Смузи боул", image: breakfastImg, kcal: 300, carbs: 50, protein: 8, fat: 6 },
      { name: "Курица на гриле", image: breakfastImg, kcal: 400, carbs: 5, protein: 40, fat: 20 },
    ],
  },
  {
    day: "Четверг",
    macros: { calories: 1000, carbs: 130, protein: 35, fats: 15 },
    totalMeals: 2,
    meals: [
      { name: "Панкейки", image: breakfastImg, kcal: 400, carbs: 60, protein: 8, fat: 10 },
      { name: "Фруктовый салат", image: breakfastImg, kcal: 200, carbs: 40, protein: 3, fat: 1 },
    ],
  },
  {
    day: "Пятница",
    macros: { calories: 1250, carbs: 170, protein: 55, fats: 22 },
    totalMeals: 3,
    meals: [
      { name: "Смузи", image: breakfastImg, kcal: 250, carbs: 45, protein: 5, fat: 2 },
      { name: "Сэндвич с тунцом", image: breakfastImg, kcal: 350, carbs: 30, protein: 25, fat: 10 },
      { name: "Протеиновый батончик", image: breakfastImg, kcal: 200, carbs: 20, protein: 15, fat: 7 },
    ],
  },
  {
    day: "Суббота",
    macros: { calories: 1300, carbs: 180, protein: 60, fats: 25 },
    totalMeals: 4,
    meals: [
      { name: "Омлет", image: breakfastImg, kcal: 300, carbs: 5, protein: 20, fat: 22 },
      { name: "Салат с лососем", image: breakfastImg, kcal: 400, carbs: 10, protein: 35, fat: 25 },
      { name: "Фруктовая тарелка", image: breakfastImg, kcal: 200, carbs: 45, protein: 3, fat: 1 },
      { name: "Йогурт парфе", image: breakfastImg, kcal: 300, carbs: 40, protein: 10, fat: 8 },
    ],
  },
  {
    day: "Воскресенье",
    macros: { calories: 1100, carbs: 150, protein: 40, fats: 20 },
    totalMeals: 3,
    meals: [
      { name: "Французские тосты", image: breakfastImg, kcal: 350, carbs: 50, protein: 10, fat: 12 },
      { name: "Смузи", image: breakfastImg, kcal: 250, carbs: 45, protein: 5, fat: 2 },
      { name: "Куриный ролл", image: breakfastImg, kcal: 400, carbs: 35, protein: 30, fat: 15 },
    ],
  },
];

export const workoutsData = [
  {
    day: "Понедельник",
    stats: { totalWorkouts: 5, totalTime: "4ч 15м", caloriesBurned: 1150, steps: 5000 },
    totalWorkouts: 3,
    workouts: [
      { name: "Разводка гантелей в наклоне", image: breakfastImg, type: "Силовая", duration: 25, calories: 280 },
      { name: "Жим от груди", image: breakfastImg, type: "Силовая", duration: 20, calories: 240 },
      { name: "Кардио на выносливость", image: breakfastImg, type: "Кардио", duration: 35, calories: 320 },
    ],
  },
  {
    day: "Вторник",
    stats: { totalWorkouts: 4, totalTime: "3ч 45м", caloriesBurned: 980, steps: 4500 },
    totalWorkouts: 3,
    workouts: [
      { name: "Жим ногами", image: breakfastImg, type: "Силовая", duration: 30, calories: 350 },
      { name: "Приседания", image: breakfastImg, type: "Силовая", duration: 25, calories: 300 },
      { name: "HIIT тренировка", image: breakfastImg, type: "Кардио", duration: 20, calories: 330 },
    ],
  },
  {
    day: "Среда",
    stats: { totalWorkouts: 6, totalTime: "5ч", caloriesBurned: 1300, steps: 6200 },
    totalWorkouts: 4,
    workouts: [
      { name: "Подтягивания", image: breakfastImg, type: "Силовая", duration: 20, calories: 280 },
      { name: "Тяга в наклоне", image: breakfastImg, type: "Силовая", duration: 25, calories: 300 },
      { name: "Бег", image: breakfastImg, type: "Кардио", duration: 40, calories: 480 },
      { name: "Пресс", image: breakfastImg, type: "Силовая", duration: 15, calories: 180 },
    ],
  },
  {
    day: "Четверг",
    stats: { totalWorkouts: 3, totalTime: "2ч 30м", caloriesBurned: 720, steps: 3800 },
    totalWorkouts: 2,
    workouts: [
      { name: "Жим плечами", image: breakfastImg, type: "Силовая", duration: 30, calories: 340 },
      { name: "Велотренажёр", image: breakfastImg, type: "Кардио", duration: 35, calories: 380 },
    ],
  },
  {
    day: "Пятница",
    stats: { totalWorkouts: 5, totalTime: "4ч", caloriesBurned: 1100, steps: 5500 },
    totalWorkouts: 3,
    workouts: [
      { name: "Становая тяга", image: breakfastImg, type: "Силовая", duration: 25, calories: 360 },
      { name: "Жим лёжа", image: breakfastImg, type: "Силовая", duration: 20, calories: 280 },
      { name: "Скакалка", image: breakfastImg, type: "Кардио", duration: 20, calories: 280 },
    ],
  },
  {
    day: "Суббота",
    stats: { totalWorkouts: 4, totalTime: "3ч 20м", caloriesBurned: 950, steps: 4700 },
    totalWorkouts: 2,
    workouts: [
      { name: "Плавание", image: breakfastImg, type: "Кардио", duration: 60, calories: 600 },
      { name: "Йога", image: breakfastImg, type: "Гибкость", duration: 40, calories: 200 },
    ],
  },
  {
    day: "Воскресенье",
    stats: { totalWorkouts: 2, totalTime: "1ч 30м", caloriesBurned: 450, steps: 3000 },
    totalWorkouts: 2,
    workouts: [
      { name: "Лёгкая растяжка", image: breakfastImg, type: "Гибкость", duration: 30, calories: 80 },
      { name: "Ходьба", image: breakfastImg, type: "Кардио", duration: 60, calories: 280 },
    ],
  },
];