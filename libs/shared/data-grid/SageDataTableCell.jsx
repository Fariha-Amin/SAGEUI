import React from "react";
import { Tooltip } from "primereact/tooltip";
function SageDataTableCell({
  cellText,
  truncateText,
  showToolTip,
  onRenderringToolTipText,
}) {
  const tooltipComp = (
    <Tooltip
      target=".tooltipTarget"
      mouseTrack
      mouseTrackLeft={10}
      className="custom-tooltip-style"
    />
  );

  const cellClassName = `${showToolTip ? "tooltipTarget" : ""}${
    truncateText ? " truncateCellText" : ""
  }`;

  const cellComp = (
    <div
      className={cellClassName}
      data-pr-tooltip={
        onRenderringToolTipText ? onRenderringToolTipText(cellText) : cellText
      }
      height="60px"
    >
      {cellText}
    </div>
  );

  return (
    <>
      {showToolTip ? "" : tooltipComp}
      {cellComp}
    </>
  );
}

export default SageDataTableCell;
