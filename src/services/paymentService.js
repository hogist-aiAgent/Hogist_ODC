// src/services/paymentService.js

import axiosInstance from './api/axios';
import { PAYMENT_ENDPOINTS } from './api/endpoints';

export const verifyPayment = (orderId, body) =>
  axiosInstance.put(PAYMENT_ENDPOINTS.VERIFY(orderId), body);

export const repayOrder = (orderId, amount) =>
  axiosInstance.put(PAYMENT_ENDPOINTS.REPAY(orderId), { amount });