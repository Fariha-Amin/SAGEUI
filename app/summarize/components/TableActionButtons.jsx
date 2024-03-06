import React, { useState } from "react";

import TableActionButton from "./TableActionButton";

import NoteRegularLogo from "../icons/noteregular.svg";
import NoteBlueLogo from "../icons/noteblue.svg";

import FavRegularLogo from "../icons/favregular.svg";
import FavYellowLogo from "../icons/favyellow.svg";

import DeleteLogo from "../icons/delete.svg";

import { Dialog } from "primereact/dialog";

const TableActionButtons = ({
  rowData,
  noteClickHandler,
  favouriteClickHandler,
  deleteClickHandler,
  ...rest
}) => {
  const [visible, setVisible] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });

  const onNoteClick = (event) => {
    const posX = event.clientX;
    const posY = event.clientY;

    setDialogPosition({ x: posX, y: posY });
    setVisible(true);
  };

  const noteButton = (
    <TableActionButton className="btn  btn-link" onClick={onNoteClick}>
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
      <Dialog
        header="Header"
        visible={visible}
        style={{
          width: "10vw",
          position: "absolute",
          left: dialogPosition.x,
          top: dialogPosition.y,
        }}
        onHide={() => setVisible(false)}
      >
        <p className="m-0">Lorem ipsum dolor sit</p>
      </Dialog>
    </div>
  );
};

export default TableActionButtons;
