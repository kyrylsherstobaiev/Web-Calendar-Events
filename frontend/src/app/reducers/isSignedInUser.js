import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : "",
};

const setUserInLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const isSignedInUser = createSlice({
  name: "isSignedInUser",
  initialState,
  reducers: {
    userSignedIn: (state, action) => {
      state.user = action.payload;
      setUserInLocalStorage(state.user);
    },
    userSignedOut: (state) => {
      state.user = "";
      setUserInLocalStorage("");
    },
  },
});

export const { userSignedIn, userSignedOut } = isSignedInUser.actions;
export default isSignedInUser.reducer;
