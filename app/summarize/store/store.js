import { configureStore } from "@reduxjs/toolkit";
import rowExpandReducer from "../../../libs/shared/data-grid/features/rowExpansionSlice";
import checkboxReducer from "../../../libs/shared/data-grid/features/checkboxSlice";
import tableDataReducer from "../../../libs/shared/data-grid/features/tableDataSlice";
import selectDocumentsReducer from "../features/createNewSummary/selectDocumentsSlice";

const store = configureStore({
  reducer: {
    // reducer key value pair
    // (somthingDataSlice as key and somethingReducer as reducer)
    rowExpansionDataSlice: rowExpandReducer,
    checkboxDataSlice: checkboxReducer,
    tableDataSlice: tableDataReducer,

    selectDocumentsDataSlice: selectDocumentsReducer,
  },
});
export default store;
