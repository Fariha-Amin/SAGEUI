import React, { useRef } from "react";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import HelpIcon from "../../icons/help.svg";
import DownloadIcon from "../../icons/download.svg";
import { OverlayPanel } from "primereact/overlaypanel";
import HelpIconSm from "../../icons/help_18.svg";
import ViewAllSummariesButton from "../../components/ViewAllSummariesButton";

const SummaryHeader = () => {
  const op = useRef(null);

  return (
    <>
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
            neXgenAI Summarize
            <span>
              <HelpIcon
                style={{ verticalAlign: "top" }}
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
          <div className="position-relative mt-4">
            <span className="header-text-wrapper">List of Summaries </span>
            <span className="icon-position">
              <HelpIconSm onClick={(e) => op.current.toggle(e)} />
            </span>
          </div>
        </div>

        <div className="col d-flex justify-content-end">
          <ViewAllSummariesButton />
          <div className="ml-4">
            <DownloadIcon style={{ marginTop: "8px" }} />
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
