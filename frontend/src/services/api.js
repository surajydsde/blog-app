// src/api.js or axios.js
import axios from "axios";
import { toast } from "react-toastify"; // Optional, for user-friendly errors

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// ✅ Request Interceptor - attach token
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// ✅ Response Interceptor - global error handler
API.interceptors.response.use(
  (response) => response, // pass through if successful
  (error) => {
    const { response } = error;

    if (!response) {
      // Network error or server is down
      toast.error("Network Error or Server Unavailable.");
      console.error("Network error:", error.message);
      return Promise.reject(error);
    }

    // Extract relevant info
    const status = response.status;
    const message = response.data?.message || "Something went wrong";

    // 🎯 Handle based on status
    switch (status) {
      case 400:
        toast.error(`Bad Request: ${message}`);
        break;
      case 401:
        toast.error("Unauthorized! Please log in again.");
        // Clear localStorage and redirect
        localStorage.removeItem("user");
        window.location.href = "/login";
        break;
      case 403:
        toast.warn("Forbidden: You don't have permission.");
        break;
      case 404:
        toast.error("Resource not found.");
        break;
      case 500:
        toast.error("Internal server error. Please try again later.");
        break;
      default:
        toast.error(`Error ${status}: ${message}`);
        break;
    }

    return Promise.reject(error); // forward error to caller
  }
);

export default API;
