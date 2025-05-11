import axios from "axios";

// Fix the BASE_URL to not include /api/v1 as that will be in the API_PATHS
const BASE_URL = import.meta.env.VITE_API_BASE || "https://the-deployment.onrender.com";

console.log("🟡 API Base URL:", BASE_URL);

// Define routes that don't need authentication
const publicRoutes = [
  '/api/v1/auth/register',
  '/api/v1/auth/login'
];

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Increased to 30 seconds for Render's cold start
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 🔐 Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // For debugging - log the full URL being requested
    console.log(`🔄 Request to: ${config.baseURL}${config.url}`);

    // Don't add token for public routes
    if (publicRoutes.some(route => config.url?.includes(route))) {
      console.log("📢 Public route - no token needed");
      return config;
    }

    const accessToken = localStorage.getItem("token") || localStorage.getItem("authToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log("✅ Authorization set:", `Bearer ${accessToken.substring(0, 10)}...`);
    } else {
      console.log("⚠️ No token found, unauthenticated request");
    }
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// 🚨 Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("❌ API Response Error:", error.response.status, error.response.data);

      if (error.response.status === 401 && !publicRoutes.some(route => error.config?.url?.includes(route))) {
        localStorage.removeItem("token");
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      } else if (error.response.status === 500) {
        console.error("❗ Server error – try again later");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("⏱️ Request timeout");
    } else {
      console.error("🌐 Network error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
