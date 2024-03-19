import React, { useState } from "react";
import DocumentCategorySelector from "./DocumentCategorySelector";
import HelpIconSm from "../../../icons/help_18.svg";
import DocIDs from "./DocIDs";
import LabelWithHelpIcon from "../../../components/LabelWithHelpIcon";

const SelectDocumentsTab = () => {
  const documentCategories = [
    { name: "Folders", key: 1 },
    { name: "Tags", key: 2 },
    { name: "Saved Searches", key: 3 },
    { name: "DocIDs", key: 4 },
  ];

  const [docIds, setDocIds] = useState("");
  const [selectedDocumentCategory, setSelectedDocumentCategory] = useState(1);
  return (
    <>
      <div className="row summary_header" style={{ height: "40px" }}></div>
      <div className="row">
        <div className="col-3">
          <div className="col mb-4">
            <LabelWithHelpIcon
              label={"Select your documents"}
              icon={HelpIconSm}
            />
          </div>
          <div className="col">
            <DocumentCategorySelector
              documentCategories={documentCategories}
              selectedDocumentCategory={selectedDocumentCategory}
              setSelectedDocumentCategory={setSelectedDocumentCategory}
              setDocIds={setDocIds}
            />
          </div>
        </div>
        <div className="col-9">
          {selectedDocumentCategory === 1 && "Folders"}
          {selectedDocumentCategory === 2 && "Tags"}
          {selectedDocumentCategory === 3 && "Saved Searches"}
          {selectedDocumentCategory === 4 && (
            <div className="mt-8">
              <DocIDs setDocIds={setDocIds} docIds={docIds} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectDocumentsTab;
