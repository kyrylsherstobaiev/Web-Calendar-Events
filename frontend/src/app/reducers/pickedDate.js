import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const currentFormattedDate = moment().clone().format("DD/MM/YYYY");
const initialState = { date: `${currentFormattedDate}` };

const pickedDate = createSlice({
  name: "pickedDate",
  initialState,
  reducers: {
    setPickedDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setPickedDate } = pickedDate.actions;
export default pickedDate.reducer;
