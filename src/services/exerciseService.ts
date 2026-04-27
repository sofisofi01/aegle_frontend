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

export const exerciseService = {
  getExercises: async (): Promise<Exercise[]> => {
    const response = await api.get("/exercises/");
    return response.data;
  },
};
