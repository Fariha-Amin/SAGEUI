import React, { useState } from "react";
import SummaryHeader from "./modules/summary/SummaryHeader";
import SageDataTable from "../../libs/shared/data-grid/SageDataTable";
import SageTableColumn from "../../libs/shared/data-grid/column/SageTableColumn";
import MeasuredDisplay from "../../libs/shared/data-grid/MeasuredDisplay";
import "bootstrap/dist/css/bootstrap.min.css";

import TableActionButtons from "./components/TableActionButtons";
import ViewDocButton from "./components/ViewDocButton";

import "./App.css";

export default function App() {
  return (
    <div className="App">
      <SummaryHeader />

      <SageDataTable
        dataKey="RecId"
        isColumnResizable={false}
        showGridlines={true}
        paginator={true}
        rows={25}
        style={{ width: "100%", minWidth: "50rem" }}
        cellSelection={true}
        lazy={true}
        dataUrl="http://localhost:5000/api/getTableData"
      >
        <SageTableColumn
          order={2}
          body={(row) => <ViewDocButton rowData={row} />}
          field="ViewDoc"
          header="View Doc"
          isSortable={false}
          isFilterable={false}
          style={{ width: "111px", maxWidth: "111px" }}
        />
        <SageTableColumn
          order={3}
          body={(row) => {
            return <MeasuredDisplay displayText={row.DateTime} />;
          }}
          field="DateTime"
          header="Date/Time"
          isSortable={true}
          isFilterable={true}
          style={{ width: "124px", maxWidth: "124px" }}
        />
        <SageTableColumn
          order={4}
          body={(row) => {
            return <MeasuredDisplay displayText={row.User} />;
          }}
          field="User"
          header="User"
          isSortable={true}
          isFilterable={true}
          style={{ width: "130px", maxWidth: "130px" }}
        />
        <SageTableColumn
          order={5}
          body={(row) => {
            return <MeasuredDisplay displayText={row.DocumentId} />;
          }}
          field="DocumentId"
          header="DocId (Fed to AI)"
          isSortable={true}
          isFilterable={true}
          style={{ width: "158px", maxWidth: "158px" }}
        />
        <SageTableColumn
          order={6}
          body={(row) => {
            return (
              <MeasuredDisplay displayText={row.Summary} hideToolTip={true} />
            );
          }}
          field="Summary"
          header="Summary"
          isSortable={true}
          isFilterable={true}
          style={{ width: "395px", maxWidth: "395px", textAlign: "left" }}
        />
        <SageTableColumn
          order={7}
          body={(row) => {
            return <MeasuredDisplay displayText={row.Notes} />;
          }}
          field="Notes"
          header="Notes"
          isSortable={true}
          isFilterable={true}
          style={{ width: "161px", maxWidth: "161px" }}
        />
        <SageTableColumn
          order={8}
          body={(row) => {
            return <TableActionButtons rowData={row} />;
          }}
          field="Actions"
          header=""
          isSortable={false}
          isFilterable={false}
          style={{ width: "161px", maxWidth: "161px" }}
        />
      </SageDataTable>
    </div>
  );
}
