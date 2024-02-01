import './IconButton.css';
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as RegularIcons from '@fortawesome/free-regular-svg-icons';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';

// This loads in all REGULAR icons from Fontawesome
const regularIconList = Object
  .keys(RegularIcons)
  .filter(key => key !== "far" && key !== "prefix" )
  .map(icon => RegularIcons[icon]);

library.add(...regularIconList);

// This loads in all SOLID icons from Fontawesome
const solidIconList = Object
  .keys(SolidIcons)
  .filter(key => key !== "fas" && key !== "prefix" )
  .map(icon => SolidIcons[icon]);

library.add(...solidIconList);

export default function IconButton({ icon, onClick }) {
    
    return (
        <button type="button" className='sage-icon-button' onClick={onClick}>
            <FontAwesomeIcon icon={icon} className='sage-icon-button__icon' />
        </button>
    );
}