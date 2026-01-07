import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:3000/api/auth";
// const API_BASE_URL = "https://auth-setu-server.vercel.app/api/auth";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ⭐ this is the key
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth API functions
export const authApi = {
  register: async (name: string, email: string, password: string) => {
    return await api.post("/register", { name, email, password });
  },

  login: async (email: string, password: string) => {
    return await api.post("/login", { email, password });
  },

  logout: async () => {
    return await api.post("/logout");
  },

  getMe: async () => {
    return await api.get("/me");
  },

  deleteAccount: async () => {
    return await api.delete("/delete");
  },

  verifyEmail: async (code: string) => {
    return await api.post("/verify-email", { code });
  },

  forgotPassword: async (email: string, clientUrl: string) => {
    return await api.post("/forgot-password", { email, clientUrl });
  },

  resetPassword: async (token: string, password: string) => {
    return await api.post("/reset-password", { token, password });
  },
};

export default api;
