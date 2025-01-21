import { createSlice } from "@reduxjs/toolkit";

const initialState = { date: 0 };

const isToday = createSlice({
  name: "isToday",
  initialState,
  reducers: {
    setToday: (state, action) => {
      state.date = action.payload;
    },
    resetToday: (state) => {
      state.date = 0;
    },
  },
});

export const { setToday, resetToday } = isToday.actions;
export default isToday.reducer;
