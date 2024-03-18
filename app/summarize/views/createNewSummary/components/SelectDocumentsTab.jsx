import React, { useState } from "react";
import DocumentCategorySelector from "./DocumentCategorySelector";
import HelpIconSm from "../../../icons/help_18.svg";
import HelpButton from "../../../components/Helpbutton";
import DocIDs from "./DocIDs";

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
            <div className="position-relative">
              <label className="summary-document-category-label p-component">
                Select your documents{" "}
              </label>
              <span className="icon-position">
                <HelpButton icon={<HelpIconSm />} />
              </span>
            </div>
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
            <>
              <div className="mt-8">
                <DocIDs setDocIds={setDocIds} docIds={docIds} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectDocumentsTab;
