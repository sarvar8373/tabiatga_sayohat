import axios from "axios";
import { BASE_URL } from "../api/host/host";

// Create an instance of axios with the base URL
const AxiosClient = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the Bearer token in the headers
AxiosClient.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem("token");

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Only set Content-Type if it's not multipart/form-data
    if (config.headers["Content-Type"] === undefined) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default AxiosClient;
