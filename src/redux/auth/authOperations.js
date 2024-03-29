import axios from 'axios';
const { createAsyncThunk } = require('@reduxjs/toolkit');

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk('auth/register', async credentials => {
  console.log(credentials);
  try {
    // сюди автоматом тягне axios.defaults.baseURL
    const { data } = await axios.post('/users/signup', credentials);
    console.log(data);
    setAuthHeader(data.token);
    return await data;
  } catch (error) {
    console.log(error);
  }
});

export const logIn = createAsyncThunk('auth/login', async credentials => {
  try {
    const { data } = await axios.post('/users/login', credentials);
    setAuthHeader(data.token);
    return await data;
  } catch (error) {
    console.log(error);
  }
});

export const LogOut = createAsyncThunk(
  '/auth/logout',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/logout');
      clearAuthHeader();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(thunkAPI.serializeError(error));
    }
  },
  {
    serializeError: error => {
      const {
        message,
        name,
        stack,
        response: { status, statusText } = {},
      } = error;
      return { message, name, stack, status, statusText };
    },
  }
);

export const refreshUser = createAsyncThunk(
  '/auth/current',
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    if (!token) return thunkAPI.rejectWithValue('No valid');
    setAuthHeader(token);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
