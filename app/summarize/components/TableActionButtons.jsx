import React from "react";
import TableActionButton from "./TableActionButton";

import noteIcon from "../icons/note.png";
import noteIconBlue from "../icons/note_blue.png";

import favouriteIcon from "../icons/favourite.png";
import favouriteIconClicked from "../icons/favourite_clicked.png";

import deleteIcon from "../icons/delete.png";

const TableActionButtons = ({
  rowData,
  noteClickHandler,
  favouriteClickHandler,
  deleteClickHandler,
  ...rest
}) => {
  const noteButton = (
    <TableActionButton className="btn  btn-link">
      <img src={rowData.notes ? noteIconBlue : noteIcon}></img>
    </TableActionButton>
  );
  const favouriteButton = (
    <TableActionButton className="btn  btn-link">
      <img src={rowData.favourite ? favouriteIconClicked : favouriteIcon}></img>
    </TableActionButton>
  );
  const deleteButton = (
    <TableActionButton
      className={rowData.inprogress ? "btn btn-link disabled" : "btn btn-link"}
    >
      <img src={deleteIcon}></img>
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
