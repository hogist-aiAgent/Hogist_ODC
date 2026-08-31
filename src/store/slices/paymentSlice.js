// src/store/slices/paymentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { verifyPayment, repayOrder } from '../../services/paymentService';

export const confirmPayment = createAsyncThunk(
  'payment/confirmPayment',
  async ({ orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature }, { rejectWithValue }) => {
    try {
      const response = await verifyPayment(orderId, {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      const data = response.data;

      if (data?.status) {
        return data.data;
      }
      return rejectWithValue(data?.error || 'Payment not completed.');
    } catch (error) {
      return rejectWithValue(
        error.friendlyMessage || error.response?.data?.error || 'Payment not completed.'
      );
    }
  }
);

export const requestRepayment = createAsyncThunk(
  'payment/requestRepayment',
  async ({ orderId, amount = 1 }, { rejectWithValue }) => {
    try {
      const response = await repayOrder(orderId, amount);
      const data = response.data;

      if (data?.status) {
        return data.data;
      }
      return rejectWithValue(data?.error || 'Could not start repayment');
    } catch (error) {
      return rejectWithValue(
        error.friendlyMessage || error.response?.data?.error || 'Could not start repayment'
      );
    }
  }
);

const initialState = {
  verifyLoading: false,
  verifyError: null,
  lastPaymentResult: null, // { id, payment, paid, paymentStatus, status }

  repayLoading: false,
  repayError: null,
  lastRepayment: null, // includes .payreq for a fresh Razorpay Checkout run
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearPaymentResult(state) {
      state.lastPaymentResult = null;
      state.verifyError = null;
    },
    clearRepayment(state) {
      state.lastRepayment = null;
      state.repayError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Confirm payment
      .addCase(confirmPayment.pending, (state) => {
        state.verifyLoading = true;
        state.verifyError = null;
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        state.verifyLoading = false;
        state.lastPaymentResult = action.payload;
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.verifyLoading = false;
        state.verifyError = action.payload;
      })

      // ─── Repayment
      .addCase(requestRepayment.pending, (state) => {
        state.repayLoading = true;
        state.repayError = null;
      })
      .addCase(requestRepayment.fulfilled, (state, action) => {
        state.repayLoading = false;
        state.lastRepayment = action.payload;
      })
      .addCase(requestRepayment.rejected, (state, action) => {
        state.repayLoading = false;
        state.repayError = action.payload;
      });
  },
});

export const { clearPaymentResult, clearRepayment } = paymentSlice.actions;
export default paymentSlice.reducer;