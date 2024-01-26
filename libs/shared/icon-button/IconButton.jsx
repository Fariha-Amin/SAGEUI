import './IconButton.css';
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

// This loads in all icons from Fontawesome so we can reference them by name
const iconList = Object
  .keys(Icons)
  .filter(key => key !== "fas" && key !== "prefix" )
  .map(icon => Icons[icon]);

library.add(...iconList);

export default function IconButton({ icon, onClick }) {
    
    return (
        <button type="button" className='sage-icon-button' onClick={onClick}>
            <FontAwesomeIcon icon={icon} className='sage-icon-button-icon' />
        </button>
    );
}