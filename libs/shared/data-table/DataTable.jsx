import './DataTable.scss'
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function SageDataTable(props) {

    let tableProps = {};

    // Apply passthroughs
    tableProps.id = props.id;
    tableProps.name = props.name;
    tableProps.dataKey = props.dataKey;
    tableProps.value = props.value;
    tableProps.style = props.style;
    tableProps.className = props.className;
    tableProps.loading = props.loading;

    // Apply defaults
    tableProps.stripedRows = true;
    tableProps.showGridlines = false;
    tableProps.resizableColumns = false;
    tableProps.reorderableColumns = false;
    tableProps.reorderableRows = false;
    tableProps.scrollable = true;
    tableProps.scrollHeight = "flex";

    // Apply paging if requested
    // Example: <DataTable rowsPerPage={25} rowsPerPageOptions={[25,50,100]} onPage={(e) => setPage(e.first, e.rows, e.page, e.pageCount)}>
    const pagingEnabled = props.rowsPerPageOptions ? true : false;
    if (pagingEnabled) {
        tableProps.paginator = true;
        tableProps.rows = props.rowsPerPage || 25;
        tableProps.rowsPerPageOptions = props.rowsPerPageOptions;
        tableProps.onPage = props.onPage;
    }

    // Apply sorting if any column is "sortable=true"
    // Example: <DataColumn sortable sortOrder={1} onSort={(e) => setSort(e)}/>
    const sortingEnabled = props.children.filter((column, i) => column.props.sortable === true);
    if (sortingEnabled) {
        // Sort order:
        // -1 - descending
        //  0 - none
        //  1 - ascending
        tableProps.sortMode = "multiple";
        tableProps.removableSort = true;
        const fieldOrder = props.children
            .map((column, i) => { return { field: column.props.field, order: column.props.sortOrder }; })
            .filter((sort, i) => sort.field && sort.order);
        tableProps.multiSortMeta = fieldOrder;
        tableProps.onSort = props.onSort;
    }

    // Apply row selection if requested
    // Example: <DataTable selectionMode={single|multiple} selection={selectedItem} onSelectionChange={(e) => setSelectedItem(e.value)}>
    let selectColumn = null;
    const selectingEnabled = props.selectionMode ? true : false;
    if (selectingEnabled) {
        tableProps.selection = props.selection;
        tableProps.onSelectionChange = props.onSelectionChange;
        if (props.selectionMode === "single") {
            tableProps.selectionMode = "radiobutton";
            selectColumn = (<Column selectionMode="single"></Column>);
        }
        else if (props.selectionMode === "multiple") {
            tableProps.selectionMode = "checkbox";
            selectColumn = (<Column selectionMode="multiple"></Column>);
        }
    }

    // Customize scrolling
    // Example: <DataTable scrollHeight="400px">
    if (props.scrollHeight) {
        tableProps.scrollHeight = props.scrollHeight;
    }

    // Apply state - sort, page, etc. will be remembered across page reloads
    // Example: <DataTable id={uniqueId} stateful>
    const stateEnabled = props.stateful ? true : false;
    if (stateEnabled) {
        const tableId = props.id;
        if (tableId) {
            tableProps.stateStorage = "session";
            tableProps.stateKey = `sage-dt-state-${id}`;
        }
    }

    const noDataMessage = (
        <div style={{ textAlign: "center" }}>
            Your query returned no data
        </div>
    );

    return (
        <DataTable {...tableProps} emptyMessage={noDataMessage}>
            {selectColumn}
            {props.children}
        </DataTable>
    );
}
