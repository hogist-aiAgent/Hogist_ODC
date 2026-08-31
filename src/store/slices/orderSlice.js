// src/store/slices/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createOrder,
  listOrders,
  getOrderById,
  reviewOrder,
  listUnpaidOrders,
} from '../../services/orderService';

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async ({ cart_id, serviceDate, serviceTime, dlAddress, amount }, { rejectWithValue }) => {
    try {
      const response = await createOrder({ cart_id, serviceDate, serviceTime, dlAddress, amount });
      const data = response.data;

      if (data?.status) {
        return data.data;
      }
      return rejectWithValue(data?.error || 'Could not place your order');
    } catch (error) {
      return rejectWithValue(
        error.friendlyMessage || error.response?.data?.error || 'Could not place your order'
      );
    }
  }
);

// ─── My orders list
export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async ({ page = 1, limit = 25 } = {}, { rejectWithValue }) => {
    try {
      const response = await listOrders({ page, limit });
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
      return rejectWithValue(data?.error || 'Could not load your orders');
    } catch (error) {
      return rejectWithValue(
        error.friendlyMessage || error.response?.data?.error || 'Could not load your orders'
      );
    }
  }
);

// ─── Single order detail
export const fetchOrderById = createAsyncThunk(
  'order/fetchOrderById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getOrderById(id);
      const data = response.data;

      if (data?.status) {
        return data.data;
      }
      return rejectWithValue(data?.error || 'Could not load this order');
    } catch (error) {
      return rejectWithValue(
        error.friendlyMessage || error.response?.data?.error || 'Could not load this order'
      );
    }
  }
);

// ─── Leave a review
// payload: { id, text, compliant, image, star }
export const submitOrderReview = createAsyncThunk(
  'order/submitOrderReview',
  async ({ id, text, compliant = false, image = '', star = 5 }, { rejectWithValue }) => {
    try {
      const response = await reviewOrder(id, { text, compliant, image, star });
      const data = response.data;

      if (data?.status) {
        return data.data;
      }
      return rejectWithValue(data?.error || 'Could not submit your review');
    } catch (error) {
      return rejectWithValue(
        error.friendlyMessage || error.response?.data?.error || 'Could not submit your review'
      );
    }
  }
);

// ─── Unpaid / balance-due orders
export const fetchUnpaidOrders = createAsyncThunk(
  'order/fetchUnpaidOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await listUnpaidOrders();
      const data = response.data;

      if (data?.status) {
        return data.data || [];
      }
      return rejectWithValue(data?.error || 'Could not load unpaid orders');
    } catch (error) {
      return rejectWithValue(
        error.friendlyMessage || error.response?.data?.error || 'Could not load unpaid orders'
      );
    }
  }
);

const initialState = {
  // odc-order (create)
  placeOrderLoading: false,
  placeOrderError: null,
  lastPlacedOrder: null, // includes .payreq for Razorpay Checkout

  // odc-orders (list)
  orders: [],
  ordersMeta: { page: 1, limit: 25, pages: 1, total: 0 },
  ordersLoading: false,
  ordersError: null,

  // odc-order/:id (detail)
  orderDetail: null,
  orderDetailLoading: false,
  orderDetailError: null,

  // review-odc-order/:id
  reviewLoading: false,
  reviewError: null,
  reviewSuccess: false,

  // odc-unpaid-list
  unpaidOrders: [],
  unpaidOrdersLoading: false,
  unpaidOrdersError: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearLastPlacedOrder(state) {
      state.lastPlacedOrder = null;
      state.placeOrderError = null;
    },
    clearOrderDetail(state) {
      state.orderDetail = null;
      state.orderDetailError = null;
    },
    clearReviewStatus(state) {
      state.reviewError = null;
      state.reviewSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Place order
      .addCase(placeOrder.pending, (state) => {
        state.placeOrderLoading = true;
        state.placeOrderError = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placeOrderLoading = false;
        state.lastPlacedOrder = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.placeOrderLoading = false;
        state.placeOrderError = action.payload;
      })

      // ─── Orders list
      .addCase(fetchOrders.pending, (state) => {
        state.ordersLoading = true;
        state.ordersError = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.ordersLoading = false;
        state.orders = action.payload.list;
        state.ordersMeta = {
          page: action.payload.page,
          limit: action.payload.limit,
          pages: action.payload.pages,
          total: action.payload.total,
        };
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.ordersLoading = false;
        state.orders = [];
        state.ordersError = action.payload;
      })

      // ─── Order detail
      .addCase(fetchOrderById.pending, (state) => {
        state.orderDetailLoading = true;
        state.orderDetailError = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.orderDetailLoading = false;
        state.orderDetail = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.orderDetailLoading = false;
        state.orderDetail = null;
        state.orderDetailError = action.payload;
      })

      // ─── Review
      .addCase(submitOrderReview.pending, (state) => {
        state.reviewLoading = true;
        state.reviewError = null;
        state.reviewSuccess = false;
      })
      .addCase(submitOrderReview.fulfilled, (state) => {
        state.reviewLoading = false;
        state.reviewSuccess = true;
      })
      .addCase(submitOrderReview.rejected, (state, action) => {
        state.reviewLoading = false;
        state.reviewSuccess = false;
        state.reviewError = action.payload;
      })

      // ─── Unpaid orders
      .addCase(fetchUnpaidOrders.pending, (state) => {
        state.unpaidOrdersLoading = true;
        state.unpaidOrdersError = null;
      })
      .addCase(fetchUnpaidOrders.fulfilled, (state, action) => {
        state.unpaidOrdersLoading = false;
        state.unpaidOrders = action.payload;
      })
      .addCase(fetchUnpaidOrders.rejected, (state, action) => {
        state.unpaidOrdersLoading = false;
        state.unpaidOrders = [];
        state.unpaidOrdersError = action.payload;
      });
  },
});

export const { clearLastPlacedOrder, clearOrderDetail, clearReviewStatus } = orderSlice.actions;
export default orderSlice.reducer;