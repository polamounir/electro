import Cookies from "js-cookie";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Add a request interceptor to include the access token
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
