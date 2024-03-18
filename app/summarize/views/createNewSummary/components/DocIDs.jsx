import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { ScrollPanel } from "primereact/scrollpanel";

const DocIDs = ({ docIds, setDocIds }) => {
  return (
    <InputTextarea
      placeholder="Enter DocIDs separated by spaces or a hard carriage return. Please don't use any special characters.  e.g. ID12345678 ID87654321 ID135792468"
      value={docIds}
      onChange={(e) => setDocIds(e.target.value)}
      rows={9}
      cols={65}
      style={{ resize: "none" }}
    />
  );
};
export default DocIDs;
