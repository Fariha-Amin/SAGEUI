import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';
import {Summary} from './Summary';
import { Skeleton } from 'primereact/skeleton';


export default function PrimeReactDatatable(props) {
    const {showSkeleton} = props;
    const [summmaryData, setSummmaryData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState([true]);
    

    const loadData = ()=>{
        ProductService.getSummaryData().then(data =>{
            setIsDataLoaded(true)
            setSummmaryData(data)
        } );
    }

    useEffect(() => {
        ProductService.getSummaryData().then(data => setSummmaryData(data));
        if(showSkeleton){
            setIsDataLoaded(false);
            setTimeout(loadData, 3000);
        }
    }, []);

    const renderSummary = (row)=>{
        return(<Summary row={row} />);
    }

    if(isDataLoaded){
        return(
            <DataTable
                value={summmaryData}
                resizableColumns
                showGridlines
                stripedRows
                paginator rows={25}
                filterDisplay="row"
                tableStyle={{ minWidth: '50rem' }}
                cellSelection={true}
                paginatorLeft
                >
                
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                <Column field="DateTime" header="Date/Time" sortable filter showFilterMenu={false} showClearButton={false} align="center" />
                <Column field="User" header="User" sortable filter showFilterMenu={false} showClearButton={false} align="center" />
                <Column field="DocumentId" header="DocId (Fed to AI)" sortable filter showFilterMenu={false} showClearButton={false} align="center"/>
                <Column field="Summary" header="Summary" body={renderSummary}  filter showFilterMenu={false} showClearButton={false} align="center" />
                <Column field="Notes" header="Notes" sortable filter showFilterMenu={false} showClearButton={false} align="center" />
            </DataTable>
        );
    }else{
        return(
            <DataTable
                value={summmaryData}
                resizableColumns
                showGridlines
                stripedRows
                paginator rows={25}
                filterDisplay="row"
                tableStyle={{ minWidth: '50rem' }}
                cellSelection={true}
                paginatorLeft
                >
                
                <Column body={<Skeleton />} headerStyle={{ width: '3rem' }} />
                <Column body={<Skeleton />} field="DateTime" header="Date/Time" sortable filter showFilterMenu={false}/>
                <Column body={<Skeleton />} field="User" header="User" sortable filter showFilterMenu={false}/>
                <Column body={<Skeleton />} field="DocumentId" header="DocId (Fed to AI)" sortable filter showFilterMenu={false}/>
                <Column body={<Skeleton />} field="Summary" header="Summary" sortable filter showFilterMenu={false}/>
                <Column body={<Skeleton />} field="Notes" header="Notes" sortable filter showFilterMenu={false}/>
            </DataTable>
        );
    }
    
    
}
