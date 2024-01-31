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

    const defaultLabel = <span className='doc-counter'>{docLabel} {formatCount(docCount)}</span>;
    const zeroDocLabel = <span className='doc-counter zero-doc-counter'>{docLabel} {formatCount(docCount)}</span>;
    
    return (docCount > 0) ? defaultLabel : zeroDocLabel;
};


export default DocCounter;