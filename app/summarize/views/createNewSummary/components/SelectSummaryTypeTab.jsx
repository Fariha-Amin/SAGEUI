import React,{useState} from "react";
import RadioSelector from "../../../components/RadioSelector";
import HelpButton from "../../../components/Helpbutton";
import HelpIconSm from "../../../icons/help_18.svg";

function SelectSummaryTypeTab() {
  const summaryTypes = [
    { name: "An individual summary for each document", key: 1 },
    { name: "A combined summary for a set of documents (Max of 25 documents)", key: 2 },
  ];
  const [selectedSummaryType, setSelectedSummaryType] = useState(1);
  return (
    <>

    <div className="row mt-4">
      <div className="col-8">
        <div className="col">
          <div className="position-relative">
            <label className="summary-document-category-label p-component">
              Select Your Summary Type{" "}
            </label>
            <span className="icon-position">
              <HelpButton icon={<HelpIconSm />} />
            </span>
          </div>
        </div>
        <div className="col">
          <RadioSelector
            options={summaryTypes}
            selectedOption={selectedSummaryType}
            setSelectedOption={setSelectedSummaryType}
          />
        </div>
        <div>
           <label className="summary-document-category-label font-style-italics ml-6">
               Note: When selecting a combined summary, a maximum of 25 documents will be sent <p>to the AI engine for summarization. Anything exceeding this limit will be excluded.</p> 
           </label>
        </div>
      </div>
    </div>
  </>

  );
}

export default SelectSummaryTypeTab;
