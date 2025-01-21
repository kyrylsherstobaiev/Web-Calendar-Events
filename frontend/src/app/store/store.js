import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer.js";

export default configureStore({
  reducer: rootReducer,
});
