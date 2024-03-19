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
      <div className="row mb-3">
        <div className="col p-3">
          <LabelWithHelpIcon
            label={"Select your documents"}
            icon={HelpIconSm}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-3">
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
            <DocIDs setDocIds={setDocIds} docIds={docIds} />
          )}
        </div>
      </div>
    </>
  );
};

export default SelectDocumentsTab;
