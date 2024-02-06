import React from 'react';
import icon from '../../assets/images/icon.png'
import download from '../../assets/images/download.png'
import helpIcon from '../../assets/images/vector.png'
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';

const SummaryHeader=()=>{
    return (
        <div>
          <div className='flex justify-content-between'>
            <p className='font-family font-size-header margin-zero font-weight-bold font-color'>
              neXgenAI Summarize
              <a>
                <img src={helpIcon} width="18" alter='helpIcon'/>
              </a>
              </p>
            <Button className='btn-color btn-padding'>New Summary</Button>
          </div>
  
          <div className='flex justify-content-between margin-height'>
           <p className='margin-zero'>List of Summaries 
                      <img src={helpIcon} width="18" alter='HelpIcon'/>
          </p>
  
          <div className='flex justify-content-between gap-10'>
            <Button className='btn-height' label="View all summaries" severity="info" outlined />
            <img className='img-height' src= {icon} alt="filter"/>
            <img className='img-height' src= {download}  alt="download"/>
            <SplitButton className='btn-height' severity="secondary" label='Action'></SplitButton>
           </div>
          </div>
  
        </div>
        );
}

export default SummaryHeader;