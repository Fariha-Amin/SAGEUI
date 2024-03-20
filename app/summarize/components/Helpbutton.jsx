import React from "react";
import { Button } from "primereact/button";


const HelpButton = ({ onClickHandle, icon, child, ...rest }) => {
  return (
    <Button
      {...rest}
      icon={icon}
      style={{ width: "auto", height: "auto" }}
      rounded
      text
      onClick={onClickHandle}
    >
      {child}
    </Button>
  );
};
export default HelpButton;
