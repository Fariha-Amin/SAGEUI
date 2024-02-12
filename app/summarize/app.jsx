import React from "react";
import SummaryHeader from "./modules/summary/SummaryHeader";

import SageDataTable from './components/SageDataTable';

import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

export default function App() {

    const showSkeleton = true;

    return (
        <div className="App">
            <SummaryHeader />
            <SageDataTable showSkeleton={showSkeleton} />
        </div>
    );
}
