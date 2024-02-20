import React,{useState} from 'react';
import { classNames } from 'primereact/utils';

const CustomPaginatorTemplate =()=>{
  const [rows, setRows] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  return {
  layout: 'CurrentPageReport  PrevPageLink FirstPageLink PageLinks LastPageLink NextPageLink RowsPerPageDropdown',
  CurrentPageReport : (options) => {
      setTotalRecords(options?.totalRecords??0)
      setRows(options?.rows??0)
      return (
        <span className={options.className} >Total: {options.totalRecords} Entries</span>
      );
  },
  PrevPageLink: (options) => {
    
      return (
        <button type="button" className={options.className} onClick={options.onClick}>{'Previous'}</button>
      );
  },
  FirstPageLink:(options)=>{
    if (totalRecords<=0) return;
      return (
          <button type="button"className={options.disabled? 'p-paginator-first p-paginator-element p-link p-highlight': options.className} onClick={options.onClick}>{'1'}</button>
        );
  },
  LastPageLink:(options)=>{
    if (Math.ceil(totalRecords/rows)<=1) return;
      return (
          <button type="button" className={options.disabled? 'p-paginator-last p-paginator-element p-link p-highlight': options.className} onClick={options.onClick}>{Math.ceil(totalRecords/rows)}</button>
        );
  },
  PageLinks: (options) => {
      if (options.page+1===options.totalPages || options.page===0)
          return;
      
      if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
          const className = classNames(options.className, { 'p-disabled': true });

          return (
              <button className={className} style={{ userSelect: 'none' }}>
                  ...
              </button>
          );
      }

      return (
          <button type="button" className={options.className} onClick={options.onClick}>
              {options.page + 1}
          </button>
      );
  },
  NextPageLink: (options) => {
      return (
        <button type="button" className= {options.className} onClick={options.onClick}>{'Next'}</button>
      );
  }
}}

export default CustomPaginatorTemplate;