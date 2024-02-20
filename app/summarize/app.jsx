import React, { useState } from "react";
import SummaryHeader from "./modules/summary/SummaryHeader";
import SageDataTable from "../../libs/shared/data-grid/SageDataTable";
import SageTableColumn from "../../libs/shared/data-grid/column/SageTableColumn";
import { Checkbox } from "primereact/checkbox";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const [selectedRows, setSelectedRows] = useState(null);

  const onCheckboxClick = (rowData) => {
    setSelectedRows(rowData);

    console.log(rowData);
    console.log(selectedRows);

  };

  return (
    <div className="App">
      <SummaryHeader />

      <SageDataTable
        dataKey="RecId"
        isColumnResizable={false}
        showGridlines={true}
        paginator={true}
        rows={10}
        tableStyle={{ minWidth: "50rem" }}
        cellSelection={true}
      >
        <SageTableColumn
          order={1}
        //   selectionMode="multiple"
          field="RecId"
          header={<Checkbox onChange={(e) => onCheckboxClick(e)}/>}
          body={(rowData) => (<Checkbox onChange={() => onCheckboxClick(rowData)} />)}
        />
        <SageTableColumn
          order={2}
          body={(row) => {
            return <span>{row.DateTime}</span>;
          }}
          field="DateTime"
          header="Date/Time"
          isSortable={true}
          isFilterable={true}
        />
        <SageTableColumn
          order={3}
          body={(row) => {
            return <span>{row.User}</span>;
          }}
          field="User"
          header="User"
          isSortable={true}
          isFilterable={true}
        />
        <SageTableColumn
          order={4}
          body={(row) => {
            return <span>{row.DocumentId}</span>;
          }}
          field="DocumentId"
          header="DocId (Fed to AI)"
          isSortable={true}
          isFilterable={true}
        />
        <SageTableColumn
          order={5}
          body={(row) => {
            return <span>{row.Summary}</span>;
          }}
          field="Summary"
          header="Summary"
          isSortable={true}
          isFilterable={true}
        />
        <SageTableColumn
          order={6}
          body={(row) => {
            return <span>{row.Notes}</span>;
          }}
          field="Notes"
          header="Notes"
          isSortable={true}
          isFilterable={true}
        />
      </SageDataTable>
    </div>
  );
}
