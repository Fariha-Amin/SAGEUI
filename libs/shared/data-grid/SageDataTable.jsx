import React, { useState, useEffect, lazy } from "react";
import { DataTable } from "primereact/datatable";
import sageTableUtil from "./utility/sageTableUtility";
import CustomPaginatorTemplate from "./CustomPaginatorTemplate";
import { DataService } from "./utility/DataService";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import AllSelectModal from "./AllSelectModal";
import ColumnCheckBox from "./ColumnCheckBox";

export default function SageDataTable(props) {
  const [summmaryData, setSummmaryData] = useState([]);

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
          ...apiResponse.data.filter(
            (data) => !removedRows.some((item) => data.recId === item.recId)
          ),
          -1,
        ]);
      }
      setColumnDefinations(
        sageTableUtil.createColumnDefinition(columnDef, false)
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
      setSelectedRows([...selectedRows, rowData]);
      setRemovedRows(removedRows.filter((row) => row.recId !== rowData.recId));
    } else {
      setSelectedRows(
        selectedRows.filter((row) => row.recId !== rowData.recId)
      );
      removedRows.push(rowData);
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

  const handleOkClick = (childdata) => {
    if (childdata == "currentPage") {
      setSelectedRows(data);
      setRemovedRows([
        removedRows.filter(
          (data) => !selectedRows.some((item) => data.recId === item.recId)
        ),
        -1,
      ]);
      setRemovedRows([]);
    } else if (childdata == "allPages") {
      setSelectAll(true);
      setSelectedRows([...data.concat(-1)]);
      setRemovedRows([]);
    } else {
      setSelectedRows([]);
    }
    setModalShow(false);
  };

  const isRowSelected = (rowData) => {
    return selectedRows.some((row) => row.recId === rowData.recId);
  };

  return (
    <>
      <DataTable
        {...tableConfig}
        value={data}
        paginatorTemplate={CustomPaginatorTemplate({
          totalPages: Math.ceil(totalRecords / tableConfig.rows),
        })}
      >
        <Column
          headerStyle={{ width: "3rem" }}
          header={<Checkbox onChange={onSelectAllChange} checked={selectAll} />}
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
      {modalShow && (
        <AllSelectModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          onClickCallBack={handleOkClick}
        />
      )}
    </>
  );
}
