import { createSlice } from '@reduxjs/toolkit';
import { LogOut, logIn, refreshUser, register } from './authOperations';

const statusPending = state => {
  state.isLoading = true;
};

const statusRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const statusFulfilled = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  state.isLoading = false;
  state.isLoggedIn = true;
  console.log(state.user);
  console.log(payload);
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: 'null',
      email: null,
      password: null,
    },
    token: null,
    isLoggedIn: false,
    error: null,
    isLoading: false,
    isRefreshing: false,
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, statusFulfilled)
      .addCase(register.pending, statusPending)
      .addCase(register.rejected, statusRejected)
      .addCase(logIn.fulfilled, statusFulfilled)
      .addCase(logIn.pending, statusPending)
      .addCase(logIn.rejected, statusRejected)
      .addCase(LogOut.fulfilled, state => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.user = { name: 'null', email: null, password: null };
        state.token = null;
      })
      .addCase(LogOut.pending, statusPending)
      .addCase(LogOut.rejected, statusRejected)
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      });
  },
});

export default authSlice.reducer;
