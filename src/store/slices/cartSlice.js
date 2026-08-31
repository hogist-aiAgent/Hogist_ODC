// src/store/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createCart, getCart } from '../../services/cartService';

// ─── Create / replace cart
// payload: { services: [{ _id, count }], serviceDate, additional }
export const submitCart = createAsyncThunk(
  'cart/submitCart',
  async ({ services, serviceDate, additional = [] }, { rejectWithValue }) => {
    try {
      const response = await createCart({ services, serviceDate, additional });
      const data = response.data;

      if (data?.status) {
        return data.data;
      }
      return rejectWithValue(data?.error || 'Could not save your cart');
    } catch (error) {
      return rejectWithValue(
        error.friendlyMessage || error.response?.data?.error || 'Could not save your cart'
      );
    }
  }
);

// ─── Fetch current cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCart();
      const data = response.data;

      if (data?.status) {
        return data.data;
      }
      return rejectWithValue(data?.error || 'Could not load your cart');
    } catch (error) {
      return rejectWithValue(
        error.friendlyMessage || error.response?.data?.error || 'Could not load your cart'
      );
    }
  }
);

const initialState = {
  cart: null,
  cartLoading: false,
  cartError: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart(state) {
      state.cart = null;
      state.cartError = null;
    },
    clearCartError(state) {
      state.cartError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Submit cart
      .addCase(submitCart.pending, (state) => {
        state.cartLoading = true;
        state.cartError = null;
      })
      .addCase(submitCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cart = action.payload;
      })
      .addCase(submitCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = action.payload;
      })

      // ─── Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.cartLoading = true;
        state.cartError = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.cart = null;
        state.cartError = action.payload;
      });
  },
});

export const { clearCart, clearCartError } = cartSlice.actions;
export default cartSlice.reducer;