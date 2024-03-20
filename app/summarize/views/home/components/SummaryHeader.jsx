import React, { useRef } from "react";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import HelpIcon from "../../../icons/help.svg";
import DownloadIcon from "../../../icons/download.svg";
import HelpIconSm from "../../../icons/help_18.svg";
import ViewAllSummariesButton from "../../../components/ViewAllSummariesButton";
import HelpButton from "../../../components/Helpbutton";
import HelpOverlayPanel from "../../../components/HelpOverlayPanel";

const SummaryHeader = ({ onNewSummaryClick }) => {
  const titleHelpButtonPointer = useRef(null);
  const labelHelpButtonPointer = useRef(null);
  const isTestEnvironment = process.env.NODE_ENV === "test";


  return (
    <>
      {titleHelpButtonPointer && (
        <HelpOverlayPanel
          title="neXgenAI Summarize"
          objectPointer={titleHelpButtonPointer}
          style={{ width: "320px", height: "180px" }}
        />
      )}

      {labelHelpButtonPointer && (
        <HelpOverlayPanel
          title="List of Summaries"
          objectPointer={labelHelpButtonPointer}
          style={{ width: "320px", height: "180px" }}
        />
      )}
      <div className="row mb-3">
        <div className="col">
          <div className="position-relative">
            <span className="summarize-home-title">neXgenAI Summarize</span>
            <span className="header-icon-position">
              <HelpButton
                onClickHandle={(e) => titleHelpButtonPointer.current.toggle(e)}
                icon={!isTestEnvironment && <HelpIcon />}
              />
            </span>
          </div>
        </div>
        <div className="col d-flex align-items-end justify-content-end">
          <Button
            className="btn-height"
            label="Create new summary"
            severity="primary"
            onClick={() => {
              onNewSummaryClick();
            }}
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
              <HelpButton
                onClickHandle={(e) => labelHelpButtonPointer.current.toggle(e)}
                icon={!isTestEnvironment && <HelpIconSm />}
              />
            </span>
          </div>
        </div>

        <div className="col d-flex justify-content-end">
          <div className="selected-count">0 out of 100 summaries selected</div>
          <ViewAllSummariesButton />
          <div className="ml-4">
          {!isTestEnvironment && <DownloadIcon style={{ marginTop: "8px" }} />}
          </div>
          <SplitButton
            className="btn-height ml-4 p-disabled"
            severity="primary"
            label="Action"
          ></SplitButton>
        </div>
      </div>
    </>
  );
};

export default SummaryHeader;
