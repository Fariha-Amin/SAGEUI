import React from 'react';
import icon from '../../assets/images/icon.png'

const SummaryHeader=()=>{
    return (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontFamily:'Open Sans', fontSize:'28px', margin:'0', fontWeight:'bold', Color:'#1E1E1E' }}>
              neXgenAI Summarize
              <a className="btn btn-icon  btn-sm me-1">
              <img src={require('../../assets/images/vector.png').default} width="18" alter='asdasd'/>
                </a>
              </p>
            <button style={{ backgroundColor: '#066FDE', border: 'none', color: 'white', padding: '8px 16px', height:'35px', borderRadius: '2px'}}>New Summary</button>
          </div>
  
          <div style={{ margin:'15px 0',display: 'flex', justifyContent: 'space-between' }}>
           <p style={{ margin:'0', Color:'#1E1E1E' }}>List of Summaries 
                      <img src={require('../../assets/images/vector.png').default} width="18" alter='asdasd'/>
          </p>
  
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button style={{ backgroundColor: '#066FDE', border: 'none', color: 'white', padding: '8px 16px',  height:'35px', borderRadius: '2px' }}>View all summaries</button>
            <img src= {require('../../assets/images/icon.png').default} alt="Logo 1" style={{ height: '25px' }} />
            <img src= {require('../../assets/images/download.png').default}  alt="Logo" style={{ height: '25px' }} />
            <button style={{ backgroundColor: '#DDDDDD', border: 'none', color: 'white', padding: '8px 16px',  height:'35px', borderRadius: '2px' }}>Action</button>
           </div>
          </div>
  
        </div>
        );
}

export default SummaryHeader;