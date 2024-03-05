import React from "react";
import TableActionButton from "./TableActionButton";

import NoteRegularLogo from "../icons/noteregular.svg";
import NoteBlueLogo from "../icons/noteblue.svg";

import FavRegularLogo from "../icons/favregular.svg";
import FavYellowLogo from "../icons/favyellow.svg";

import DeleteLogo from "../icons/delete.svg";

const TableActionButtons = ({
  rowData,
  noteClickHandler,
  favouriteClickHandler,
  deleteClickHandler,
  ...rest
}) => {
  const noteButton = (
    <TableActionButton className="btn  btn-link">
      {rowData.notes ? <NoteBlueLogo /> : <NoteRegularLogo />}
    </TableActionButton>
  );
  const favouriteButton = (
    <TableActionButton className="btn  btn-link">
      {rowData.favourite ? <FavYellowLogo /> : <FavRegularLogo />}
    </TableActionButton>
  );
  const deleteButton = (
    <TableActionButton
      className={rowData.inprogress ? "btn btn-link disabled" : "btn btn-link"}
    >
      <DeleteLogo />
    </TableActionButton>
  );
  return (
    <div>
      {noteButton}
      {favouriteButton}
      {deleteButton}
    </div>
  );
};

export default TableActionButtons;
