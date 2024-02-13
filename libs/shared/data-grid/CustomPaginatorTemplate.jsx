import React from 'react';
const CustomPaginatorTemplate = {
    layout: 'CurrentPageReport PrevPageLink PageLinks NextPageLink',
    'CurrentPageReport': (options) => {
        return (
          <span className={options.className} >Total: {options.totalRecords} entries</span>
        );
    },
    'PrevPageLink': (options) => {
        return (
          <button type="button" className={options.className} onClick={options.onClick}>{'Previous'}</button>
        );
    },
    'NextPageLink': (options) => {
        return (
          <button type="button" className= {options.className} onClick={options.onClick}>{'Next'}</button>
        );
    }
}

export default CustomPaginatorTemplate;