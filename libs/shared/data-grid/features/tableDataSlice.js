import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tableData: [],
};

const tableDataSlice = createSlice({
  name: "tableDataSlice",
  initialState,
  reducers: {
    updateAllTableData(state, action) {
      state.tableData = action.payload;
    },
  },
});

export const { updateAllTableData } = tableDataSlice.actions;

export default tableDataSlice.reducer;
