import React from "react";
import SummaryHeader from "./modules/summary/SummaryHeader";
import SageDataTable from '../../libs/shared/data-grid/SageDataTable';
import SageTableColumn from '../../libs/shared/data-grid/column/SageTableColumn'

import "bootstrap/dist/css/bootstrap.min.css";
// import favouriteIcon from "../summarize/icons/favourite.png"
import TableActionButtons from "./components/TableActionButtons";
import ViewDocButton from "./components/ViewDocButton";

import './App.css';

export default function App() {

    return (
        <div className="App">
            <SummaryHeader />

            <SageDataTable
                dataKey="RecId"
                isColumnResizable={false}
                showGridlines={true}
                paginator={true}
                rows={10}
                cellSelection={true}
                style={{ width: '100%', minWidth: '50rem' }}
            >
                <SageTableColumn
                    order={1}
                    selectionMode="multiple"
                    field="RecId"
                    style={{ width: '3.12%' }}

                />
                <SageTableColumn
                    order={2}
                    body={(row)=><ViewDocButton rowData={row} />}
                    field="ViewDoc"
                    header="View Doc"
                    isSortable={false}
                    isFilterable={false}
                    style={{ width: '8.67%' }}

                />
                <SageTableColumn
                    order={3}
                    body={(row) => { return (<span>{row.DateTime}</span>); }}
                    field="DateTime"
                    header="Date/Time"
                    isSortable={true}
                    isFilterable={true}
                    style={{ width: '9.68%' }}
                />
                <SageTableColumn
                    order={4}
                    body={(row) => { return (<span>{row.User}</span>); }}
                    field="User"
                    header="User"
                    isSortable={true}
                    isFilterable={true}
                    style={{ width: '10.16%' }}
                />
                <SageTableColumn
                    order={5}
                    body={(row) => { return (<span>{row.DocumentId}</span>); }}
                    field="DocumentId"
                    header="DocId (Fed to AI)"
                    isSortable={true}
                    isFilterable={true}
                    style={{ width: '12.34%' }}
                />
                <SageTableColumn
                    order={6}
                    body={(row) => { return (<span>{row.Summary}</span>); }}
                    field="Summary"
                    header="Summary"
                    isSortable={true}
                    isFilterable={true}
                    style={{ width: '30.86%' }}
                />
                <SageTableColumn
                    order={7}
                    body={(row) => { return (<span>{row.Notes}</span>); }}
                    field="Notes"
                    header="Notes"
                    isSortable={true}
                    isFilterable={true}
                    style={{ width: '12.57%' }}
                />
                <SageTableColumn
                    order={8}
                    body={(row) => { return (
                        <TableActionButtons rowData={row} />
                    ); }}
                    field="Actions"
                    header=""
                    isSortable={false}
                    isFilterable={false}
                    style={{ width: '12.57%' }}
                />

            </ SageDataTable>

        </div>
    );
}

