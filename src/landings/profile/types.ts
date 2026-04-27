import { StaticImageData } from "next/image";

export type ProfileInfo = {
  name: string;
  memberSince: string;
  level: string;
  strikeDays: number;
  avatar: string | StaticImageData;
  email: string;
  sex: string;
  age: number;
  height: number;
  weight: number;
};

export type Meal = {
  id: string;
  name: string;
  image: StaticImageData;
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
};

export type DayMeals = {
  day: string;
  meals: Meal[];
};

export type Workout = {
  id: string;
  name: string;
  duration: number;
  type: string;
  calories: number;
};

export type DayWorkouts = {
  day: string;
  workouts: Workout[];
};
