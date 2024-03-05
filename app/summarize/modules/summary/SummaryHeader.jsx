import React from "react";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import HelpIcon from "../../icons/help.svg";
import DownloadIcon from "../../icons/download.svg";

const handleClick = () => {
  console.log("her");
};
const SummaryHeader = () => {
  return (
    <>
      <div className="row">
        <div className="col d-flex align-items-center">
          <p className="font-size-header font-weight-bold">
            neXgenAI Summarize{" "}
            <span>
              <HelpIcon
                style={{ verticalAlign: "center" }}
                onClick={handleClick}
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
      <div>
        <div
          className="row d-flex align-items-end"
          style={{ padding: "0px 8px", backGroundColor: "#F9FAFB" }}
        >
          <div className="col">
            <span className="font-weight-bold">List of Summaries </span>
            <span>
              <HelpIcon
                style={{ verticalAlign: "top" }}
                onClick={handleClick}
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
              severity="primary"
              label="Action"
            ></SplitButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryHeader;
