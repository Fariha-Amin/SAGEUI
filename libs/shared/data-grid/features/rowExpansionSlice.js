import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expandedRows: [],
  excludedRows: [],
  isAllRowExpanded: false,
};

const rowExpansionSlice = createSlice({
  name: "rowExpansionSlice",
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
    updateIsAllRowExpanded(state, action) {
      state.isAllRowExpanded = action.payload;
    },
  },
});

export const {
  expandRow,
  collapseRow,
  expandAllRows,
  collapseAllRows,
  updateIsAllRowExpanded,
} = rowExpansionSlice.actions;

export default rowExpansionSlice.reducer;
