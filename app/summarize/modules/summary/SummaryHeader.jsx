import React, { useRef } from "react";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import HelpIcon from "../../icons/help.svg";
import DownloadIcon from "../../icons/download.svg";
import HelpIconSm from "../../icons/help_18.svg";
import ViewAllSummariesButton from "../../components/ViewAllSummariesButton";
import HelpButton from "../../components/Helpbutton";
import HelpOverlayPanel from "../../components/HelpOverlayPanel";

const SummaryHeader = () => {
  const titleHelpButtonPointer = useRef(null);
  const labelHelpButtonPointer = useRef(null);

  return (
    <>
      {titleHelpButtonPointer && (
        <HelpOverlayPanel
          title={"neXgenAI Summarize"}
          objectPointer={titleHelpButtonPointer}
          style={{ width: "320px", height: "180px" }}
        />
      )}

      {labelHelpButtonPointer && (
        <HelpOverlayPanel
          title={"List of Summaries"}
          objectPointer={labelHelpButtonPointer}
          style={{ width: "320px", height: "180px" }}
        />
      )}
      <div className="row">
        <div className="col">
          <div className="position-relative">
            <span className="font-size-header font-weight-bold">
              neXgenAI Summarize
            </span>
            <span className="header-icon-position">
              <HelpButton
                onClickHandle={(e) => titleHelpButtonPointer.current.toggle(e)}
                icon={<HelpIcon />}
              />
            </span>
          </div>
        </div>
        <div className="col d-flex align-items-end justify-content-end">
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
              <HelpButton
                onClickHandle={(e) => labelHelpButtonPointer.current.toggle(e)}
                icon={<HelpIconSm />}
              />
            </span>
          </div>
        </div>

        <div className="col d-flex justify-content-end">
          <ViewAllSummariesButton />
          <div className="ml-4">
            <DownloadIcon style={{ marginTop: "8px" }} />
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
