import React, { useRef, useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip'



function MeasuredDisplay({ displayText,hideToolTip }) {
  const containerRef = useRef(null);
  const [charactersFit, setCharactersFit] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [truncatedText, setTruncatedText] = useState(null);

  useEffect(() => {
    const calculateCharactersFittingInContainer = () => {
      const containerWidth = containerRef.current.offsetWidth;

      const span = document.createElement("span");
      span.textContent = "W"; // Using a single character for measurement
      span.style.visibility = "hidden"; // Hide the span
      document.body.appendChild(span); // Add the span to the body

      const charWidth = span.offsetWidth;

      document.body.removeChild(span); // Remove the span from the DOM

      const calculatedCharactersFit = Math.floor(containerWidth / charWidth);
      if (displayText.length > calculatedCharactersFit + 8) {
        setTruncatedText(
          `${displayText.slice(0, calculatedCharactersFit + 8)}...`
        );
      }
    };

    calculateCharactersFittingInContainer();

    // Recalculate on window resize
    window.addEventListener("resize", calculateCharactersFittingInContainer);
    return () => {
      window.removeEventListener(
        "resize",
        calculateCharactersFittingInContainer
      );
    };
  }, []);
  let body = <></>;

  if (!hideToolTip) {
    body = (
      <>
        <Tooltip id="tooltip#" />
        <div
          className={`row-data`}
          data-tooltip-id="tooltip#" data-tooltip-content={displayText}
          ref={containerRef}
        >
          {truncatedText?truncatedText:displayText}
        </div>
      </>
    );
  } else {
    body = (
      <>
        <div className={`row-data`} ref={containerRef}>
        {truncatedText?truncatedText:displayText}
        </div>
      </>
    );
  }
  return <>{body}</>;
}

export default MeasuredDisplay;
