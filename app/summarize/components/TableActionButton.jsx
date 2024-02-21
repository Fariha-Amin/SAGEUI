import React from 'react'

const TableActionButton = ({children, onClickHandler, ...rest}) => {
  return (
    <button onClick={onClickHandler} {...rest}>
      {children}
    </button>
  )
}

export default TableActionButton