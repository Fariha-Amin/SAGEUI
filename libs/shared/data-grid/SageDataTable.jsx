import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../../../app/summarize/service/ProductService';
import { Summary } from '../../../app/summarize/components/Summary';
import { Skeleton } from 'primereact/skeleton';
import util from './utility/sageTableUtility'

const renderSummary = (row) => {
    return (<Summary row={row} />);
}
function createColumnDefination(columnDef, skeleton = false) {
    if (skeleton) {
        return [
            <Column body={<Skeleton />} headerStyle={{ width: '3rem' }} />,
            <Column body={<Skeleton />} field="DateTime" header="Date/Time" sortable filter showFilterMenu={false} />,
            <Column body={<Skeleton />} field="User" header="User" sortable filter showFilterMenu={false} />,
            <Column body={<Skeleton />} field="DocumentId" header="DocId (Fed to AI)" sortable filter showFilterMenu={false} />,
            <Column body={<Skeleton />} field="Summary" header="Summary" sortable filter showFilterMenu={false} />,
            <Column body={<Skeleton />} field="Notes" header="Notes" sortable filter showFilterMenu={false} />,
            <Column body={<Skeleton />} showFilterMenu={false} headerStyle={{ width: '10rem' }} />
        ];
    } else {
        return [
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />,
            <Column field="DateTime" header="Date/Time" sortable filter showFilterMenu={false} showClearButton={false} align="center" />,
            <Column field="User" header="User" sortable filter showFilterMenu={false} showClearButton={false} align="center" />,
            <Column field="DocumentId" header="DocId (Fed to AI)" sortable filter showFilterMenu={false} showClearButton={false} align="center" />,
            <Column field="Summary" header="Summary" body={renderSummary} filter showFilterMenu={false} showClearButton={false} align="center" />,
            <Column field="Notes" header="Notes" sortable filter showFilterMenu={false} showClearButton={false} align="center" />,
            <Column showFilterMenu={false} headerStyle={{ width: '10rem' }} />
        ]
    }
    // columnDef.forEach(column => {
    //     columnDefinations.push(
    //         <Column field="User" header="User" sortable filter showFilterMenu={false} showClearButton={false} align="center" />,
    //     );
    // });
    //return columnDefinations;
}


export default function SageDataTable(props) {

    const { tableConfig } = props;
    const { columnDef } = props;

    const [summmaryData, setSummmaryData] = useState([]);
    const [columnDefinations, setColumnDefinations] = useState(util.createColumnDefination(columnDef, false));
    const [expandedRows, setExpandedRows] = useState(null);



    // Expanding row logic
    const onRowClick = (e) => {
        let data = e.data;
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
        resizableColumns: true,
        showGridlines: true,
        stripedRows: true,
        paginator: true,
        rows: 25,
        filterDisplay: "row",
        tableStyle: { minWidth: '50rem' },
        cellSelection: true,
        paginatorLeft: true,
        tableClassName: "table table-striped table-hover table-bordered align-middle dataTable no-footer",
        paginatorTemplate: "CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown",
        currentPageReportTemplate: "Total: {totalRecords} entries",
        onRowClick: onRowClick,
        expandedRows: expandedRows,
        rowExpansionTemplate: rowExpansionTemplate
    };



    const loadData = () => {
        ProductService.getSummaryData().then(data => {
            setSummmaryData(data)
            setColumnDefinations(util.createColumnDefination(columnDef, false));
        });
    }

    useEffect(() => {
        setColumnDefinations(util.createColumnDefination(columnDef, true));
        ProductService.getSummaryData().then(data => setSummmaryData(data));
        setTimeout(loadData, 3000);
    }, []);

    return (
        <DataTable {...{ ...defaultTableConfig, ...tableConfig }} >
            {columnDefinations}
        </DataTable>
    );
}
