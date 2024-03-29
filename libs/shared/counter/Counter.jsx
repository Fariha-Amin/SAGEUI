import React from "react";
import './counter.scss'

const formatCount = (count) => {
    return count.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const Counter = ({ label, count }) => {
    const defaultLabel = <span className='counter'>{label} {formatCount(count)}</span>;
    const zeroDocLabel = <span className='counter counter--zero'>{label} {formatCount(count)}</span>;
    
    return (count > 0) ? defaultLabel : zeroDocLabel;
};

export default Counter;
