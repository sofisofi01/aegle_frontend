import api from "./api";

export interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
  };
}

export interface RegisterData {
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  height?: number;
  weight?: number;
  target_weight?: number;
  gender?: "M" | "F";
  age?: number;
  activity_level?: number;
  goal?: string;
}

export const authService = {
  async login(credentials: { email: string; password?: string }) {
    const response = await api.post<LoginResponse>("/users/login/", credentials);
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post<LoginResponse>("/users/register/", data);
    return response.data;
  },
};
