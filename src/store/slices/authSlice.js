// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerCustomer, loginCustomer } from '../../services/authService';
import safeStorage from '../../utils/storage';
import { STORAGE_KEYS } from '../../utils/constants';

// ─── Register
// Body: { fullName, email, mobile, password }
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ fullName, email, mobile, password }, { rejectWithValue }) => {
    try {
      const response = await registerCustomer({ fullName, email, mobile, password });
      const data = response.data;

      if (data?.status) {
        return data.data;
      }
      return rejectWithValue(data?.error || 'Registration failed');
    } catch (error) {
      return rejectWithValue(
        error.friendlyMessage || error.response?.data?.error || 'Registration failed'
      );
    }
  }
);

// ─── Login
// Body: { userName, password, type, fcmToken }
// userName matches either the customer's email or mobile.
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ userName, password, type = 'desktop', fcmToken }, { rejectWithValue }) => {
    // Real login API call — this is what returns the actual registered
    // user (with their real fullName), so the navbar shows the correct
    // name after login instead of whatever was typed into the email field.
    try {
      const response = await loginCustomer({ userName, password, type, fcmToken });
      const data = response.data;

      if (data?.status) {
        safeStorage.setItem(STORAGE_KEYS.CUSTOMER_TOKEN, data.data.token);
        safeStorage.setItem(STORAGE_KEYS.CUSTOMER_USER, JSON.stringify(data.data.user));
        return data.data;
      }
      return rejectWithValue(data?.error || 'Username / Password is wrong');
    } catch (error) {
      return rejectWithValue(
        error.friendlyMessage || error.response?.data?.error || 'Username / Password is wrong'
      );
    }
  }
);

// ─── Rehydrate from localStorage on page load
const savedUser = (() => {
  try {
    const raw = safeStorage.getItem(STORAGE_KEYS.CUSTOMER_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();
const savedToken = safeStorage.getItem(STORAGE_KEYS.CUSTOMER_TOKEN) || null;

const initialState = {
  user: savedUser,
  token: savedToken,
  isAuthenticated: !!savedToken,

  loginLoading: false,
  loginError: null,

  registerLoading: false,
  registerError: null,
  registerSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      safeStorage.removeItem(STORAGE_KEYS.CUSTOMER_TOKEN);
      safeStorage.removeItem(STORAGE_KEYS.CUSTOMER_USER);
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    clearAuthErrors(state) {
      state.loginError = null;
      state.registerError = null;
    },
    clearRegisterSuccess(state) {
      state.registerSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Register
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
        state.registerSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerLoading = false;
        state.registerSuccess = true;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerSuccess = false;
        state.registerError = action.payload;
      })

      // ─── Login
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.isAuthenticated = false;
        state.loginError = action.payload;
      });
  },
});

export const { logout, clearAuthErrors, clearRegisterSuccess } = authSlice.actions;
export default authSlice.reducer;