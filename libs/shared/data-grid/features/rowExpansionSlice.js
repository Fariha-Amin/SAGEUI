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
    expandAllRows(state, action) {
      state.expandedRows = [...state.expandedRows, ...action.payload];
    },
    collapseAllRows(state, action) {
      state.expandedRows = state.expandedRows.filter(
        (row) => !action.payload.find((_) => _.recId === row.recId)
      );
    },
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
