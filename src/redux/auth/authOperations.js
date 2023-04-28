import axios from 'axios';

const { createAsyncThunk } = require('@reduxjs/toolkit');

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
// const URL = 'https://connections-api.herokuapp.com';

export const register = createAsyncThunk('auth/register', async credentials => {
  console.log(credentials);
  try {
    // сюди автоматом тягне axios.defaults.baseURL
    const { data } = await axios.post('/users/signup', credentials);
    console.log(data);
    setAuthHeader(data.token);
    // token.set(data.token);
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
    // token.set(data.token);
    return await data;
  } catch (error) {
    console.log(error);
  }
});
