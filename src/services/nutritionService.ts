import api from "./api";

export interface NutritionEntry {
  id: number;
  food_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal_type: "breakfast" | "lunch" | "dinner" | "snack";
  is_eaten: boolean;
  image_url?: string;
}

export interface NutritionDay {
  id: number;
  day_number: number;
  name: string;
  entries: NutritionEntry[];
}

export interface NutritionPlan {
  id: number;
  name: string;
  is_active: boolean;
  days: NutritionDay[];
}

export const nutritionService = {
  getActivePlan: async (): Promise<NutritionPlan> => {
    const response = await api.get("/food-diary/plans/active/");
    return response.data;
  },

  addFoodToPlan: async (data: {
    day_number: number;
    meal_type: string;
    food_name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    image_url?: string;
  }) => {
    const response = await api.post("/food-diary/plans/add_food/", data);
    return response.data;
  },

  updateNutritionEntry: async (id: number, data: Partial<NutritionEntry>) => {
    const response = await api.patch(`/food-diary/nutrition-entries/${id}/`, data);
    return response.data;
  },

  deleteNutritionEntry: async (id: number) => {
    await api.delete(`/food-diary/nutrition-entries/${id}/`);
  },
};
