import { configureStore } from "@reduxjs/toolkit";
import rowExpandReducer from "../../../libs/shared/data-grid/features/rowExpansionSlice";
import checkboxSlice from "../../../libs/shared/data-grid/features/checkboxSlice";

const store = configureStore({
  reducer: {
    // reducer key value pair
    rowExpansion: rowExpandReducer,
    checkbox: checkboxSlice,
  },
});
export default store;
