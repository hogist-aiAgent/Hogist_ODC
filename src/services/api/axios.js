// src/services/api/axios.js
import axios from 'axios';
import safeStorage from '../../utils/storage';
import { STORAGE_KEYS } from '../../utils/constants';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});


axiosInstance.interceptors.request.use((config) => {
  const token = safeStorage.getItem(STORAGE_KEYS.CUSTOMER_TOKEN);

  if (token) {
    config.headers.Authorization = token;
  }

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  return config;
});

// ─── Response: normalize network errors, clear a stale session on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      error.isNetworkError = true;
      error.friendlyMessage =
        error.code === 'ECONNABORTED'
          ? 'Request timed out. Please check your connection and try again.'
          : 'Unable to connect to the server. Please check your network and try again.';
      return Promise.reject(error);
    }

    const status = error.response?.status;

    if (status === 401) {
      safeStorage.removeItem(STORAGE_KEYS.CUSTOMER_TOKEN);
      safeStorage.removeItem(STORAGE_KEYS.CUSTOMER_USER);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
