import React from "react";
import TableActionButton from "./TableActionButton";
import viewDocIcon from "../icons/view_doc.png";
import viewDocDisableIcon from "../icons/view_doc_disabled.png";

const ViewDocButton = ({ rowData, viewDocClickHandler, ...rest }) => {
  let style = null;
  let icon = viewDocIcon;
  if (rowData.Inprogress) {
    style = { cursor: "default" };
    icon = viewDocDisableIcon;
  }
  return (
    <div>
      <TableActionButton className="btn  btn-link" style={style}>
        <img src={icon}></img>
      </TableActionButton>
    </div>
  );
};
export default ViewDocButton;
