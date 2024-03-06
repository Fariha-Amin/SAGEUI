import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectAllChecked: false,
  selectedRows: [],
  removedRows: [],
};

const checkboxSlice = createSlice({
  name: "checkboxSlice",
  initialState,
  reducers: {
    bodyCheckboxCheck: (state, action) => {
      state.selectedRows.push(action.payload);
      state.removedRows = state.removedRows.filter(
        (row) => row != action.payload
      );
    },
    bodyCheckboxUncheck: (state, action) => {
      state.selectedRows = state.selectedRows.filter(
        (row) => row != action.payload
      );
      state.removedRows.push(action.payload);
    },
    allCheckboxSelection: (state, action) => {
      state.selectedRows = action.payload;
    },
    removedRowsState: (state, action) => {
      state.removedRows = action.payload;
    },
    headerCheckbox: (state, action) => {
      state.selectAllChecked = action.payload;
    },
  },
});

export const {
  bodyCheckboxCheck,
  bodyCheckboxUncheck,
  headerCheckbox,
  allCheckboxSelection,
  removedRowsState,
} = checkboxSlice.actions;

export default checkboxSlice.reducer;
