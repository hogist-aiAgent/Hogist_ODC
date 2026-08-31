// src/services/catalogService.js


import axiosInstance from './api/axios';
import { CATALOG_ENDPOINTS } from './api/endpoints';

// POST /v2/odc-vendor-list-near
// body: { page, limit, sort, long, lat, count, ctype, search }
export const listVendorsNear = (body) =>
  axiosInstance.post(CATALOG_ENDPOINTS.VENDOR_LIST_NEAR, body);

// GET /v2/odc-vendor-slug/:slug
export const getVendorBySlug = (slug) =>
  axiosInstance.get(CATALOG_ENDPOINTS.VENDOR_BY_SLUG(slug));

// GET /v2/odc-vendor-id/:id
export const getVendorById = (id) =>
  axiosInstance.get(CATALOG_ENDPOINTS.VENDOR_BY_ID(id));

// GET /v2/odc-vendor-with-menu/:slug?page=&limit=
export const getVendorWithMenu = (slug, { page, limit } = {}) =>
  axiosInstance.get(CATALOG_ENDPOINTS.VENDOR_WITH_MENU(slug), {
    params: { page, limit },
  });

// GET /v2/odc-category-list
export const listCategories = () =>
  axiosInstance.get(CATALOG_ENDPOINTS.CATEGORY_LIST);

// GET /v2/odc-event-list
export const listEvents = () =>
  axiosInstance.get(CATALOG_ENDPOINTS.EVENT_LIST);

// POST /v2/odc-menu-list
export const listMenuCards = (body) =>
  axiosInstance.post(CATALOG_ENDPOINTS.MENU_LIST, body);

// GET /v2/odc-menu-card/:id
export const getMenuCard = (id) =>
  axiosInstance.get(CATALOG_ENDPOINTS.MENU_CARD(id));

// POST /v2/odc-combo-list
// body: { comboType, vendor, events, mealSlot, guestCount, featured }
export const listCombos = (body) =>
  axiosInstance.post(CATALOG_ENDPOINTS.COMBO_LIST, body);

// GET /v2/odc-combo/:id?guestCount=
export const getCombo = (id, guestCount) =>
  axiosInstance.get(CATALOG_ENDPOINTS.COMBO_DETAIL(id), {
    params: guestCount ? { guestCount } : undefined,
  });
