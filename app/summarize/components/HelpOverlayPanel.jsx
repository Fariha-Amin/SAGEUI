import React from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { ScrollPanel } from "primereact/scrollpanel";

const HelpOverlayPanel = ({ title, objectPointer }) => {
  return (
    <OverlayPanel
      ref={objectPointer}
      style={{ width: "320px", height: "180px" }}
    >
      <div className="title mb-2">
        <label className="overlay-help-title">{title}</label>
      </div>
      <ScrollPanel
        style={{ width: "100%", height: "130px" }}
        className="help-scroll-panel"
      >
        Some quick example text to build on the card title and make up the bulk
        of the card’s content. This is a tool tip that appears when a user
        hovers over a contextual help icon. You can also scroll to see more
        information.
      </ScrollPanel>
    </OverlayPanel>
  );
};

export default HelpOverlayPanel;
