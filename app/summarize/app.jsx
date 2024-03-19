import React, { useState } from "react";
import Home from "./views/home/Home";
import CreateNewSummary from "./views/createNewSummary/CreateNewSummary";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  const summarizeMainPage = 0;
  const summarizeWizardPage = 1;
  const [displayPage, setDisplayPage] = useState(summarizeMainPage);

  let viewPage = (
    <Home
      onNewSummaryClick={() => {
        setDisplayPage(summarizeWizardPage);
      }}
    />
  );
  if (displayPage === summarizeWizardPage) {
    viewPage = <CreateNewSummary />;
  }
  return viewPage;
}
