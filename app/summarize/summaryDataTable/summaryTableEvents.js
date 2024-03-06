import store from "../store/store";
import {
  expandRow,
  collapseRow,
  expandAllRows,
  collapseAllRows,
} from "../../../libs/shared/data-grid/features/rowExpansionSlice";

export const onCellClickHandler = (e) => {
  const expandedRows = store.getState().rowExpansion.expandedRows;
  const rowData = e.rowData;

  if (expandedRows.filter((row) => row.recId === rowData.recId).length) {
    store.dispatch(collapseRow(rowData));
  } else {
    store.dispatch(expandRow(rowData));
  }
};
