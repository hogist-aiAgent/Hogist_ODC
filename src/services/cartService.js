// src/services/cartService.js

import axiosInstance from './api/axios';
import { CART_ENDPOINTS } from './api/endpoints';

export const createCart = (body) =>
  axiosInstance.post(CART_ENDPOINTS.CREATE, body);

export const getCart = () =>
  axiosInstance.get(CART_ENDPOINTS.GET);