import React from "react";
import PrimeReactDatatable from "./PrimeReactDatatable";
import SummaryHeader from "./modules/summary/SummaryHeader";

import './App.css';

export default function App() {

    return (
        <div className="App">
            <SummaryHeader />
            <PrimeReactDatatable />
        </div>
    );
}

