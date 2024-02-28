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
import AllSelectModal from "./AllSelectModal";
import ColumnCheckBox from "./ColumnCheckBox";

export default function SageDataTable(props) {
  //const lazyLoadTableCofig=
  let tableConfig = sageTableUtil.createTableConfig(props);

  const { dataUrl, lazy } = props;
  const columnDef = props.children;

  const [data, setData] = useState([]);
  const [columnDefinations, setColumnDefinations] = useState(
    sageTableUtil.createColumnDefinition(columnDef, false)
  );
  const [expandedRows, setExpandedRows] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [removedRows, setRemovedRows] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [headerChecked, setHeaderChecked] = useState(false);

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
    rows: 25,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: filterStateInitial,
  });

  const [lazyStateTemp, setlazyStateTemp] = useState({});

  let networkTimeout = null;

  useEffect(() => {
    loadLazyData();
  }, [lazyState]);

  const loadLazyData = () => {
    //setLoading(true);

    if (networkTimeout) {
      clearTimeout(networkTimeout);
    }

    setColumnDefinations(
      sageTableUtil.createColumnDefinition(columnDef, false)
    );

    DataService.getTableData(dataUrl, {
      dataTableRequest: JSON.stringify(lazyState),
    }).then((apiResponse) => {
      setTotalRecords(apiResponse.totalRecords);
      setData(apiResponse.data);
      if (selectedRows.includes(-1)) {
        setSelectedRows([
          ...apiResponse.data
            .filter(
              (data) =>
                !removedRows.some(
                  (removedRecId) => data.recId === removedRecId
                ) &&
                !selectedRows.some((addedRecId) => data.recId === addedRecId)
            )
            .map((data) => data.recId),
          -1,
        ]);
      }
      setColumnDefinations(
        sageTableUtil.createColumnDefinition(columnDef, false) // Updated to pass currentSortField
      );
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

  const onCheckboxClick = (e, rowData) => {
    const isChecked = e.checked;
    if (isChecked) {
      setSelectedRows([...selectedRows, rowData.recId]);
      setRemovedRows(removedRows.filter((row) => row !== rowData.recId));
    } else {
      setSelectedRows(selectedRows.filter((row) => row !== rowData.recId));
      removedRows.push(rowData.recId);
      setRemovedRows(removedRows);
      setSelectAll(false);
    }
  };

  const onDataTableKeyDown = (event) => {
    if (event.keyCode == 13 && event.target.type == "text") {
      console.log(event.target);
      setlazyState({ ...lazyStateTemp });
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
    };

    tableConfig = { ...tableConfig, ...tableConfigLazy };
  }

  const onSelectAllChange = (event) => {
    const selectAll = event.checked;

    if (selectAll) {
    setModalShow(true);
     } else {
      setSelectAll(false);
       setSelectedRows([]);
   }
  };

  const handleAllCheckOkClick = () => {
    if (selectedOption == "single") {
      setSelectedRows([...selectedRows, ...data.map((_) => _.recId)]);
      setRemovedRows([
        removedRows.filter(
          (removedRow) =>
            !selectedRows.some((selectedRow) => removedRow === selectedRow)
        ),
        -1,
      ]);
      setRemovedRows([]);
    } else if (selectedOption == "all") {
      setSelectAll(true);
      setSelectedRows([...data.map((_) => _.recId).concat(-1)]);
      setRemovedRows([]);
    } else {
      setSelectedRows([]);
    }
    setModalShow(false);
  };

  const isRowSelected = (rowData) => {
    return selectedRows.some((row) => row === rowData.recId);
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
        autoFocus
      />
      <Button label="Ok" onClick={() => handleAllCheckOkClick()} autoFocus />
    </div>
  );

  const radioOptions = [
    { label: "Documents on current page", value: "single" },
    { label: "Documents across all pages", value: "all" },
  ];

  const [selectedOption, setSelectedOption] = useState(null); // State to hold the selected option

  return (
    <div>
      <div>
        <DataTable
          {...tableConfig}
          value={data}
          paginatorTemplate={CustomPaginatorTemplate({
            totalPages: Math.ceil(totalRecords / tableConfig.rows),
          })}
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
                  onChange={(e) => onCheckboxClick(e, rowData)}
                />
              );
            }}
          />

          {columnDefinations}
        </DataTable>
      </div>
      {
        <Dialog
          visible={modalShow}
          modal
          header={headerElement}
          footer={footerContent}
          style={{ width: "35rem" }}
          onHide={() => setModalShow(false)}
          closable={false}
        >
          {radioOptions.map((option) => (
            <div className="p-col p-modal-container" key={option.value}>
              <RadioButton
                inputId={option.value}
                name="option"
                value={option.value}
                onChange={(e) => setSelectedOption(e.value)}
                checked={selectedOption === option.value}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </Dialog>
      }
    </div>
  );
}
