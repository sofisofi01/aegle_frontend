import api from "./api";

export interface Exercise {
  id: number;
  name: string;
  description: string;
  target_muscles: string[];
  equipment: string[];
  calories_per_repetition: string;
  difficulty: string;
  image?: string;
  video_url?: string;
}

export interface WorkoutExercise {
  id: number;
  exercise: Exercise;
  sets: number;
  reps: number;
  weight?: number;
  rest_seconds: number;
  order: number;
  total_calories: number;
}

export interface WorkoutDay {
  id: number;
  day_number: number;
  name: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutPlan {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  days: WorkoutDay[];
}

export const exerciseService = {
  getExercises: async (): Promise<Exercise[]> => {
    const response = await api.get("/exercises/");
    return response.data;
  },

  getActivePlan: async (): Promise<WorkoutPlan> => {
    const response = await api.get("/exercises/plans/active/");
    return response.data;
  },

  addExerciseToPlan: async (
    dayNumber: number,
    exerciseId: number,
    data: { sets: number; reps: number }
  ) => {
    const response = await api.post(`/exercises/plans/add_exercise/`, {
      day_number: dayNumber,
      exercise_id: exerciseId,
      ...data,
    });
    return response.data;
  },

  removeExerciseFromPlan: async (workoutExerciseId: number) => {
    await api.delete(`/exercises/workout-exercises/${workoutExerciseId}/`);
  },
};
