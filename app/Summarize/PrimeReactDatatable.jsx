import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService';

export default function PrimeReactDatatable() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getProductsBig().then(data => setProducts(data));
    }, []);

    return (
        <div className="card">
            <DataTable  value={products} resizableColumns showGridlines stripedRows paginator paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown" currentPageReportTemplate="Total: {totalRecords} entries" rows={10}
                filterDisplay="row" tableStyle={{ minWidth: '50rem' }} paginatorLeft={true}>
                <Column field="code" header="Code" sortable filter showFilterMenu={false}></Column>
                <Column field="name" header="Name" sortable filter showFilterMenu={false}></Column>
                <Column field="category" header="Category" sortable filter showFilterMenu={false}></Column>
                <Column field="quantity" header="Quantity" sortable filter showFilterMenu={false}></Column>
            </DataTable>
        </div>
    );
}