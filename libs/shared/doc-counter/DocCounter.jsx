import React, { useEffect } from "react";
import './docCounter.css'
import { useSelector, useDispatch } from 'react-redux'
import { setCount } from "./docCounterSlice";
import client, { getDocumentCount } from "../../app/investigate/httpClient"

const formatCount = (count) => {
    return count.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const DocCounter = ({label}) => {
    useEffect(() => {
        client.getDocumentCountAsync().then(data => dispatch(setCount(data)));
    }, [])
    const docLabel = label;
    const docCount = useSelector((state) => state.docCounter.value);
    const dispatch = useDispatch();

    const defaultLabel = <div className='doc-counter'>{docLabel} {formatCount(docCount)}</div>;
    const zeroDocLabel = <div className='doc-counter zero-doc-counter'>{docLabel} {formatCount(docCount)}</div>;
    
    return (docCount > 0) ? defaultLabel : zeroDocLabel;
};


export default DocCounter;