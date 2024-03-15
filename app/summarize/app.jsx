import React, { useState } from "react";
import SummaryHeader from "./modules/summary/SummaryHeader";
import SageDataTable from "../../libs/shared/data-grid/SageDataTable";
import SageTableColumn from "../../libs/shared/data-grid/column/SageTableColumn";
import "bootstrap/dist/css/bootstrap.css";
import { DataService } from "../../libs/shared/data-grid/utility/DataService";

import TableActionButtons from "./components/TableActionButtons";
import ViewDocButton from "./components/ViewDocButton";
import "./App.css";
import SageDataTableCell from "../../libs/shared/data-grid/SageDataTableCell";
import { onCellClickHandler } from "./summaryDataTable/summaryTableEvents";
import {
  onTableDataUpdateHandler,
  expandedRowsTemplateHandler,
} from "./summaryDataTable/summaryTableEvents";
import SummarizeMain from "./components/SummarizeMain";
import SummaryWizard from "./components/SummaryWizard";

export default function App() {
  const summarizeMainPage = 0;
  const summarizeWizardPage = 1;
  const [displayPage, setDisplayPage] = useState(summarizeMainPage);
  let viewPage = <SummarizeMain onNewSummaryClick={() => {setDisplayPage(summarizeWizardPage)}}/>;
  if (displayPage === summarizeWizardPage){
    viewPage = <SummaryWizard/>;
  }
  return (
    viewPage
  );
}
