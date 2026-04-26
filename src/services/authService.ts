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
  gender?: string;
  birth_date?: string;
  activity_level?: number;
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

  async getMe() {
    const response = await api.get("/users/me/");
    return response.data;
  },

  async updateProfile(data: FormData | Record<string, unknown>) {
    const isFormData = data instanceof FormData;
    const response = await api.patch("/users/me/", data, {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    });
    return response.data;
  },
};
