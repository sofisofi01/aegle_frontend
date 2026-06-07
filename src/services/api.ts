import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

// Use public env var if provided (set NEXT_PUBLIC_API_URL in .env.local),
// otherwise fallback to relative `/api` for proxy setups.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

if (typeof window !== "undefined") {
  try {
    // eslint-disable-next-line no-console
    console.log("API base URL:", API_URL);
    if (API_URL === "/api" && window.location.port === "3000") {
      // eslint-disable-next-line no-console
      console.warn(
        "Dev warning: frontend is running on port 3000 and API base is '/api' -> requests will hit the Next dev server and return 404.\n" +
          "Either set NEXT_PUBLIC_API_URL to your backend (e.g. http://localhost:3000) and restart, or run the frontend on a different port (e.g. 3001)."
      );
    }
  } catch (e) {
    // ignore
  }
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("401 error detected, attempting refresh...");
      originalRequest._retry = true;
      const refreshToken = useAuthStore.getState().refreshToken;
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}/users/token/refresh/`, {
            refresh: refreshToken,
          });
          const { access } = response.data;
          console.log("Token refreshed successfully");
          useAuthStore.getState().setAccessToken(access);
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token failed", refreshError);
          useAuthStore.getState().logout();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        console.warn("No refresh token available");
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
