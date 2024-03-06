import React, { useRef } from "react";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import HelpIcon from "../../icons/help.svg";
import DownloadIcon from "../../icons/download.svg";
import { OverlayPanel } from "primereact/overlaypanel";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

const SummaryHeader = () => {
  const op = useRef(null);

  const confirm1 = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
    });
  };
  return (
    <>
      {/* <ConfirmPopup /> */}
      <OverlayPanel
        ref={op}
        style={{ width: "320px", height: "180px", overflowY: "scroll" }}
      >
        <div
          className="div-wrapper"
          style={{ width: "280px", height: "180px" }}
        >
          <p className="div">
            Some quick example text to build on the card title and make up the
            bulk of the card’s content. This is a tool tip that appears when a
            user hovers over a contextual help icon. You can also scroll to see
            more information,
          </p>
        </div>
      </OverlayPanel>
      <div className="row">
        <div className="col d-flex align-items-center">
          <p className="font-size-header font-weight-bold">
            neXgenAI Summarize{" "}
            <span>
              <HelpIcon
                style={{ verticalAlign: "center" }}
                onClick={(e) => op.current.toggle(e)}
              />
            </span>
          </p>
        </div>
        <div className="col d-flex justify-content-end">
          <Button
            className="btn-height"
            label="Create new summary"
            severity="primary"
            raised
          />
        </div>
      </div>

      <div
        className="row d-flex align-items-end"
        style={{ padding: "0px 8px", backGroundColor: "#F9FAFB" }}
      >
        <div className="col">
          <span className="font-weight-bold">List of Summaries </span>
          <span>
            <HelpIcon
              style={{ verticalAlign: "top" }}
              onClick={(e) => op.current.toggle(e)}
            />
          </span>
        </div>

        <div className="col d-flex justify-content-end">
          <Button
            className="btn-height ml-4"
            label="View all summaries"
            severity="info"
            outlined
          />
          <div className="ml-4">
            <DownloadIcon />
          </div>
          <SplitButton
            className="btn-height ml-4"
            buttonClassName="p-disabled"
            severity="primary"
            label="Action"
          ></SplitButton>
        </div>
      </div>
    </>
  );
};

export default SummaryHeader;
