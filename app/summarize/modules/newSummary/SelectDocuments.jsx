import React, { useState } from "react";
import DocumentCategorySelector from "./DocumentCategorySelector";
import HelpIconSm from "../../icons/help_18.svg";
import HelpButton from "../../components/Helpbutton";

const SelectDocuments = () => {
  const documentCategories = [
    { name: "Folders", key: 1 },
    { name: "Tags", key: 2 },
    { name: "Saved Searches", key: 3 },
    { name: "DocIDs", key: 4 },
  ];

  const [selectedDocumentCategory, setSelectedDocumentCategory] =
    useState(null);
  return (
    <>
      <div className="row summary_header" style={{ height: "40px" }}></div>
      <div className="row">
        <div className="col-4">
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
            />
          </div>
        </div>
        <div className="col-8">
          {selectedDocumentCategory === 1 && "Folders"}
          {selectedDocumentCategory === 2 && "Tags"}
          {selectedDocumentCategory === 3 && "Saved Searches"}
          {selectedDocumentCategory === 4 && "DocIDs"}
        </div>
      </div>
    </>
  );
};

export default SelectDocuments;
