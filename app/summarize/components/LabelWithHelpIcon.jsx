import React, { useRef } from "react";
import HelpButton from "./Helpbutton";
import HelpOverlayPanel from "./HelpOverlayPanel";

const LabelWithHelpIcon = ({ label, icon }) => {
  const labelHelpButtonPointer = useRef(null);
  return (
    <>
      {labelHelpButtonPointer && (
        <HelpOverlayPanel
          title={label}
          objectPointer={labelHelpButtonPointer}
          style={{ width: "320px", height: "180px" }}
        />
      )}
      <div className="position-relative">
        <label className="summary-document-category-label p-component">
          {label}
        </label>
        <span className="icon-position">
          <HelpButton
            onClickHandle={(e) => labelHelpButtonPointer.current.toggle(e)}
            icon={icon}
          />
        </span>
      </div>
    </>
  );
};

export default LabelWithHelpIcon;
