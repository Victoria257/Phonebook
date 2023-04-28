import axios from 'axios';
const { createAsyncThunk } = require('@reduxjs/toolkit');

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};
// const URL = 'https://connections-api.herokuapp.com';

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
    console.log(data);
    setAuthHeader(data.token);
    return await data;
  } catch (error) {
    console.log(error);
  }
});

export const LogOut = createAsyncThunk('/auth/logout', async (_, thunkAPI) => {
  try {
    const res = await axios.post('/users/logout');
    clearAuthHeader();
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  '/auth/current',
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    console.log(token);
    if (!token) return thunkAPI.rejectWithValue('No valid');
    setAuthHeader(token);
    try {
      const res = await axios.get('/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
