import React, { useState } from "react";

import TableActionButton from "./TableActionButton";

import NoteRegularLogo from "../icons/noteregular.svg";
import NoteBlueLogo from "../icons/noteblue.svg";

import FavRegularLogo from "../icons/favregular.svg";
import FavYellowLogo from "../icons/favyellow.svg";

import DeleteLogo from "../icons/delete.svg";

import NotesModal from "../../../libs/shared/data-grid/modals/NotesModal";

const calculateDialogPosition = (posX, posY) => {
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth;

  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  posX = posX - (20 * viewportWidth) / 100;

  if (posY + (30 * viewportHeight) / 100 > viewportHeight) {
    console.log("Yes");
    posY = viewportHeight - (40 * viewportHeight) / 100;
  }

  return { posX, posY };
};

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
    const { posX, posY } = calculateDialogPosition(
      event.clientX,
      event.clientY
    );

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
      <NotesModal
        dialogPosition={dialogPosition}
        visible={visible}
        setVisible={setVisible}
      />
    </div>
  );
};

export default TableActionButtons;
