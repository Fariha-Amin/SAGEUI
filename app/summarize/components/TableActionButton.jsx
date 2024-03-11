import React from "react";

const TableActionButton = ({ children, onClickHandler, ...rest }) => {
  return (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default TableActionButton;
