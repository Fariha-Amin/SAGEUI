import React, { useState } from "react";
import SummarizeMain from "./SummarizeMain";
import SummaryWizard from "./SummaryWizard";

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
