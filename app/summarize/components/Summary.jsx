import React from 'react';
import { ProgressBar } from 'primereact/progressbar';

const Summary = ({row})=>{
    if(row.inprogress){
        return(
            <div>
                <span style={{ marginRight: '15px' }}>In progress</span>
                <ProgressBar value={70} showValue={false}  style={{ width: '40%' }}></ProgressBar>
            </div>
        )
    }
    return(
        <div>{row.Summary}</div>
    )
    
}
export {Summary}