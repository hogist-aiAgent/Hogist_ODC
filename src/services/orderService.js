// src/services/orderService.js
// Section 4 — Order (create from cart, list, detail, review, unpaid balance)

import axiosInstance from './api/axios';
import { ORDER_ENDPOINTS } from './api/endpoints';

// POST /v2/odc-order — Auth: auth
// body: { cart_id, serviceDate, serviceTime, dlAddress, amount }
// Loads the customer's cart, creates the Order + a Razorpay order, deletes
// the cart. Response data.payreq is Razorpay's own order object — hand it
// to Razorpay Checkout, then call verifyPayment() (paymentService) to finalize.
export const createOrder = (body) =>
  axiosInstance.post(ORDER_ENDPOINTS.CREATE, body);

// GET /v2/odc-orders?page=&limit= — Auth: auth
export const listOrders = ({ page = 1, limit = 25 } = {}) =>
  axiosInstance.get(ORDER_ENDPOINTS.LIST, { params: { page, limit } });


export const getOrderById = (id) =>
  axiosInstance.get(ORDER_ENDPOINTS.DETAIL(id));

export const reviewOrder = (id, body) =>
  axiosInstance.put(ORDER_ENDPOINTS.REVIEW(id), body);

// GET /v2/odc-unpaid-list — Auth: auth
export const listUnpaidOrders = () =>
  axiosInstance.get(ORDER_ENDPOINTS.UNPAID_LIST);