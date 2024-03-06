import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import sageTableUtil from "./utility/sageTableUtility";
import CustomPaginatorTemplate from "./CustomPaginatorTemplate";
import { DataService } from "./utility/DataService";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import SelectAllModal from "./DatatableSelectAllModal";
import {
  bodyCheckboxCheck,
  bodyCheckboxUncheck,
  headerCheckbox,
  allCheckboxSelection,
  removedRowsState,
} from "./features/checkboxSlice";

import { updateAllTableData } from "./features/tableDataSlice";

export default function SageDataTable(props) {
  const dataKey = useRef(props.dataKey);
  //const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [selectedRadioOption, setSelectedRadioOption] = useState(null);

  const { onCellClickHandler } = props;

  // Checkbox state subscribers
  const data = useSelector((state) => state.tableDataSlice.tableData);
  const checkedRows = useSelector(
    (state) => state.checkboxDataSlice.selectedRows
  );
  const uncheckedRows = useSelector(
    (state) => state.checkboxDataSlice.removedRows
  );
  const selectAllChecked = useSelector(
    (state) => state.checkboxDataSlice.selectAllChecked
  );

  // Row expand state subscribers
  const expandedRows = useSelector(
    (state) => state.rowExpansionDataSlice.expandedRows
  );

  const dispatch = useDispatch();

  let tableConfig = sageTableUtil.createTableConfig(props);

  const { dataUrl, lazy } = props;
  const columnDef = props.children;
  const radioOptions = [
    { label: "Documents on current page", value: 1 },
    { label: "Documents across all pages", value: 2 },
  ];

  let filterStateInitial = {};

  var filtered = columnDef.filter((col) => col.props.isFilterable == true);

  filtered.forEach((col) => {
    filterStateInitial[col.props.field] = {
      value: "",
      matchMode: "contains",
    };
  });

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 20,
    page: 1,
    sortField: props.defaultSortField,
    sortOrder: props.defaultSortOrder,
    filters: filterStateInitial,
  });

  const [lazyStateTemp, setlazyStateTemp] = useState({});

  let networkTimeout = null;

  useEffect(() => {
    loadLazyData();
  }, [lazyState]);

  const loadLazyData = () => {
    setLoading(true);

    if (networkTimeout) {
      clearTimeout(networkTimeout);
    }

    DataService.getTableData(dataUrl, {
      dataTableRequest: JSON.stringify(lazyState),
    }).then((apiResponse) => {
      setTotalRecords(apiResponse.totalRecords);
      //setData(apiResponse.data);
      dispatch(updateAllTableData(apiResponse.data));
      setLoading(false);
    });
  };

  const onPage = (event) => {
    setlazyState({ ...event, ...{ filters: lazyState.filters } });
  };

  const onSort = (event) => {
    setlazyState({ ...event, ...{ filters: lazyState.filters } });
  };

  const onFilter = (event) => {
    event["first"] = 0;
    setlazyStateTemp(event);
  };

  // Expanding row logic
  const onCellClick = (e) => {
    if (!e.column.props.cellClickable) return;
    onCellClickHandler(e);
  };

  // Expanding row template
  const rowExpansionTemplate = (data) => {
    return <td colSpan={6}>{data.summary}</td>;
  };

  const onDataTableKeyDown = (event) => {
    if (event.keyCode == 13 && event.target.type == "text") {
      console.log(event.target);
      setlazyState({ ...lazyStateTemp });
      dispatch(allCheckboxSelection([]));
      dispatch(removedRowsState([]));
      dispatch(headerCheckbox(false));
    }
  };

  if (lazy) {
    const tableConfigLazy = {
      first: lazyState.first,
      totalRecords: totalRecords,
      onPage: onPage,
      onSort: onSort,
      sortField: lazyState.sortField,
      sortOrder: lazyState.sortOrder,
      onFilter: onFilter,
      filters: lazyState.filters,
      onKeyDown: onDataTableKeyDown,
      loading: loading,
    };

    tableConfig = { ...tableConfig, ...tableConfigLazy };
  }

  const onSelectAllChange = (event) => {
    if (totalRecords <= tableConfig.rows) {
      dispatch(headerCheckbox(event.checked ? true : false));
      dispatch(allCheckboxSelection(event.checked ? [-1] : []));
    } else {
      setSelectedRadioOption(1);
      setModalShow(true);
    }
  };

  const onCheckboxChange = (e, rowData) => {
    const isChecked = e.checked;

    if (isChecked) {
      dispatch(bodyCheckboxCheck(rowData[dataKey.current]));
    } else {
      dispatch(bodyCheckboxUncheck(rowData[dataKey.current]));
      dispatch(headerCheckbox(false));
    }
  };

  const onRadioBtnClick = () => {
    if (!selectAllChecked) {
      if (selectedRadioOption == 1) {
        if (checkedRows.includes(-1)) {
          dispatch(
            allCheckboxSelection([...data.map((_) => _[dataKey.current])])
          );
        } else {
          dispatch(
            allCheckboxSelection([
              ...new Set([
                ...checkedRows,
                ...data.map((_) => _[dataKey.current]),
              ]),
            ])
          );
        }
        dispatch(
          removedRowsState([
            uncheckedRows.filter(
              (uncheckedRow) =>
                !checkedRows.some((checkedRow) => uncheckedRow === checkedRow)
            ),
          ])
        );
      } else if (selectedRadioOption == 2) {
        dispatch(headerCheckbox(true));
        dispatch(allCheckboxSelection([-1]));
        dispatch(removedRowsState([]));
      } else {
        dispatch(allCheckboxSelection([]));
      }
    } else {
      dispatch(headerCheckbox(false));
      if (selectedRadioOption == 2) {
        dispatch(allCheckboxSelection([]));
      } else {
        dispatch(
          allCheckboxSelection([
            ...checkedRows.filter(
              (checkedRows) =>
                !data.some((_) => _[dataKey.current] === checkedRows)
            ),
          ])
        );
        dispatch(
          removedRowsState([
            ...new Set([
              ...uncheckedRows,
              ...data.map((_) => _[dataKey.current]),
            ]),
          ])
        );
      }
    }
    setModalShow(false);
  };

  const isRowSelected = (rowData) => {
    if (
      checkedRows.includes(-1) &&
      !uncheckedRows.some((_) => _ === rowData[dataKey.current])
    ) {
      return true;
    } else {
      return checkedRows.some((row) => row === rowData[dataKey.current]);
    }
  };

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">
        {selectAllChecked ? "Unselect documents" : "Select documents"}
      </span>
    </div>
  );

  const footerContent = (
    <div className="footer-button">
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        onClick={() => setModalShow(false)}
        style={{ color: "#6C757D", borderColor: "#6C757D" }}
        autoFocus
      />
      <Button
        style={{ backgroundColor: "#066FDE", color: "#FFFFFF" }}
        label="Ok"
        onClick={() => onRadioBtnClick()}
        autoFocus
      />
    </div>
  );

  return (
    <div className="row">
      <div className="col">
        <DataTable
          {...tableConfig}
          value={data}
          paginatorTemplate={CustomPaginatorTemplate({
            totalPages: Math.ceil(totalRecords / tableConfig.rows),
          })}
          emptyMessage={() => (
            <div style={{ textAlign: "center" }}>
              Your query returned no data
            </div>
          )}
          rowExpansionTemplate={rowExpansionTemplate}
          selection={true}
          onCellClick={onCellClick}
          expandedRows={expandedRows}
        >
          <Column
            className="check"
            headerStyle={{ width: "3rem" }}
            align="center"
            header={
              <Checkbox
                onChange={onSelectAllChange}
                checked={selectAllChecked}
              />
            }
            body={(rowData) => {
              return (
                <Checkbox
                  checked={isRowSelected(rowData)}
                  onChange={(e) => onCheckboxChange(e, rowData)}
                />
              );
            }}
          />

          {sageTableUtil.createColumnDefinition(columnDef, false)}
        </DataTable>
      </div>

      {modalShow && (
        <SelectAllModal
          visible={modalShow}
          header={headerElement}
          footer={footerContent}
          onHideHandler={() => setModalShow(false)}
          radioOptions={radioOptions}
          setSelectedRadioOption={setSelectedRadioOption}
          selectedRadioOption={selectedRadioOption}
        />
      )}
    </div>
  );
}
