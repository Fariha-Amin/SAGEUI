import React from "react";
import PrimeReactDatatable from './PrimeReactDatatable';

export default function SageDataTable(props){
    const {showSkeleton} = props;
    return(
        <PrimeReactDatatable showSkeleton={showSkeleton} />
    );
}