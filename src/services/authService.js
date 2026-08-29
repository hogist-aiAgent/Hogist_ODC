// src/services/authService.js
// All auth-related API calls for the ODC customer app.
// These functions only make the request and return the axios response —
// state handling (loading/error/success, localStorage) lives in the slice.

import axiosInstance from './api/axios';
import { AUTH_ENDPOINTS } from './api/endpoints';

// POST /v2/auth/odc-register
export const registerCustomer = (data) =>
  axiosInstance.post(AUTH_ENDPOINTS.REGISTER, data);

// POST /v2/auth/odc-login
export const loginCustomer = (data) =>
  axiosInstance.post(AUTH_ENDPOINTS.LOGIN, data);
