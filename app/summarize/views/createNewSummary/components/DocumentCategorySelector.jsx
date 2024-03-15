import React from "react";
import { RadioButton } from "primereact/radiobutton";
const DocumentCategorySelector = ({
  documentCategories,
  selectedDocumentCategory,
  setSelectedDocumentCategory,
}) => {
  return (
    <>
      {documentCategories.map((category) => (
        <div key={category.key} className="d-flex align-items-center mb-3">
          <RadioButton
            inputId={category.key}
            name="category"
            value={category.key}
            onChange={(e) => setSelectedDocumentCategory(e.value)}
            checked={selectedDocumentCategory === category.key}
          />
          <label style={{ fontSize: "16px" }} htmlFor={category.key}>
            {category.name}
          </label>
        </div>
      ))}
    </>
  );
};

export default DocumentCategorySelector;
