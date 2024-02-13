import React from "react";
import SummaryHeader from "./modules/summary/SummaryHeader";

import SageDataTable from '../../libs/shared/data-grid/SageDataTable';

import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

export default function App() {

    const showSkeleton = true;

    let collDef =[
        {
            body: (row)=>{return(<span>{row.DateTime}</span>);},
            field:"DateTime",
            header:"Date/Time",
            isSortable:true,
            isFilterable:true,
            width:"10rem",
        }
    ];

    return (
        <div className="App">
            <SummaryHeader />
            <SageDataTable columnDef={collDef} />
        </div>
    );
}

