import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { ProductService } from "../../../app/summarize/service/ProductService";
import sageTableUtil from "./utility/sageTableUtility";
import CustomPaginatorTemplate from "./CustomPaginatorTemplate";

export default function SageDataTable(props) {
  const tableConfig = sageTableUtil.createTableConfig(props);
  const columnDef = props.children;

  const [summmaryData, setSummmaryData] = useState([]);
  const [columnDefinations, setColumnDefinations] = useState(
    sageTableUtil.createColumnDefinition(columnDef, false)
  );
  const [expandedRows, setExpandedRows] = useState(null);
  const [selectedRows, setSelectedRows] = useState(null);

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

  const loadData = () => {
    ProductService.getSummaryData().then((data) => {
      setSummmaryData(data);
      setColumnDefinations(
        sageTableUtil.createColumnDefinition(columnDef, false)
      );
    });
  };

  useEffect(() => {
    setColumnDefinations(sageTableUtil.createColumnDefinition(columnDef, true));
    ProductService.getSummaryData().then((data) => setSummmaryData(data));
    setTimeout(loadData, 1000);
  }, []);

  const onCheckboxClick = (e) => {
    setSelectedRows(e.value);
  };

  return (
    <DataTable
      {...tableConfig}
      value={summmaryData}
      onCellClick={onCellClick}
      expandedRows={expandedRows}
      rowExpansionTemplate={rowExpansionTemplate}
      paginatorTemplate={CustomPaginatorTemplate()}
    >
      {columnDefinations}
    </DataTable>
  );
}
