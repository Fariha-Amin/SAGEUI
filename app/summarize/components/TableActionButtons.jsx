import React, { useState } from "react";

import TableActionButton from "./TableActionButton";

import NoteRegularLogo from "../icons/noteregular.svg";
import NoteBlueLogo from "../icons/noteblue.svg";

import FavRegularLogo from "../icons/favregular.svg";
import FavYellowLogo from "../icons/favyellow.svg";

import DeleteLogo from "../icons/delete.svg";

import NotesModal from "../../../libs/shared/data-grid/modals/NotesModal";
import { Tooltip } from "primereact/tooltip";

const calculateDialogPosition = (posX, posY) => {
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  posX = posX - 375;

  if (posY + 400 > viewportHeight) {
    posY = viewportHeight - 380;
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
  const [favorite, setFavorite] = useState(rowData.favorite);

  const { loginUserEmail } = rest;

  const onNoteClick = (event) => {
    const { posX, posY } = calculateDialogPosition(
      event.clientX,
      event.clientY
    );

    setDialogPosition({ x: posX, y: posY });
    setVisible(true);
  };

  const handleFavoriteClick = () => {
    favouriteClickHandler({ ...rowData, favorite: !favorite });
    setFavorite(!favorite);
  };

  const noteButton = (
    <>
      <Tooltip
        target={`#inprogress-tooltip-${rowData.recId}`}
        position="bottom"
        mouseTrack={true}
        appendTo={document.body}
        className="custom-tooltip-style"
      >
        Notes
      </Tooltip>

      <TableActionButton
        className={
          rowData.inprogress ? "btn btn-link disabled" : "btn btn-link"
        }
        onClickHandler={onNoteClick}
        id={`inprogress-tooltip-${rowData.recId}`}
      >
        {rowData.notes ? <NoteBlueLogo /> : <NoteRegularLogo />}
      </TableActionButton>
    </>
  );

  const favouriteButton = (
    <>
      <Tooltip
        target={`#favorite-tooltip-${rowData.recId}`}
        position="bottom"
        mouseTrack={true}
        appendTo={document.body}
        className="custom-tooltip-style"
      >
        Favorite
      </Tooltip>
      <TableActionButton
        className="btn  btn-link"
        id={`favorite-tooltip-${rowData.recId}`}
        onClickHandler={handleFavoriteClick}
      >
        {favorite ? <FavYellowLogo /> : <FavRegularLogo />}
      </TableActionButton>
    </>
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
        rowData={rowData}
        loginUserEmail={loginUserEmail}
      />
    </div>
  );
};

export default TableActionButtons;
