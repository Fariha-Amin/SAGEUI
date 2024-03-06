import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expandedRows: [],
  excludedRows: [],
  isAllRowExpanded: false,
};

const rowExpansionSlice = createSlice({
  name: "rowExpansion",
  initialState,
  reducers: {
    expandRow(state, action) {
      state.expandedRows.push(action.payload);
    },
    collapseRow(state, action) {
      state.expandedRows = state.expandedRows.filter(
        (row) => row.recId !== action.payload.recId
      );
    },
    expandAllRows(state, action) {},
    collapseAllRows(state, action) {},
  },
});

export const { expandRow, collapseRow, expandAllRows, collapseAllRows } =
  rowExpansionSlice.actions;

export default rowExpansionSlice.reducer;
