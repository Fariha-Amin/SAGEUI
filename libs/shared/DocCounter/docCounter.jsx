import React from "react";
import './docCounter.css'
import { useSelector, useDispatch } from 'react-redux'
import { setCount } from "./docCounterSlice";

const DocCounter = (props) => {
    const docLabel = props.label;
    const docCount = useSelector((state) => state.docCounter.value);
    const dispatch = useDispatch();

    const defaultLabel = <div className='doc-counter'>{docLabel} {docCount}</div>;
    const zeroDocLabel = <div className='doc-counter zero-doc-counter'>{docLabel} {docCount}</div>;
    
    return (docCount > 0) ? defaultLabel : zeroDocLabel;
};

export default DocCounter;