import { createSlice } from '@reduxjs/toolkit';

const filterContactSlice = createSlice({
  name: 'filters',
  initialState: {
    filters: '',
  },
  reducers: {
    changeFilter(state, action) {
      state.filters = action.payload;
    },
  },
});

export const { changeFilter } = filterContactSlice.actions;
export const filtersReducer = filterContactSlice.reducer;
