import React from "react";
import SummaryHeader from "./modules/summary/SummaryHeader";

import SageDataTable from '../../libs/shared/data-grid/SageDataTable';

import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

export default function App() {

    const showSkeleton = true;

    let collDef = [
        {
            body: <input type="checkbox" />,
            field: "RecId",
            header: <input type="checkbox" />,
            isSortable: false,
            isFilterable: false,
            width: "3rem",
        },
        {
            body: (row) => { return (<span>{row.DateTime}</span>); },
            field: "DateTime",
            header: "Date/Time",
            isSortable: true,
            isFilterable: true,
            width: "10rem",
        },
        {
            body: (row) => { return (<span>{row.User}</span>); },
            field: "User",
            header: "User",
            isSortable: true,
            isFilterable: true,
            width: "10rem",
        },
        {
            body: (row) => { return (<span>{row.DocumentId}</span>); },
            field: "DocumentId",
            header: "DocId (Fed to AI)",
            isSortable: true,
            isFilterable: true,
            width: "10rem",
        },
        {
            body: (row) => { return (<span>{row.Summary}</span>); },
            field: "Summary",
            header: "Summary",
            isSortable: true,
            isFilterable: true,
            width: "10rem",
        },
        {
            body: (row) => { return (<span>{row.Notes}</span>); },
            field: "Notes",
            header: "Notes",
            isSortable: true,
            isFilterable: true,
            width: "10rem",
        },
    ];

    return (
        <div className="App">
            <SummaryHeader />
            <SageDataTable columnDef={collDef} />
        </div>
    );
}

