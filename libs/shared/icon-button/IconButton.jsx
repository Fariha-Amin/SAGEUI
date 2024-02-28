import React from 'react';
import Icon from '_shared/icon/Icon';
import { Tooltip } from 'primereact/tooltip';

export default function IconButton({ icon, onClick, className, title, titlePlacement }) {
  const css = className ? `sage-icon-button ${className}` : "sage-icon-button";

  let button = (
    <button
      type="button"
      className={css}
      onClick={onClick}
      data-pr-tooltip={title}
      data-pr-position={titlePlacement ?? "top"}>
      <Icon icon={icon} fixedWidth />
    </button>
  );
  let iconButton = button;

  if (title) {
    iconButton = (
      <>
        <Tooltip target=".sage-icon-button" />
        {button}
      </>
    );
  }

  return iconButton;
}