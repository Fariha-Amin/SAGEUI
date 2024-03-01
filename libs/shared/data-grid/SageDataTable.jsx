import React, { useState, useEffect, lazy } from "react";
import { DataTable } from "primereact/datatable";
import sageTableUtil from "./utility/sageTableUtility";
import CustomPaginatorTemplate from "./CustomPaginatorTemplate";
import { DataService } from "./utility/DataService";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { useDispatch, useSelector } from "react-redux";
import { checkboxCheck, checkboxUncheck } from "./reducers/checkboxSlice";
import { sageDatatableStore } from "./stores/sageDatatableStore";

export default function SageDataTable(props) {
  const dispatch = useDispatch();
  const checkedRows = useSelector((state) => state.checkbox);

  let tableConfig = sageTableUtil.createTableConfig(props);

  const { dataUrl, lazy } = props;
  const columnDef = props.children;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [expandedRows, setExpandedRows] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [removedRows, setRemovedRows] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedRadioOption, setSelectedRadioOption] = useState(null);
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
      setData(apiResponse.data);
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
    let data = e.rowData;
    let newExpandData = null;
    if (expandedRows == null) {
      newExpandData = [data];
    } else {
      let filterData = expandedRows.filter((d) => d.recId != data.recId);
      if (filterData.length == expandedRows.length) {
        filterData.push(data);
      }
      newExpandData = filterData.length ? [...filterData] : null;
    }
    setExpandedRows(newExpandData);
  };
  // Expanding row template
  const rowExpansionTemplate = (data) => {
    return <td colSpan={6}>{data.Summary}</td>;
  };

  const onDataTableKeyDown = (event) => {
    if (event.keyCode == 13 && event.target.type == "text") {
      console.log(event.target);
      setlazyState({ ...lazyStateTemp });
      setSelectedRows([]);
      setRemovedRows([]);
      setSelectAll(false);
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
      setSelectAll(event.checked ? true : false);
      setSelectedRows(event.checked ? [-1] : []);
    } else {
      setSelectedRadioOption(1);
      setModalShow(true);
    }
  };

  const onCheckboxChange = (e, rowData) => {
    const isChecked = e.checked;

    if (isChecked) {
      // setSelectedRows([...selectedRows, rowData.recId]);
      dispatch(checkboxCheck(rowData.recId));
      setRemovedRows(removedRows.filter((row) => row !== rowData.recId));
    } else {
      // setSelectedRows(selectedRows.filter((row) => row !== rowData.recId));
      dispatch(checkboxUncheck(rowData.recId));
      removedRows.push(rowData.recId);
      setRemovedRows(removedRows);
      setSelectAll(false);
    }
  };

  const onRadioBtnClick = () => {
    if (!selectAll) {
      if (selectedRadioOption == 1) {
        if (selectedRows.includes(-1)) {
          setSelectedRows([...data.map((_) => _.recId)]);
        } else {
          setSelectedRows([
            ...new Set([...selectedRows, ...data.map((_) => _.recId)]),
          ]);
        }
        setRemovedRows([
          removedRows.filter(
            (removedRow) =>
              !selectedRows.some((selectedRow) => removedRow === selectedRow)
          ),
        ]);
      } else if (selectedRadioOption == 2) {
        setSelectAll(true);
        setSelectedRows([-1]);
        setRemovedRows([]);
      } else {
        setSelectedRows([]);
      }
    } else {
      setSelectAll(false);
      if (selectedRadioOption == 2) {
        setSelectedRows([]);
      } else {
        setSelectedRows([
          ...selectedRows.filter(
            (selectedRow) => !data.some((_) => _.recId === selectedRow)
          ),
        ]);
        setRemovedRows([
          ...new Set([...removedRows, ...data.map((_) => _.recId)]),
        ]);
      }
    }
    setModalShow(false);
  };

  const isRowSelected = (rowData) => {
    if (
      checkedRows.includes(-1) &&
      !removedRows.some((_) => _ === rowData.recId)
    ) {
      return true;
    } else {
      return checkedRows.some((row) => row === rowData.recId);
    }
  };

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">
        {selectAll ? "Unselect documents" : "Select documents"}
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
    <div>
      <div>
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
        >
          <Column
            className="check"
            headerStyle={{ width: "3rem" }}
            header={
              <Checkbox onChange={onSelectAllChange} checked={selectAll} />
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
        <Dialog
          visible={modalShow}
          modal
          header={headerElement}
          footer={footerContent}
          style={{ width: "32rem" }}
          onHide={() => setModalShow(false)}
        >
          {radioOptions.map((option) => (
            <div className="p-col p-modal-container" key={option.value}>
              <RadioButton
                inputId={option.value}
                name="option"
                value={option.value}
                onChange={(e) => setSelectedRadioOption(e.value)}
                checked={selectedRadioOption === option.value}
              />
              <label style={{ fontSize: "16px" }} htmlFor={option.value}>
                {option.label}
              </label>
            </div>
          ))}
        </Dialog>
      )}
    </div>
  );
}
