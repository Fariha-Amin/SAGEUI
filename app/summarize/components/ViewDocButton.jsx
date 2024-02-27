import React from "react";
import TableActionButton from "./TableActionButton";
import viewDocIcon from "../icons/view_doc.png";

const ViewDocButton = ({ rowData, viewDocClickHandler, ...rest }) => {
  return (
    <div>
      <TableActionButton
        className={
          rowData.Inprogress ? "btn  btn-link disabled" : "btn  btn-link"
        }
      >
        <img src={viewDocIcon}></img>
      </TableActionButton>
    </div>
  );
};
export default ViewDocButton;
