import React from "react";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";

const SageTableUtility = {
  createColumnDefinition: (columns, isSkeleton = false) => {
    let orderedColumns = columns
      .map((column) => column)
      .sort((c1, c2) => c1.props.order - c2.props.order);
    return orderedColumns.map(({ props: column }) => {
      return (
        <Column
          key={column.field}
          field={column.field}
          header={column.header}
          body={isSkeleton ? <Skeleton /> : column.body}
          sortable={column.isSortable}
          filter={column.isFilterable}
          headerStyle={column.style}
          filterMatchMode="contains"
          showFilterMenu={false}
          showClearButton={false}
          align="center"
        />
      );
    });
  },
  createTableConfig: (tableConfig) => {
    return {
      //value: summmaryData,
      dataKey: tableConfig.dataKey,
      resizableColumns: tableConfig.isColumnResizable ?? false,
      showGridlines:
        tableConfig.showGridlines == undefined ||
        tableConfig.showGridlines == true
          ? true
          : false,
      stripedRows: true,
      paginator:
        tableConfig.paginator == undefined || tableConfig.paginator == true
          ? true
          : false,
      rows: tableConfig.rows ?? 25,
      filterDisplay: "row",
      tableStyle: tableConfig.style, //{ minWidth: '50rem' },
      cellSelection: tableConfig.cellSelection,
      paginatorLeft: true,
      tableClassName:
        "table table-border table-hover table-bordered align-middle dataTable no-footer",
      paginatorTemplate:
        "CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown",
      currentPageReportTemplate: "Total: {totalRecords} entries",
      lazy: tableConfig.lazy,
      //onCellClick: onCellClick,
      //expandedRows: expandedRows,
      //rowExpansionTemplate: rowExpansionTemplate
    };
  },
};
export default SageTableUtility;
