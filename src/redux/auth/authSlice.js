import { createSlice } from '@reduxjs/toolkit';
import { logIn, register } from './authOperations';

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
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, statusFulfilled)
      .addCase(register.pending, statusPending)
      .addCase(register.rejected, statusRejected)
      .addCase(logIn.fulfilled, statusFulfilled)
      .addCase(logIn.pending, statusPending)
      .addCase(logIn.rejected, statusRejected);
  },
});

export default authSlice.reducer;
