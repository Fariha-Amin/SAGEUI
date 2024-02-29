import { configureStore } from "@reduxjs/toolkit";
import checkboxReducer from "../reducers/checkboxSlice";

export const sageDatatableStore = configureStore({
  reducer: checkboxReducer,
});
