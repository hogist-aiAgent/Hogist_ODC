// src/store/slices/catalogSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listVendorsNear, getVendorWithMenu, listMenuCards } from '../../services/catalogService';

export const fetchVendorsNear = createAsyncThunk(
  'catalog/fetchVendorsNear',
  async (
    { long, lat, page = 1, limit = 48, sort = 'fullName', count, ctype = 'ODC', search = '' },
    { rejectWithValue }
  ) => {
    try {
      const response = await listVendorsNear({ page, limit, sort, long, lat, count, ctype, search });
      const data = response.data;

      if (data?.status) {
        return {
          list: data.data || [],
          page: data.page,
          limit: data.limit,
          pages: data.pages,
          total: data.total,
        };
      }
      return rejectWithValue(data?.error || 'Could not load nearby caterers');
    } catch (error) {
      return rejectWithValue(
        error.friendlyMessage || error.response?.data?.error || 'Could not load nearby caterers'
      );
    }
  }
);


export const fetchVendorWithMenu = createAsyncThunk(
  'catalog/fetchVendorWithMenu',
  async ({ slug, page = 1, limit = 48 }, { rejectWithValue }) => {
    try {
      const response = await getVendorWithMenu(slug, { page, limit });
      const data = response.data;

      if (data?.status) {
        return {
          vendor: data.data?.vendor,
          reviewList: data.data?.reviewList || [],
          menuList: data.data?.menuList || [],
          page: data.page,
          limit: data.limit,
          pages: data.pages,
          total: data.total,
        };
      }
      return rejectWithValue(data?.error || 'Could not load this caterer');
    } catch (error) {
      return rejectWithValue(
        error.friendlyMessage || error.response?.data?.error || 'Could not load this caterer'
      );
    }
  }
);

// POST /v2/odc-menu-list — dedicated, independently-paginated menu list for
// a vendor (Section 2.7). Used by MenuDetail so the menu section isn't
// limited to whatever page of items vendor-with-menu happened to embed.
export const fetchMenuList = createAsyncThunk(
  'catalog/fetchMenuList',
  async (
    { vendor, search = '', page = 1, limit = 50, events = 'All', mealSlot, featured },
    { rejectWithValue }
  ) => {
    try {
      const response = await listMenuCards({ vendor, search, page, limit, events, mealSlot, featured });
      const data = response.data;

      if (data?.status) {
        return {
          list: data.data || [],
          page: data.page,
          pages: data.pages,
          total: data.total,
        };
      }
      return rejectWithValue(data?.error || 'Could not load the menu');
    } catch (error) {
      return rejectWithValue(
        error.friendlyMessage || error.response?.data?.error || 'Could not load the menu'
      );
    }
  }
);

const initialState = {
  // odc-vendor-list-near
  vendorsNear: [],
  vendorsNearMeta: { page: 1, limit: 48, pages: 1, total: 0 },
  vendorsNearLoading: false,
  vendorsNearError: null,

  // odc-vendor-with-menu/:slug
  vendorDetail: null,
  vendorDetailReviews: [],
  vendorDetailMenu: [],
  vendorDetailLoading: false,
  vendorDetailError: null,

  // odc-menu-list (dedicated menu-card list for a vendor)
  menuCards: [],
  menuCardsMeta: { page: 1, pages: 1, total: 0 },
  menuCardsLoading: false,
  menuCardsError: null,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    clearVendorDetail(state) {
      state.vendorDetail = null;
      state.vendorDetailReviews = [];
      state.vendorDetailMenu = [];
      state.vendorDetailError = null;
      state.menuCards = [];
      state.menuCardsMeta = { page: 1, pages: 1, total: 0 };
      state.menuCardsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Vendors near
      .addCase(fetchVendorsNear.pending, (state) => {
        state.vendorsNearLoading = true;
        state.vendorsNearError = null;
      })
      .addCase(fetchVendorsNear.fulfilled, (state, action) => {
        state.vendorsNearLoading = false;
        state.vendorsNear = action.payload.list;
        state.vendorsNearMeta = {
          page: action.payload.page,
          limit: action.payload.limit,
          pages: action.payload.pages,
          total: action.payload.total,
        };
      })
      .addCase(fetchVendorsNear.rejected, (state, action) => {
        state.vendorsNearLoading = false;
        state.vendorsNear = [];
        state.vendorsNearError = action.payload;
      })

      // ─── Vendor with menu
      .addCase(fetchVendorWithMenu.pending, (state) => {
        state.vendorDetailLoading = true;
        state.vendorDetailError = null;
      })
      .addCase(fetchVendorWithMenu.fulfilled, (state, action) => {
        state.vendorDetailLoading = false;
        state.vendorDetail = action.payload.vendor;
        state.vendorDetailReviews = action.payload.reviewList;
        state.vendorDetailMenu = action.payload.menuList;
      })
      .addCase(fetchVendorWithMenu.rejected, (state, action) => {
        state.vendorDetailLoading = false;
        state.vendorDetail = null;
        state.vendorDetailReviews = [];
        state.vendorDetailMenu = [];
        state.vendorDetailError = action.payload;
      })

      // ─── Menu list (dedicated menu API)
      .addCase(fetchMenuList.pending, (state) => {
        state.menuCardsLoading = true;
        state.menuCardsError = null;
      })
      .addCase(fetchMenuList.fulfilled, (state, action) => {
        state.menuCardsLoading = false;
        state.menuCards = action.payload.list;
        state.menuCardsMeta = {
          page: action.payload.page,
          pages: action.payload.pages,
          total: action.payload.total,
        };
      })
      .addCase(fetchMenuList.rejected, (state, action) => {
        state.menuCardsLoading = false;
        state.menuCards = [];
        state.menuCardsError = action.payload;
      });
  },
});

export const { clearVendorDetail } = catalogSlice.actions;
export default catalogSlice.reducer;