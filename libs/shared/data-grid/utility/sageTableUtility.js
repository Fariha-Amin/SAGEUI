import React from 'react';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';

const SageTableUtility = {
    createColumnDefination: (columnData, isSkeleton = false)=> {
        return columnData.map(column =>{
            return(
                <Column 
                body={isSkeleton ? <Skeleton /> : column.body }
                field={column.field}
                header={column.header}
                sortable={column.isSortable}
                filter={column.isFilterable}
                showFilterMenu={false}
                showClearButton={false}
                headerStyle={{ width: `${column.width}` }}
                align="center"
                />
            );
        });
    }
}
export default SageTableUtility;
