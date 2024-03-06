import React from "react";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";

const SageTableUtility = {
  createColumnDefinition: (columns, isSkeleton = false) => {
    let orderedColumns = columns
      .slice()
      .sort((x, y) => x.props.order - y.props.order);
    return orderedColumns.map(({ props: column }) => {
      return (
        <Column
          key={column.field}
          field={column.field}
          header={column.header}
          body={isSkeleton ? <Skeleton /> : column.body}
          filter={column.isFilterable}
          headerStyle={column.headerStyle ?? null}
          sortable={column.isSortable}
          style={column.style}
          filterMatchMode="contains"
          showFilterMenu={false}
          showClearButton={false}
          align="center"
          selectionMode={column.selectionMode}
          className={column.className}
          cellClickable={column.cellClickable}
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
      paginator:
        tableConfig.paginator == undefined || tableConfig.paginator == true
          ? true
          : false,
      rows: tableConfig.rows ?? 25,
      filterDisplay: "row",
      //tableStyle: tableConfig.style, //{ minWidth: '50rem' },
      cellSelection: tableConfig.cellSelection,
      // paginatorLeft: true,
      tableClassName:
        "table table-border table-hover table-bordered align-middle sageDataTable no-footer table-striped",
      lazy: tableConfig.lazy,
      style: tableConfig.style,
      onCellClickHandler: tableConfig.onCellClickHandler,
    };
  },
};
export default SageTableUtility;
