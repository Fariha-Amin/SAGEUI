import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: 1,
  selectedFolders: {},
  expandedFolders: {},
  selectedTags: {},
  expandedTags: {},
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
    updateExpandFolders(state, action) {
      state.expandedFolders = action.payload;
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
    resetexpandedFolders(state, action) {
      state.expandedFolders = {};
    },
    resetexpandedTags(state, action) {
      state.expandedTags = {};
    },

    resetAll(state, action) {
      state = initialState;
    },
  },
});

export const {
  updateSelectedCategory,
  updateSelectedFolders,
  updateExpandFolders,
  updateSelectedTags,
  updateDocIDs,
  resetSelectedFolders,
  resetSelectedTags,
  resetDocIDs,
  resetexpandedFolders,
  resetAll,
} = selectDocumentsSlice.actions;

export default selectDocumentsSlice.reducer;
