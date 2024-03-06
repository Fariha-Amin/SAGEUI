import './DataTable.scss'
import React from "react";
import { useState } from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function getDefaultSort(props) {
    // Pull sort information off the columns like so:
    // <DataTable>
    //   <DataColumn field="foo" sortable sortOrder={1}/>
    //   <DataColumn field="bar" sortable sortOrder={-1}/>
    // </DataTable>
    return props.children
        .map((column, i) => { return { field: column.props.field, order: column.props.sortOrder }; })
        .filter((sort, i) => sort.field && sort.order);
};

export default function SageDataTable(props) {
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [multiSortMeta, setMultiSortMeta] = useState(getDefaultSort(props));
    const [expandedRows, setExpandedRows] = useState(null);

    let tableProps = {};

    // Apply passthroughs
    tableProps.id = props.id;
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
    if (props.scrollHeight) {
        // Customize scrolling e.g. <DataTable scrollHeight="400px">
        tableProps.scrollHeight = props.scrollHeight;
    }
    tableProps.emptyMessage = (
        <div style={{ textAlign: "center" }}>
            Your query returned no data
        </div>
    );

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
    // Example: 
    // <DataTable onSort={(e) => setSort(e.first, e.rows, e.filters, e.sort)}>
    //   <DataColumn sortable sortOrder={1}/>
    // </DataTable>
    const sortingEnabled = props.children.filter((column, i) => column.props.sortable === true);
    if (sortingEnabled) {
        // Sort order:
        // -1 - descending
        //  0 - none
        //  1 - ascending
        tableProps.sortMode = "multiple";
        tableProps.removableSort = true;
        tableProps.multiSortMeta = multiSortMeta;
        tableProps.sortField = sortField;
        tableProps.sortOrder = sortOrder;

        function onSortDelegate(e) {
            setSortField(e.sortField);
            setSortOrder(e.sortOrder);
            setMultiSortMeta(e.multiSortMeta);

            const modifiedEvent = {
                first: e.first,
                rows: e.rows,
                filters: e.filters,
                sort: e.multiSortMeta
            };
            props.onSort && props.onSort(modifiedEvent);
        };
        tableProps.onSort = onSortDelegate;
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

    // Apply state - sort, page, etc. will be remembered across page reloads
    // Example: <DataTable id={uniqueId} stateful>
    const stateEnabled = props.stateful ? true : false;
    if (stateEnabled) {
        const tableId = props.id;
        if (tableId) {
            tableProps.stateStorage = "session";
            tableProps.stateKey = `sage-dt-state-${tableId}`;
        }
    }

    // Apply row expansion if requested
    // Example: 
    // <DataTable expandable rowExpandedTemplate={template} onRowExpand={(e) => setRow(e)} onRowCollapse={(e) => setRow(e)}>
    //   <DataColumn expander/>
    //   <DataColumn body={(row) => <a onClick={row.toggleRowExpansion} />}/>
    // </DataTable>
    const rowExpansionEnabled = props.expandable ? true : false;
    if (rowExpansionEnabled) {
        tableProps.expandedRows = expandedRows;
        tableProps.rowExpansionTemplate = props.rowExpandedTemplate;
        tableProps.onRowToggle = (e) => setExpandedRows(e.data);
        tableProps.onRowExpand = props.onRowExpand;
        tableProps.onRowCollapse = props.onRowCollapse;
    }

    // Add toggle expansion method to exposed "row" parameter
    for(const item of tableProps.value) {
        item.toggleRowExpansion = (onExpanded, onCollapsed) => {
            const key = item[props.dataKey];

            // Nothing has been expanded yet, set the first one
            if (!expandedRows) {
                let expandedRow = {};
                expandedRow[key] = true;
                setExpandedRows(expandedRow);
                onExpanded && onExpanded(item);
                return;
            }

            // Toggle existing expansions
            let rows = {...expandedRows};
            let row = rows[key];
            if (row == true) {
                delete rows[key];
                setExpandedRows(rows);
                onCollapsed && onCollapsed(item);
            }
            else {
                rows[key] = true;
                setExpandedRows(rows);
                onExpanded && onExpanded(item);
            }
        }
    }

    return (
        <DataTable {...tableProps}>
            {selectColumn}
            {props.children}
        </DataTable>
    );
}
