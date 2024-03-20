import React, { useState } from "react";
import HelpIconSm from "../../../icons/help_18.svg";
import LabelWithHelpIcon from "../../../components/LabelWithHelpIcon";
import RadioCategorySelector from "./RadioCategorySelector";

function SelectSummaryTypeTab() {
  const summaryTypes = [
    { name: "An individual summary for each document", key: 1 },
    {
      name: "A combined summary for a set of documents (Max of 25 documents)",
      key: 2,
    },
  ];
  const [selectedSummaryType, setSelectedSummaryType] = useState(1);
  return (
    <>
      <div className="row mt-4">
        <div className="col-8">
          <div className="col">
            <LabelWithHelpIcon
              label={"Select Your Summary Type"}
              icon={HelpIconSm}
            />
          </div>
          <div className="col">
            <RadioCategorySelector
              categories={summaryTypes}
              selectedCategory={selectedSummaryType}
              onRadioSelectionChange={setSelectedSummaryType}
              categoryContainer="d-flex align-items-center mb-3"
            />
          </div>
          <div>
            <label className="summary-document-category-label font-style-italics ml-6">
              Note: When selecting a combined summary, a maximum of 25 documents
              will be sent{" "}
              <p>
                to the AI engine for summarization. Anything exceeding this
                limit will be excluded.
              </p>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectSummaryTypeTab;
