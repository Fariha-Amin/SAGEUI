import { configureStore } from "@reduxjs/toolkit";
import rowExpandReducer from "../../../libs/shared/data-grid/features/rowExpansionSlice";

const store = configureStore({
  reducer: {
    // reducer key value pair
    rowExpansion: rowExpandReducer,
  },
});
export default store;
