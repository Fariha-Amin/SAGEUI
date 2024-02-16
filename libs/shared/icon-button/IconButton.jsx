import React from 'react';
import Icon from '_shared/icon/Icon';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function IconButton({ icon, onClick, className, title, titlePlacement }) {
  const css = className ? `sage-icon-button ${className}` : "sage-icon-button";

  let button = (
    <button type="button" className={css} onClick={onClick}>
      <Icon icon={icon} fixedWidth />
    </button>
  );

  if (title) {
    button = (
      <OverlayTrigger placement={titlePlacement ?? "top"} overlay={<Tooltip>{title}</Tooltip>}>
        {button}
      </OverlayTrigger>
    );
  }

  return button;
}