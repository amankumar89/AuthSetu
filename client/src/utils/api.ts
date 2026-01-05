import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/auth";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("authToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Add request/response interceptors if needed
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - token might be expired
      // You could trigger a logout or token refresh here
    }
    return Promise.reject(error);
  }
);

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
    return await api.post(`/reset-password/${token}`, { password });
  },
};

export default api;
