import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { ProductService } from '../../../app/summarize/service/ProductService';
import util from './utility/sageTableUtility'

export default function SageDataTable(props) {

    const { tableConfig } = props;
    const { columnDef } = props;

    const [summmaryData, setSummmaryData] = useState([]);
    const [columnDefinations, setColumnDefinations] = useState(util.createColumnDefinition(columnDef, false));
    const [expandedRows, setExpandedRows] = useState(null);



    // Expanding row logic
    const onCellClick = (e) => {
        let data = e.rowData;
        let newExpandData = null;
        if (expandedRows == null) {
            newExpandData = [data];
        } else {
            let filterData = expandedRows.filter(d => d.RecId != data.RecId);
            if (filterData.length == expandedRows.length) {
                filterData.push(data);
            }
            newExpandData = filterData.length ? [...filterData] : null;
        }
        setExpandedRows(newExpandData);
    }
    // Expanding row template
    const rowExpansionTemplate = (data) => {
        return (
            <td colSpan={6}>{data.Summary}</td>
        );
    }

    const defaultTableConfig = {
        value: summmaryData,
        dataKey:"RecId",
        resizableColumns: true,
        showGridlines: true,
        stripedRows: true,
        paginator: true,
        rows: 25,
        filterDisplay: "row",
        tableStyle: { minWidth: '50rem' },
        cellSelection: true,
        paginatorLeft: true,
        tableClassName: "table table-border table-hover table-bordered align-middle dataTable no-footer",
        paginatorTemplate: "CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown",
        currentPageReportTemplate: "Total: {totalRecords} entries",
        onCellClick: onCellClick,
        expandedRows: expandedRows,
        rowExpansionTemplate: rowExpansionTemplate
    };



    const loadData = () => {
        ProductService.getSummaryData().then(data => {
            setSummmaryData(data)
            setColumnDefinations(util.createColumnDefinition(columnDef, false));
        });
    }

    useEffect(() => {
        setColumnDefinations(util.createColumnDefinition(columnDef, true));
        ProductService.getSummaryData().then(data => setSummmaryData(data));
        setTimeout(loadData, 1000);
    }, []);

    return (
        <DataTable {...{ ...defaultTableConfig, ...tableConfig }} >
            {columnDefinations}
        </DataTable>
    );
}
