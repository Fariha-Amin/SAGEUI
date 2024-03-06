import store from "../store/store";
import {
  expandRow,
  collapseRow,
  expandAllRows,
  collapseAllRows,
  updateIsAllRowExpanded,
} from "../../../libs/shared/data-grid/features/rowExpansionSlice";

export const onCellClickHandler = (e) => {
  if (!e || e.rowData.inprogress) return;

  let expandedRows = store.getState().rowExpansionDataSlice.expandedRows;
  let currentTableData = null;
  const rowData = e.rowData;

  if (expandedRows.filter((row) => row.recId === rowData.recId).length) {
    store.dispatch(collapseRow(rowData));
  } else {
    store.dispatch(expandRow(rowData));
  }
  expandedRows = store.getState().rowExpansionDataSlice.expandedRows;
  currentTableData = store.getState().tableDataSlice.tableData;
  store.dispatch(
    updateIsAllRowExpanded(isAllRowExist(expandedRows, currentTableData))
  );
  console.log(store.getState().rowExpansionDataSlice);
};

export const onTableDataUpdateHandler = () => {
  const expandedRows = store.getState().rowExpansionDataSlice.expandedRows;
  const currentTableData = store.getState().tableDataSlice.tableData;
  store.dispatch(
    updateIsAllRowExpanded(isAllRowExist(expandedRows, currentTableData))
  );
  console.log(store.getState().rowExpansionDataSlice);
};

export const viewAllSummaryClickHandler = (e) => {
  const rowExpansionData = store.getState().rowExpansionDataSlice;
  let expandedRows = store.getState().rowExpansionDataSlice.expandedRows;
  let currentTableData = store.getState().tableDataSlice.tableData;
  const rowsToInsert = [];
  const rowsToRemove = [];

  let expandedRowsDict = expandedRows.reduce((accumulator, current) => {
    accumulator[current.recId] = true;
    return accumulator;
  }, {});
  if (!rowExpansionData.isAllRowExpanded) {
    rowsToInsert = currentTableData.reduce((accumulator, current) => {
      if (!expandedRowsDict[current.recId]) {
        accumulator.push(current);
        return accumulator;
      }
      return accumulator;
    }, []);
    store.dispatch(expandAllRows(rowsToInsert));
  } else {
    rowsToRemove = currentTableData.slice();
    store.dispatch(collapseAllRows(rowsToRemove));
  }
  expandedRows = store.getState().rowExpansionDataSlice.expandedRows;
  currentTableData = store.getState().tableDataSlice.tableData;
  store.dispatch(
    updateIsAllRowExpanded(isAllRowExist(expandedRows, currentTableData))
  );
};

const isAllRowExist = (expandedRows, currentTableData) => {
  let existingRowCount = 0;
  let expandedRowsDict = expandedRows.reduce((accumulator, current) => {
    accumulator[current.recId] = true;
    return accumulator;
  }, {});
  currentTableData.map((row) => {
    if (expandedRowsDict[row.recId]) {
      existingRowCount++;
    }
  });
  if (existingRowCount !== 0 && existingRowCount === currentTableData.length)
    return true;
  return false;
};
