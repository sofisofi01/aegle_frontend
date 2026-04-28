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
  ingredients?: string;
  recipe?: string;
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

export interface FoodSearchResult {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image_url?: string;
  meal_type?: string;
  ingredients?: string;
  recipe?: string;
  cooking_time?: number;
  serving_size?: string;
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
    ingredients?: string;
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

  createFoodItem: async (
    data: Partial<FoodSearchResult> & {
      meal_type?: string;
      ingredients?: string;
      recipe?: string;
      cooking_time?: number;
    }
  ) => {
    const response = await api.post("/food-diary/food-items/", data);
    return response.data;
  },

  searchFood: async (query: string): Promise<FoodSearchResult[]> => {
    const response = await api.get(`/food-diary/search/?q=${query}`);
    return response.data;
  },

  getUserFoodItems: async (): Promise<FoodSearchResult[]> => {
    const response = await api.get("/food-diary/user-food-items/");
    return response.data;
  },
};

export interface FoodSearchResult {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  external_id: string;
  image_url?: string;
}
