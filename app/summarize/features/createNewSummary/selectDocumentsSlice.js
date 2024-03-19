import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: 1,
  selectedFolders: {},
  selectedTags: {},
  docIDs: "",
};

const selectDocumentsSlice = createSlice({
  name: "selectDocumentsSlice",
  initialState,
  reducers: {
    updateSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    updateSelectedFolders(state, action) {
      state.selectedFolders = action.payload;
    },
    updateSelectedTags(state, action) {
      state.selectedTags = action.payload;
    },
    updateDocIDs(state, action) {
      state.docIDs = action.payload;
    },
    resetSelectedFolders(state, action) {
      state.selectedFolders = {};
    },
    resetSelectedTags(state, action) {
      state.selectedTags = {};
    },
    resetDocIDs(state, action) {
      state.docIDs = "";
    },
    resetAll(state, action) {
      state = initialState;
    },
    // expandRow(state, action) {
    //   state.expandedRows.push(action.payload);
    // },
    // collapseRow(state, action) {
    //   state.expandedRows = state.expandedRows.filter(
    //     (row) => row.recId !== action.payload.recId
    //   );
    // },
    // expandAllRows(state, action) {
    //   state.expandedRows = [...state.expandedRows, ...action.payload];
    // },
    // collapseAllRows(state, action) {
    //   state.expandedRows = state.expandedRows.filter(
    //     (row) => !action.payload.find((_) => _.recId === row.recId)
    //   );
    // },
    // updateIsAllRowExpanded(state, action) {
    //   state.isAllRowExpanded = action.payload;
    // },
  },
});

export const {
  updateSelectedCategory,
  updateSelectedFolders,
  updateSelectedTags,
  updateDocIDs,
  resetSelectedFolders,
  resetSelectedTags,
  resetDocIDs,
  resetAll,
} = selectDocumentsSlice.actions;

export default selectDocumentsSlice.reducer;
