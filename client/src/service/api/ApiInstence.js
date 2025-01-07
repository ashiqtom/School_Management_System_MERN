import axios from "axios";
import { store } from '../../redux/store';

export const apiInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/*
 * 1. REQUEST INTERCEPTOR
 */
apiInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    let { accessToken } = state.auth;
    config.baseURL = import.meta.env.VITE_API_URL;

    // Set Authorization header if accessToken is available
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    // Throw error so that it can be caught later
    throw error;  // You could throw a custom error message if needed
  }
);

/*
 * 2. RESPONSE INTERCEPTOR
 */
apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    // Throw the error for further handling in the calling code
    throw error 
  }
);
