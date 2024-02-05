import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService';


function customHeader(row) {
    debugger;
    return (
        <>

        </>
    )
}

export default function PrimeReactDatatable() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getProductsBig().then(data => setProducts(data));
    }, []);

    return (
        <div className="card">
            <DataTable value={products} resizableColumns showGridlines stripedRows paginator rows={10}
                filterDisplay="row" tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code" sortable filter></Column>
                <Column field="name" header="Name" sortable filter></Column>
                <Column field="category" header="Category" sortable filter></Column>
                <Column field="quantity" header="Quantity" sortable filter></Column>
            </DataTable>
        </div>
    );
}
