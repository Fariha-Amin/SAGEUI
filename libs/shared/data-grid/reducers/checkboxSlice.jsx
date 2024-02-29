import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  checkedRows: [],
};

export const checkboxSlice = createSlice({
  name: "bodyCheckbox",
  initialState,
  reducers: {
    checkboxCheck: (state, action) => {
      const checkedRow = action.payload;
      state.checkedRows.push(checkedRow);
    },
    checkboxUncheck: (state, action) => {
      state.checkedRows = state.checkedRows.filter(
        (row) => row != action.payload
      );
    },
  },
});

export const { checkboxCheck, checkboxUncheck } = checkboxSlice.actions;
export default checkboxSlice.reducer;
