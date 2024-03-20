import './DataTable.scss'
import React from "react";
import { useState, useEffect } from 'react';
import { DataTable } from "primereact/datatable";
import DataColumn from "./DataColumn";
import StateChangedEvent from "./stateChangedEvent";

function getDefaultSort(props) {
    // Pull sort information off the columns like so:
    // <DataTable>
    //   <DataColumn field="foo" sortable sortOrder={1}/>
    //   <DataColumn field="bar" sortable sortOrder={-1}/>
    // </DataTable>
    return props.children
        .map((column, i) => {
            return {
                field: column.props.field,
                order: column.props.sortOrder
            };
        })
        .filter((sort, i) => sort.field && sort.order);
};

function getStartingPage(props) {
    // Convert 0-based page number to data index
    const pageNumber = props.startPage || 0;
    const recordsPerPage = props.rowsPerPage || 25;
    const startIndex = pageNumber * recordsPerPage;
    return startIndex;
};

export default function SageDataTable(props) {
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [multiSortMeta, setMultiSortMeta] = useState(getDefaultSort(props));
    const [selectedRows, setSelectedRows] = useState(props.selectedRows);
    const [expandedRows, setExpandedRows] = useState(props.expandedRows);
    const [first, setFirst] = useState(getStartingPage(props));
    const [rows, setRows] = useState(props.rowsPerPage || 25);

    useEffect(() => {
        setSelectedRows(props.selectedRows);
        props.onSelectionChange && props.onSelectionChange(props.selectedRows);
    }, [props.selectedRows]);

    useEffect(() => {
        setExpandedRows(props.expandedRows);
        props.onExpansionChange && props.onExpansionChange(props.expandedRows);
    }, [props.expandedRows]);

    let tableProps = {};
    let columnProps = props.children.map((child, i) => { return { key: child.key, ...child.props }; });
    for (const columnProp of columnProps) {
        columnProp.className = columnProp.className ? `sage-table__column ${columnProp.className}` : "sage-table__column";
        columnProp.headerClassName = columnProp.headerClassName ? `sage-table__header ${columnProp.headerClassName}` : "sage-table__header";
        columnProp.footerClassName = columnProp.footerClassName ? `sage-table__footer ${columnProp.footerClassName}` : "sage-table__footer";
        columnProp.bodyClassName = columnProp.bodyClassName ? `sage-table__body ${columnProp.bodyClassName}` : "sage-table__body";
    }

    // Apply passthroughs
    tableProps.id = props.id;
    tableProps.dataKey = props.dataKey;
    tableProps.value = props.data;
    tableProps.style = props.style;
    tableProps.className = props.className ? `sage-table ${props.className}` : "sage-table";
    tableProps.loading = props.loading;

    // Apply defaults
    tableProps.stripedRows = true;
    tableProps.showGridlines = false;
    tableProps.resizableColumns = false;
    tableProps.reorderableColumns = false;
    tableProps.reorderableRows = false;
    tableProps.selectionAutoFocus = false;
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
    // Example: <DataTable pageable rowsPerPage={25} rowsPerPageOptions={[25,50,100]} page={(e) => customPage(e)} onPage={(e) => reportPaged(e)} startPage={2}>
    const pagingEnabled = props.pageable ? true : false;
    if (pagingEnabled) {
        tableProps.paginator = true;
        tableProps.rowsPerPageOptions = props.rowsPerPageOptions;
        tableProps.first = first;
        tableProps.rows = rows;

        function onPageDelegate(e) {
            setFirst(e.first);
            setRows(e.rows);

            const stateChangedEvent = new StateChangedEvent(e);
            props.page && props.page(stateChangedEvent);
            props.onPage && props.onPage(stateChangedEvent);
        };
        tableProps.onPage = onPageDelegate;
    }

    // Apply sorting if any column is "sortable=true"
    // Example: 
    // <DataTable sort={(e) => customSort(e)} onSort={(e) => reportSorted(e)}>
    //   <DataColumn sortable sortOrder={1}/>
    // </DataTable>
    const sortingEnabled = columnProps.filter((column, i) => column.sortable === true);
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

            const stateChangedEvent = new StateChangedEvent(e);
            props.sort && props.sort(stateChangedEvent);
            props.onSort && props.onSort(stateChangedEvent);
        };
        tableProps.onSort = onSortDelegate;
    }

    // Apply row selection if requested
    // Example: 
    // <DataTable selectable selectionType={single|multiple} selectedRows={[rows]} onSelectionChange={(e) => setSelectedItem(e)}>
    //   <DataColumn selector />
    //   <DataColumn body={(row) => <a onClick={row.toggleRowSelection|row.unselectRow|row.selectRow} />} />
    // </DataTable>
    const selectingEnabled = props.selectable ? true : false;
    if (selectingEnabled) {
        tableProps.selection = selectedRows;
        tableProps.onSelectionChange = (e) => {
            setSelectedRows(e.value);
            props.onSelectionChange && props.onSelectionChange(e.value);
        };

        const selectors = columnProps.filter((column, i) => column.selector === true);
        if (props.selectionType === "single") {
            tableProps.selectionMode = "radiobutton";
            for (const selector of selectors) {
                selector.selectionMode = "single";
            }
        }
        else {
            // Assume "multiple" if "single" is not specified
            tableProps.selectionMode = "checkbox";
            for (const selector of selectors) {
                selector.selectionMode = "multiple";
            }
        }
    }

    function select(item, onSelected) {
        const key = item[props.dataKey];

        let rows = [];
        if (selectedRows) {
            rows = [...selectedRows];
        }

        const selectedRow = rows.find(i => i[props.dataKey] === key);
        if (selectedRow) {
            // It's already selected
            return;
        }

        rows.push(item);
        setSelectedRows(rows);
        props.onSelectionChange && props.onSelectionChange(rows);
        onSelected && onSelected(item);
    }

    function unselect(item, onUnselected) {
        const key = item[props.dataKey];

        // Nothing has been selected yet so there is nothing to unselect
        if (!selectedRows) {
            return;
        }

        const tempArray = selectedRows.filter(i => i[props.dataKey] != key);
        setSelectedRows(tempArray);
        props.onSelectionChange && props.onSelectionChange(tempArray);
        onUnselected && onUnselected(item);
    }

    function toggleSelect(item, onSelected, onUnselected) {
        const key = item[props.dataKey];

        // Nothing has been selected yet, set the first one
        if (!selectedRows) {
            select(item, onSelected);
            return;
        }

        // Toggle existing selections
        const selectedRow = selectedRows.find(i => i[props.dataKey] === key);
        if (selectedRow) {
            unselect(item, onUnselected);
        }
        else {
            select(item, onSelected);
        }
    }

    // Add helper methods to the exposed "row" parameter
    for (const item of tableProps.value) {
        item.toggleRowSelection = (event, onSelected, onUnselected) => {
            toggleSelect(item, onSelected, onUnselected);
        };
        item.unselectRow = (event, onUnselected) => {
            unselect(item, onUnselected);
        };
        item.selectRow = (event, onSelected) => {
            select(item, onSelected);
        };
    }

    // Apply row expansion if requested
    // Example: 
    // <DataTable expandable rowExpandedTemplate={template} onExpansionChange={(e) => setRow(e)}>
    //   <DataColumn expander />
    //   <DataColumn body={(row) => <a onClick={row.toggleRowExpansion|row.expandRow|row.collapseRow} />} />
    // </DataTable>
    const rowExpansionEnabled = props.expandable ? true : false;
    if (rowExpansionEnabled) {
        tableProps.expandedRows = expandedRows;
        tableProps.rowExpansionTemplate = props.rowExpandedTemplate;
        tableProps.onRowToggle = (e) => {
            setExpandedRows(e.data);
            props.onExpansionChange && props.onExpansionChange(e.data);
        }
    }

    function expand(item, onExpanded) {
        const key = item[props.dataKey];

        let rows = { ...expandedRows };
        let row = rows[key];
        if (!row) {
            rows[key] = true;
            setExpandedRows(rows);
            props.onExpansionChange && props.onExpansionChange(rows);
            onExpanded && onExpanded(item);
        }
    }

    function collapse(item, onCollapsed) {
        const key = item[props.dataKey];

        // Nothing has been expanded yet so there is nothing to collapse
        if (!expandedRows) {
            return;
        }

        let rows = { ...expandedRows };
        let row = rows[key];
        if (row == true) {
            delete rows[key];
            setExpandedRows(rows);
            props.onExpansionChange && props.onExpansionChange(rows);
            onCollapsed && onCollapsed(item);
        }
    }

    function toggleExpansion(item, onExpanded, onCollapsed) {
        const key = item[props.dataKey];

        // Nothing has been expanded yet, set the first one
        if (!expandedRows) {
            expand(item, onExpanded);
            return;
        }

        // Toggle existing expansions
        let rows = { ...expandedRows };
        let row = rows[key];
        if (row == true) {
            collapse(item, onCollapsed);
        }
        else {
            expand(item, onExpanded);
        }
    }

    // Add helper methods to the exposed "row" parameter
    for (const item of tableProps.value) {
        item.toggleRowExpansion = (event, onExpanded, onCollapsed) => {
            toggleExpansion(item, onExpanded, onCollapsed);
        };
        item.expandRow = (event, onExpanded) => {
            expand(item, onExpanded);
        };
        item.collapseRow = (event, onCollapsed) => {
            collapse(item, onCollapsed);
        };
    }

    // Apply server-side handling
    // Example: <DataTable serverSide totalRecords={total}>
    const serverSide = props.serverSide ? true : false;
    if (serverSide) {
        tableProps.lazy = true;
        tableProps.totalRecords = props.totalRecords;
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

    return (
        <DataTable {...tableProps}>
            {columnProps.map((col, i) => (<DataColumn {...col} />))}
        </DataTable>
    );
}
