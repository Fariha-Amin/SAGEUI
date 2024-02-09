import React from 'react';
import Icon from '_shared/icon/Icon';

export default function IconButton({ icon, onClick, className }) {
  const css = className ? `sage-icon-button ${className}` : "sage-icon-button";
  return (
    <button type="button" className={css} onClick={onClick}>
      <Icon icon={icon} fixedWidth />
    </button>
  );
}