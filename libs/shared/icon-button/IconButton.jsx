import React from 'react';
import Icon from '../icon/Icon';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export default function IconButton({ icon, onClick, className, tooltip, tooltipId }) {
  const css = className ? `sage-icon-button ${className}` : "sage-icon-button";

  var returnValue = '';

  if(tooltipId == null){
    returnValue = <button type="button" className={css} onClick={onClick}><Icon icon={icon} fixedWidth /></button>
  }
  else{
    returnValue = <a data-tooltip-id={tooltipId} data-tooltip-content={tooltip} data-tooltip-place="top">
                    <button type="button" className={css} onClick={onClick}><Icon icon={icon} fixedWidth /></button><Tooltip id={tooltipId}/>
                  </a>
  }

  return (
    returnValue
  );
}