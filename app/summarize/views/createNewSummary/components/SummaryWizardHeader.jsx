import React from "react";
import { Button } from "primereact/button";

function SummaryWizardHeader({
  wizardStep,
  onNextButtonClick,
  onSubmitButtonClick,
  onSummaryTypeClick,
  onSummaryDocumentClick
}) {
  const summaryTypePage = 0;
  const summaryDocumentPage = 1;

  const getWizardActionButton = () => {
    if (wizardStep === summaryTypePage) {
      return (
        <Button
          className="summary-wizard-button"
          label="Next"
          severity="primary"
          raised
          onClick={() => onNextButtonClick()}
        />
      );
    } else {
      return (
        <Button
          className="summary-wizard-button"
          label="Submit"
          severity="primary"
          raised
          onClick={() => onSubmitButtonClick()}
        />
      );
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "color: #3C4257",
        }}
      >
        <div style={{ display: "flex" }}>
          <div onClick={() => onSummaryTypeClick()}
            className={`summary-wizard-stepper-summary-type ${
              wizardStep === summaryTypePage
                ? "summary-wizard-stepper-selected"
                : "summary-wizard-stepper-unselected"
            }`}
          >
            <span className="stepper-title summary-wizard-stepper-title">
              Select Summary Type
            </span>
          </div>

          <div onClick={() => onSummaryDocumentClick()}
            className={`summary-wizard-stepper-documents ${
              wizardStep === summaryDocumentPage
                ? "summary-wizard-stepper-selected"
                : "summary-wizard-stepper-unselected"
            }`}
          >
            <span className="stepper-title summary-wizard-stepper-title">
              Select Documents
            </span>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "10px" }}>
            <Button
              label="Cancel"
              className="summary-wizard-button"
              outlined
              style={{ color: "#3C4257" }}
            />
          </div>
          <div>{getWizardActionButton()}</div>
        </div>
      </div>
    </>
  );
}

export default SummaryWizardHeader;
