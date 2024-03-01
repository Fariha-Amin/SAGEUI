import React from "react";
import TableActionButton from "./TableActionButton";
import ViewDocRegularLogo from "../icons/viewdocregular.svg";
import ViewDocDisableLogo from "../icons/viewdocdisabled.svg";

const ViewDocButton = ({ rowData, viewDocClickHandler, ...rest }) => {
  let style = null;
  let icon = <ViewDocRegularLogo />;
  if (rowData.inprogress) {
    style = { cursor: "default" };
    icon = <ViewDocDisableLogo />;
  }
  return (
    <div>
      <TableActionButton className="btn  btn-link" style={style}>
        {icon}
      </TableActionButton>
    </div>
  );
};
export default ViewDocButton;
