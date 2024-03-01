import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

export const checkboxSlice = createSlice({
  name: "bodyCheckbox",
  initialState,
  reducers: {
    checkboxCheck: (state, action) => {
      state.push(action.payload);
    },
    checkboxUncheck: (state, action) => {
      state = state.filter((row) => row != action.payload);
    },
  },
});

export const { checkboxCheck, checkboxUncheck } = checkboxSlice.actions;
export default checkboxSlice.reducer;
