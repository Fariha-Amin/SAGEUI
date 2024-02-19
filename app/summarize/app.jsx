import React from "react";
import SummaryHeader from "./modules/summary/SummaryHeader";

import SageDataTable from '../../libs/shared/data-grid/SageDataTable';
import SageTableColumn from '../../libs/shared/data-grid/column/SageTableColumn'
import MeasuredDisplay from '../../libs/shared/data-grid/MeasuredDisplay'

import "bootstrap/dist/css/bootstrap.min.css";

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
                tableStyle={{ minWidth: '50rem' }}
                cellSelection={true}
            >
                <SageTableColumn
                    order={1}
                    body={<input type="checkbox" />}
                    field="RecId"
                    header={<input type="checkbox" />}
                    isSortable={false}
                    isFilterable={false}
                />
                <SageTableColumn
                    order={2}
                    body={(row) => { return (<MeasuredDisplay displayText={row.DateTime}/>); }}
                    field="DateTime"
                    header="Date/Time"
                    isSortable={true}
                    isFilterable={true}
                />
                <SageTableColumn
                    order={3}
                    body={(row) => { return (<MeasuredDisplay displayText={row.User}/>); }}
                    field="User"
                    header="User"
                    isSortable={true}
                    isFilterable={true}
                />
                <SageTableColumn
                    order={4}
                    body={(row) => { return (<MeasuredDisplay displayText={row.DocumentId}/>); }}
                    field="DocumentId"
                    header="DocId (Fed to AI)"
                    isSortable={true}
                    isFilterable={true}
                />
                <SageTableColumn
                    order={5}
                    body={(row) => { return (<MeasuredDisplay displayText={row.Summary} hideToolTip={true}/>); }}
                    field="Summary"
                    header="Summary"
                    isSortable={true}
                    isFilterable={true}
                />
                <SageTableColumn
                    order={6}
                    body={(row) => { return (<MeasuredDisplay displayText={row.Notes}/>); }}
                    field="Notes"
                    header="Notes"
                    isSortable={true}
                    isFilterable={true}
                />

            </ SageDataTable>
            
        </div>
    );
}

