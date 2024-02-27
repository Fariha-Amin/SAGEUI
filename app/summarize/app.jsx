import React, { useState } from "react";
import SummaryHeader from "./modules/summary/SummaryHeader";
import SageDataTable from "../../libs/shared/data-grid/SageDataTable";
import SageTableColumn from "../../libs/shared/data-grid/column/SageTableColumn";
import MeasuredDisplay from "../../libs/shared/data-grid/MeasuredDisplay";
import { Checkbox } from "primereact/checkbox";
import AllSelectModal from "../../libs/shared/data-grid/AllSelectModal";

import "bootstrap/dist/css/bootstrap.min.css";
// import favouriteIcon from "../summarize/icons/favourite.png"
import TableActionButtons from "./components/TableActionButtons";
import ViewDocButton from "./components/ViewDocButton";

import "./App.css";

export default function App() {
  const [selectedRows, setSelectedRows] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const onCheckboxClick = (rowData) => {
    setSelectedRows(rowData);

    console.log(rowData);
    // console.log(selectedRows);
  };

  return (
    <>
      <div className="App">
        <SummaryHeader />

        <SageDataTable
          dataKey="recId"
          isColumnResizable={false}
          showGridlines={true}
          paginator={true}
          rows={10}
          style={{ width: "100%", minWidth: "50rem" }}
          cellSelection={true}
          lazy={true}
          dataUrl="http://localhost:5000/api/getTableData"
        >
          <SageTableColumn
            order={1}
            field="recId"
            header={<Checkbox onClick={() => setModalShow(true)} />}
            body={(rowData) => (
              <Checkbox onChange={() => onCheckboxClick(rowData)} />
            )}
            style={{ width: "3.12%" }}
          />
          <SageTableColumn
            order={2}
            body={(row) => <ViewDocButton rowData={row} />}
            field="ViewDoc"
            header="View Doc"
            isSortable={false}
            isFilterable={false}
            style={{ width: "8.67%" }}
          />
          <SageTableColumn
            order={3}
            body={(row) => {
              return <MeasuredDisplay displayText={row.summaryGeneratedOn} />;
            }}
            field="summaryGeneratedOn"
            header="Date/Time"
            isSortable={true}
            isFilterable={true}
            style={{ width: "9.68%" }}
          />
          <SageTableColumn
            order={4}
            body={(row) => {
              return <MeasuredDisplay displayText={row.user} />;
            }}
            field="user"
            header="User"
            isSortable={true}
            isFilterable={true}
            style={{ width: "10.16%" }}
          />
          <SageTableColumn
            order={5}
            body={(row) => {
              return <MeasuredDisplay displayText={row.documentId} />;
            }}
            field="documentId"
            header="DocId (Fed to AI)"
            isSortable={true}
            isFilterable={true}
            style={{ width: "12.34%" }}
          />
          <SageTableColumn
            order={6}
            body={(row) => {
              return (
                <MeasuredDisplay displayText={row.summary} hideToolTip={true} />
              );
            }}
            field="summary"
            header="Summary"
            isSortable={true}
            isFilterable={true}
            style={{ width: "30.86%" }}
          />
          <SageTableColumn
            order={7}
            body={(row) => {
              return <MeasuredDisplay displayText={row.notes} />;
            }}
            field="notes"
            header="Notes"
            isSortable={true}
            isFilterable={true}
            style={{ width: "12.57%" }}
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
            style={{ width: "12.57%" }}
          />
        </SageDataTable>
      </div>

      <AllSelectModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
