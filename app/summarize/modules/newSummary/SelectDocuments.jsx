import React, { useState } from "react";
import DocumentCategorySelector from "./DocumentCategorySelector";

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
          <DocumentCategorySelector
            documentCategories={documentCategories}
            selectedDocumentCategory={selectedDocumentCategory}
            setSelectedDocumentCategory={setSelectedDocumentCategory}
          />
        </div>
        <div className="col-8"> asdasdasd</div>
      </div>
    </>
  );
};

export default SelectDocuments;
