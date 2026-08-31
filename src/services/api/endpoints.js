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
