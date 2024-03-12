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
    updateNotesByRecId(state,action){
      state.tableData=state.tableData.map(row=>{
        if(row.recId === action.payload.recId){
          row.notes = action.payload.notes;
        }
        return row;
      })
    }
  },
});

export const { updateAllTableData, updateNotesByRecId } = tableDataSlice.actions;

export default tableDataSlice.reducer;
