import React from "react";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";

const SummaryHeader = () => {
  return (
    <div>
      <div className="flex justify-content-between">
        <p className="font-family font-size-header margin-zero font-weight-bold">
          neXgenAI Summarize
          <i className="pi pi-question-circle"></i>
        </p>
        <Button className="btn-color btn-padding">New Summary</Button>
      </div>

      <div className="flex justify-content-between margin-height">
        <p className="margin-zero">
          List of Summaries
          <i className="pi pi-question-circle"></i>
        </p>

        <div className="flex justify-content-between gap-10">
          <Button
            className="btn-height"
            label="View all summaries"
            severity="info"
            outlined
          />
          <i className="pi pi-filter icon-font-size"></i>
          <i className="pi pi-download icon-font-size"></i>
          <SplitButton
            className="btn-height"
            severity="secondary"
            label="Action"
          ></SplitButton>
        </div>
      </div>
    </div>
  );
};

export default SummaryHeader;
