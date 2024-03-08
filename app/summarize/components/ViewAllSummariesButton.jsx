import React from "react";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { viewAllSummaryClickHandler } from "../summaryDataTable/summaryTableEvents";

const ViewAllSummariesButton = (props) => {
  const isAllRowExpanded = useSelector(
    (state) => state.rowExpansionDataSlice.isAllRowExpanded
  );
  return (
    <Button
      label={`${
        isAllRowExpanded ? "Collapse all summaries" : "View all summaries"
      }`}
      className="btn-height ml-4"
      onClick={viewAllSummaryClickHandler}
      outlined
      style={{ color: "#3b82f9" }}
    />
  );
};
export default ViewAllSummariesButton;
