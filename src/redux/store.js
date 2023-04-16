import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import { filtersReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filterContact: filtersReducer,
  },
});
