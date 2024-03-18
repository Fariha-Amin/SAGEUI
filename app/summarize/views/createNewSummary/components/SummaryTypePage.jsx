import React from "react";

function SummaryTypePage() {
  return (
    <div style={{ padding: "4rem 4rem 0rem 0rem" }}>
      <div style={{ display: "flex" }}>
        <div class="summary-wizard-stepper-summary-type">
          <span class="stepper-title summary-wizard-stepper-title">
            Select Summary Type
          </span>
        </div>

        <div class="summary-wizard-stepper-documents">
          <span class="stepper-title summary-wizard-stepper-title">
            Select Documents
          </span>
        </div>
      </div>
    </div>
  );
}

export default SummaryTypePage;
