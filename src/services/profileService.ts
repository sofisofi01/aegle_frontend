import api from "./api";

export interface BackendUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface BackendProfile {
  id: number;
  gender: string;
  age: number;
  height: number;
  current_weight: number;
  target_weight: number;
  activity_level: string;
  goal: string;
  daily_calories: number;
  created_at: string;
  updated_at: string;
}

export const profileService = {
  getUser: async (): Promise<BackendUser> => {
    const response = await api.get("/users/me/");
    return response.data;
  },

  updateUser: async (data: Partial<BackendUser>): Promise<BackendUser> => {
    const response = await api.patch("/users/me/", data);
    return response.data;
  },

  getProfile: async (): Promise<BackendProfile> => {
    const response = await api.get("/profiles/me/");
    return response.data;
  },

  updateProfile: async (data: Partial<BackendProfile>): Promise<BackendProfile> => {
    const response = await api.patch("/profiles/me/", data);
    return response.data;
  },
};
