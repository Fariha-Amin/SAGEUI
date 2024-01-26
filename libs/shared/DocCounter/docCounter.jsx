import React from "react";
import './docCounter.css'

const DocCounter = (props) => {
    const docLabel = props.label;
    const docCount = props.count;

    const defaultLabel = <div className='doc-counter'>{props.label} {props.count}</div>;
    const zeroDocLabel = <div className='doc-counter zero-doc-counter'>{props.label} {props.count}</div>;
    
    return (docCount > 0) ? defaultLabel : zeroDocLabel;
};

export default DocCounter;