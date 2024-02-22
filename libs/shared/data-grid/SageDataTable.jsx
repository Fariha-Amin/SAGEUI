import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { ProductService } from "../../../app/summarize/service/ProductService";
import sageTableUtil from "./utility/sageTableUtility";
import CustomPaginatorTemplate from "./CustomPaginatorTemplate";
import { DataService } from "./utility/DataService";

export default function SageDataTable(props) {
  const [summmaryData, setSummmaryData] = useState([]);

  //const lazyLoadTableCofig=
  const tableConfig = sageTableUtil.createTableConfig(props);
  const { dataUrl, lazy } = props;
  const columnDef = props.children;

  const [data, setData] = useState([]);
  const [columnDefinations, setColumnDefinations] = useState(
    sageTableUtil.createColumnDefinition(columnDef, false)
  );
  const [expandedRows, setExpandedRows] = useState(null);
  const [selectedRows, setSelectedRows] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);

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

    setColumnDefinations(sageTableUtil.createColumnDefinition(columnDef, true));

    DataService.getTableData(dataUrl, {
      dataTableRequest: JSON.stringify(lazyState),
    }).then((apiResponse) => {
      setTotalRecords(apiResponse.totalRecords);
      setData(apiResponse.data);
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

  const onSelectionChange = (event) => {
    const value = event.value;

    setSelectedCustomers(value);
    setSelectAll(value.length === totalRecords);
  };

  // Expanding row logic
  const onCellClick = (e) => {
    let data = e.rowData;
    let newExpandData = null;
    if (expandedRows == null) {
      newExpandData = [data];
    } else {
      let filterData = expandedRows.filter((d) => d.RecId != data.RecId);
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

  const onCheckboxClick = (e) => {
    setSelectedRows(e.value);
  };

  const onDataTableKeyDown = (event) => {
    if (event.keyCode == 13 && event.target.type == "text") {
      console.log(event.target);
      setlazyState({ ...lazyStateTemp });
    }
  };

  return (
    <DataTable
      {...tableConfig}
      value={data}
      onCellClick={onCellClick}
      expandedRows={expandedRows}
      rowExpansionTemplate={rowExpansionTemplate}
      paginatorTemplate={CustomPaginatorTemplate({
        totalPages: Math.ceil(totalRecords / tableConfig.rows),
      })}
      first={lazyState.first}
      totalRecords={totalRecords}
      onPage={onPage}
      onSort={onSort}
      sortField={lazyState.sortField}
      sortOrder={lazyState.sortOrder}
      onFilter={onFilter}
      filters={lazyState.filters}
      onKeyDown={onDataTableKeyDown}
      //   selectionMode="checkbox"
      //   selection={selectedRows}
      //   onSelectionChange={(e) => onCheckboxClick(e)}
      //   onAllRowsSelect={(e) => {
      //     console.log(e);
      //   }}
      //   showSelectAll={false}
    >
      {columnDefinations}
    </DataTable>
  );
}
