import { configureStore } from "@reduxjs/toolkit";
import checkboxSlice from "../reducers/checkboxSlice";

export const sageDatatableStore = configureStore({
  reducer: {
    checkbox: checkboxSlice,
  },
});
