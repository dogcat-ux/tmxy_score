import { createSlice } from '@reduxjs/toolkit';

export const wholeSlice = createSlice({
  name: 'whole',
  initialState: {
    loading: false,
  },
  reducers: {
    save: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { save } = wholeSlice.actions;
export default wholeSlice.reducer;
