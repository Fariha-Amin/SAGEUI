import './IconButton.css';
import React from 'react';
import Icon from '../icon/Icon';

export default function IconButton({ icon, onClick }) {
  return (
    <button type="button" className='sage-icon-button' onClick={onClick}>
      <Icon icon={icon} fixedWidth />
    </button>
  );
}