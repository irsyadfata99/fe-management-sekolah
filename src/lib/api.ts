// ===== 3. FIXED: src/lib/api.ts =====
import axios, { AxiosError, AxiosResponse } from "axios";
import { getToken, removeToken } from "./auth";

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000"),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Debug logging in development
  if (process.env.NEXT_PUBLIC_DEBUG_API === "true") {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
  }

  return config;
});

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful responses in development
    if (process.env.NEXT_PUBLIC_DEBUG_API === "true") {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized - HANYA redirect untuk protected routes
    if (error.response?.status === 401) {
      const url = error.config?.url || "";

      // Whitelist: Routes yang TIDAK boleh redirect
      const publicEndpoints = [
        "/public/",
        "/api/calendar/public",
        "/api/articles/public",
        "/api/auth/login", // Login endpoint juga jangan redirect
      ];

      // Cek apakah ini public endpoint
      const isPublicEndpoint = publicEndpoints.some((endpoint) => url.includes(endpoint));

      // HANYA redirect jika BUKAN public endpoint
      if (!isPublicEndpoint) {
        removeToken();
        window.location.href = "/login";
      }
    }

    // Log errors in development
    if (process.env.NEXT_PUBLIC_DEBUG_API === "true") {
      console.error(`❌ API Error: ${error.response?.status} ${error.config?.url}`);
      console.error("Error details:", error.response?.data);
    }

    return Promise.reject(error);
  }
);

export default api;

// Export typed API response interfaces
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total_pages: number;
    total_records: number;
    has_next: boolean;
    has_prev: boolean;
  };
}
