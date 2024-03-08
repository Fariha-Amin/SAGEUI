import React from "react";
import TableActionButton from "./TableActionButton";
import { useState } from "react";

import NoteRegularLogo from "../icons/noteregular.svg";
import NoteBlueLogo from "../icons/noteblue.svg";

import FavRegularLogo from "../icons/favregular.svg";
import FavYellowLogo from "../icons/favyellow.svg";

import DeleteLogo from "../icons/delete.svg";

import { Tooltip } from 'primereact/tooltip';
const TableActionButtons = ({
  rowData,
  noteClickHandler,
  favouriteClickHandler,
  deleteClickHandler,
  ...rest
}) => {

  const [favorite, setFavorite] = useState(rowData.isfavorite || false);

  const handleFavoriteClick = () =>
  {
    setFavorite(!favorite);
    favouriteClickHandler({ ...rowData, IsFavorite: !favorite });
  };

  const noteButton = (
    <TableActionButton className="btn  btn-link">
      {rowData.notes ? <NoteBlueLogo /> : <NoteRegularLogo />}
    </TableActionButton>
  );

  const favouriteButton = (
    <>
      <Tooltip
        target={`#favorite-tooltip-${rowData.recId}`}
        position="bottom"
        mouseTrack={true}
        appendTo={document.body}
        className="custom-tooltip"
      >
        Favorite
      </Tooltip>
      <TableActionButton className="btn  btn-link" id={`favorite-tooltip-${rowData.recId}`} >
        {favorite ? <FavYellowLogo onClick={handleFavoriteClick} /> : <FavRegularLogo onClick={handleFavoriteClick} />}
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
    </div>
  );
};

export default TableActionButtons;
