import React from "react";

const ExpandedRowTemplate = ({ rowData }) => {
  return (
    <div className="row">
      <div className="col-lg" style={{ whiteSpace: "wrap" }}>
        {rowData.summary}
      </div>
    </div>
  );
};

export default ExpandedRowTemplate;
