// src/services/api/endpoints.js

export const AUTH_ENDPOINTS = {
  REGISTER: '/auth/odc-register',
  LOGIN: '/auth/odc-login',
  LOGIN_CHECK: '/auth/login-check',
  RESET_PASSWORD: '/auth/reset-password',
  UPDATE_PASSWORD: '/auth/update-password',
};

export const CATALOG_ENDPOINTS = {
  VENDOR_LIST_NEAR: '/odc-vendor-list-near',
  VENDOR_BY_SLUG: (slug) => `/odc-vendor-slug/${slug}`,
  VENDOR_BY_ID: (id) => `/odc-vendor-id/${id}`,
  VENDOR_WITH_MENU: (slug) => `/odc-vendor-with-menu/${slug}`,
  CATEGORY_LIST: '/odc-category-list',
  EVENT_LIST: '/odc-event-list',
  MENU_LIST: '/odc-menu-list',
  MENU_CARD: (id) => `/odc-menu-card/${id}`,
  COMBO_LIST: '/odc-combo-list',
  COMBO_DETAIL: (id) => `/odc-combo/${id}`,
};

// One cart per customer — POST replaces (upserts) the existing cart.
export const CART_ENDPOINTS = {
  CREATE: '/odc-cart',
  GET: '/odc-cart',
};

export const ORDER_ENDPOINTS = {
  CREATE: '/odc-order',
  LIST: '/odc-orders',
  DETAIL: (id) => `/odc-order/${id}`,
  REVIEW: (id) => `/review-odc-order/${id}`,
  UNPAID_LIST: '/odc-unpaid-list',
};

export const PAYMENT_ENDPOINTS = {
  // Verify a Razorpay payment against an order (also used again after a repayment)
  VERIFY: (orderId) => `/odc-order-pay/${orderId}`,
  // Create a fresh Razorpay order for the remaining balance on an order
  REPAY: (orderId) => `/odc-repayment/${orderId}`,
};