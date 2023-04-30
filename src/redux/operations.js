import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/contacts`);
      return await response.data;
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

export const addContacts = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await axios.post(`/contacts`, { name, number });
      // setAuthHeader(response.data.token);
      toast.success('Add contact');
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const delContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      toast.error('Contact was delete!');
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
