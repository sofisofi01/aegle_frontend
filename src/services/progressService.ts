import api from "./api";

export interface WeightEntry {
  id?: number;
  weight: number;
  date: string;
  notes?: string;
  created_at?: string;
}

export interface GoalProgress {
  id: number;
  start_weight: number;
  target_weight: number;
  start_date: string;
  target_date: string;
  is_active: boolean;
  progress_percentage: number;
  estimated_completion: string | null;
  created_at: string;
}

export interface CalorieEntry {
  date: string;
  calories: number;
}

export interface CalorieAdherence {
  date: string;
  adherence: number;
}

export interface AnalyticsData {
  weight_data: { date: string; weight: number }[];
  calories_data: CalorieEntry[];
  calorie_adherence: CalorieAdherence[];
  target_weight: number | null;
  daily_calorie_goal: number | null;
  weight_change: number | null;
  avg_daily_calories: number;
  goal_progress: {
    progress_percentage: number;
    estimated_completion: string | null;
    target_weight: number;
    start_weight: number;
  } | null;
}

export const progressService = {
  getWeightEntries: async (startDate?: string, endDate?: string) => {
    const response = await api.get<WeightEntry[]>("/progress/weight/", {
      params: { start_date: startDate, end_date: endDate },
    });
    return response.data;
  },

  addWeightEntry: async (data: WeightEntry) => {
    const response = await api.post<WeightEntry>("/progress/weight/", data);
    return response.data;
  },

  getAnalytics: async (days: number = 30) => {
    const response = await api.get<AnalyticsData>("/progress/analytics/", {
      params: { days },
    });
    return response.data;
  },

  getGoals: async () => {
    const response = await api.get<GoalProgress[]>("/progress/goals/");
    return response.data;
  },

  createGoal: async (data: Partial<GoalProgress>) => {
    const response = await api.post<GoalProgress>("/progress/goals/", data);
    return response.data;
  },
};
