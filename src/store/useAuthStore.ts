import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  height?: number;
  weight?: number;
  gender?: string;
  age?: number;
  birth_date?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, access: string, refresh: string) => void;
  setAccessToken: (access: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      setAuth: (user, access, refresh) =>
        set({
          user,
          accessToken: access,
          refreshToken: refresh,
          isAuthenticated: true,
        }),
      setAccessToken: (access) => set({ accessToken: access }),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
