import React, { useState } from "react";
import SelectSummaryTypeTab from "./SelectSummaryTypeTab";
import SummaryWizardHeader from "./SummaryWizardHeader";
import SelectDocumentsTab from "./SelectDocumentsTab";

function SummaryWizard() {
  const summaryTypeTab = 0;
  const summaryDocumentTab = 1;
  const [wizardStep, setWizardStep] = useState(summaryTypeTab);
  const [errorMessage, setErrorMessage] = useState("");

  const validateDocIds = () => {
    const regex = /^[a-zA-Z0-9\s\n_-]+$/;
    if (!regex.test(docIds)) {
      errorMessage("Invalid syntax. Special characters not allowed.");
      return false;
    }
    return true;
  };

  let selectedTab = <SelectSummaryTypeTab />;
  if (wizardStep == summaryDocumentTab) {
    selectedTab = <SelectDocumentsTab />;
  }

  const onNextButtonClick = () => {
    setWizardStep(wizardStep + 1);
  };

  const onSummaryTypeClick = () => {
    setWizardStep(summaryTypeTab);
  };

  const onSummaryDocumentClick = () => {
    setWizardStep(summaryDocumentTab);
  };

  const onSubmitButtonClick = () => {};

  return (
    <div style={{ padding: "4rem 4rem 0rem 0rem" }}>
      <SummaryWizardHeader
        wizardStep={wizardStep}
        onNextButtonClick={onNextButtonClick}
        onSubmitButtonClick={onSubmitButtonClick}
        onSummaryTypeClick={onSummaryTypeClick}
        onSummaryDocumentClick={onSummaryDocumentClick}
      />
      {selectedTab}
    </div>
  );
}

export default SummaryWizard;
