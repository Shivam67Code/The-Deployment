import axios from "axios";

// ✅ Use correct env var (VITE_API_BASE) + fallback
const BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_BASE || "https://the-deployment.vercel.app/api/v1"
    : "http://localhost:5000";

console.log("🟡 API Base URL:", BASE_URL);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
});

// 🔐 Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
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

      if (error.response.status === 401) {
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
