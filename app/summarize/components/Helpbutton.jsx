import React from "react";
import { Button } from "primereact/button";
import HelpIcon from "../icons/help.svg";

const HelpButton = ({ onClickHandle, icon, child }) => {
  return (
    <Button
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
