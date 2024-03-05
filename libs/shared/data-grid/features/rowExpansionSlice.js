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
    expandRow(state, action) {},
    collapseRow(state, action) {},
    expandAllRows(state, action) {},
    collapseAllRows(state, action) {},
  },
});

export const { expandRow, collapseRow, expandAllRows, collapseAllRows } =
  rowExpansionSlice.actions;

export default rowExpansionSlice.reducer;
