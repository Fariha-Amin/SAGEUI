import React from 'react';
import Icon from '../icon/Icon';

export default function IconButton({ icon, onClick, cssClass, }) {
  return (
    <button type="button" className={ cssClass == null ? 'sage-icon-button' : cssClass } onClick={onClick}>
      <Icon icon={icon} fixedWidth />
    </button>
  );
}