import React from "react";
import { InputTextarea } from "primereact/inputtextarea";

const DocIDs = ({ docIds, setDocIds }) => {
  return (
    <>
      <div>
        <InputTextarea
          placeholder="Enter DocIDs separated by spaces or a hard carriage return. Please don't use any special characters.  e.g. ID12345678 ID87654321 ID135792468"
          value={docIds}
          onChange={(e) => setDocIds(e.target.value)}
          rows={9}
          cols={65}
          style={{ resize: "none" }}
        />
      </div>
      <div>{/* {error && <small className="p-error">{error}</small>} */}</div>
    </>
  );
};
export default DocIDs;
