import React, { useState } from "react";
import SummaryHeader from "./modules/summary/SummaryHeader";
import SageDataTable from "../../libs/shared/data-grid/SageDataTable";
import SageTableColumn from "../../libs/shared/data-grid/column/SageTableColumn";
import "bootstrap/dist/css/bootstrap.css";
import { DataService } from "./../../libs/shared/data-grid/utility/DataService";

import TableActionButtons from "./components/TableActionButtons";
import ViewDocButton from "./components/ViewDocButton";
import "./App.css";
import SageDataTableCell from "../../libs/shared/data-grid/SageDataTableCell";
import { onCellClickHandler } from "./summaryDataTable/summaryTableEvents";
import {
  onTableDataUpdateHandler,
  expandedRowsTemplateHandler,
} from "./summaryDataTable/summaryTableEvents";

export default function App() {
  const docIdsToDisplayInSingleLine = 5;
  const prettifyDocIdForToolTip = (cellText) => {
    let docIdslist = cellText.split(",").map((docId) => docId.trim());

    let result = "";

    for (let i = 0; i < docIdslist.length; i++) {
      result += docIdslist[i];
      if (
        (i + 1) % docIdsToDisplayInSingleLine === 0 &&
        i !== docIdslist.length - 1
      ) {
        result += ",\n"; // Add new line after every 5 values, except the last one
      } else if (i !== docIdslist.length - 1) {
        result += ", "; // Add comma and space for separation, except the last one
      }
    }

    return result;
  };

  const favouriteClickHandler = (rowData) => {
    DataService.updateSummarizeData(
      "https://localhost:5000/api/markAsFavorite",
      rowData
    );
  };

  return (
    <div style={{ padding: "4rem 4rem 0rem 0rem" }}>
      <SummaryHeader />
      <div className="row">
        <div className="col-lg">
          <SageDataTable
            dataKey="recId"
            isColumnResizable={false}
            showGridlines={true}
            paginator={true}
            rows={20}
            style={{ width: "100%", minWidth: "50rem" }}
            cellSelection={true}
            lazy={true}
            dataUrl="https://localhost:5000/api/getTableData"
            defaultSortField="summaryGeneratedOn"
            defaultSortOrder={-1}
            onCellClickHandler={onCellClickHandler}
            onTableDataUpdateHandler={onTableDataUpdateHandler}
            expandedRowsTemplateHandler={expandedRowsTemplateHandler}
          >
            <SageTableColumn
              order={2}
              body={(row) => <ViewDocButton rowData={row} />}
              field="ViewDoc"
              header="View Doc"
              isSortable={false}
              isFilterable={false}
              style={{ width: "101px", maxWidth: "101px" }}
            />
            <SageTableColumn
              order={3}
              body={(row) => {
                return (
                  <SageDataTableCell
                    cellText={row.summaryGeneratedOn}
                    showToolTip={true}
                    truncateText={true}
                  />
                );
              }}
              field="summaryGeneratedOn"
              header="Date/Time"
              isSortable={true}
              isFilterable={true}
              style={{ width: "160px", maxWidth: "160px", textAlign: "left" }}
              cellClickable={true}
            />
            <SageTableColumn
              order={4}
              body={(row) => {
                return (
                  <SageDataTableCell
                    cellText={row.user}
                    showToolTip={true}
                    truncateText={true}
                  />
                );
              }}
              field="user"
              header="User"
              isSortable={true}
              isFilterable={true}
              style={{ width: "130px", maxWidth: "130px", textAlign: "left" }}
              cellClickable={true}
            />
            <SageTableColumn
              order={5}
              body={(row) => {
                return (
                  <SageDataTableCell
                    cellText={row.documentId}
                    showToolTip={true}
                    truncateText={true}
                    onRenderringToolTipText={prettifyDocIdForToolTip}
                  />
                );
              }}
              field="documentId"
              header="DocId (Fed to AI)"
              isSortable={true}
              isFilterable={true}
              style={{ width: "158px", maxWidth: "158px", textAlign: "left" }}
              cellClickable={true}
            />
            <SageTableColumn
              order={6}
              body={(row) => {
                return (
                  <SageDataTableCell
                    cellText={row.summary}
                    showToolTip={false}
                    truncateText={true}
                  />
                );
              }}
              field="summary"
              header="Summary"
              isSortable={true}
              isFilterable={true}
              style={{ width: "395px", maxWidth: "395px", textAlign: "left" }}
              cellClickable={true}
            />
            <SageTableColumn
              order={7}
              body={(row) => {
                return (
                  <SageDataTableCell
                    cellText={row.notes}
                    showToolTip={true}
                    truncateText={true}
                  />
                );
              }}
              field="notes"
              header="Notes"
              isSortable={true}
              isFilterable={true}
              style={{ width: "161px", maxWidth: "161px", textAlign: "left" }}
              cellClickable={true}
            />
            <SageTableColumn
              order={8}
              body={(row) => {
                return (
                  <TableActionButtons
                    rowData={row}
                    favouriteClickHandler={favouriteClickHandler}
                  />
                );
              }}
              field="Actions"
              header=""
              isSortable={false}
              isFilterable={false}
              style={{ width: "161px", maxWidth: "161px" }}
            />
          </SageDataTable>
        </div>
      </div>
    </div>
  );
}
