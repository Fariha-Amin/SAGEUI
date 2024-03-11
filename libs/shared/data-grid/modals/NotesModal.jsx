import React from "react";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const footerContent = (
  <div>
    <Button
      label="Cancel"
      severity="secondary"
      outlined
      style={{ margin: "0rem 0.6rem" }}
    />
    <Button label="Save & Close" severity="primary" />
  </div>
);

const NotesModal = ({ dialogPosition, visible, setVisible }) => {
  return (
    <Dialog
      className="sageTable-note-modal"
      header="Add note"
      footer={footerContent}
      visible={visible}
      blockScroll={true}
      modal
      closable={true}
      headerClassName="sageTable-noteModal-header"
      contentStyle={{
        padding: "0.5rem 1.5rem 0rem 0.75rem",
      }}
      style={{
        width: "375px",
        position: "absolute",
        left: dialogPosition.x,
        top: dialogPosition.y,
      }}
      onHide={() => setVisible(false)}
    >
      <InputTextarea
        rows={8}
        placeholder="Enter a note."
        style={{ resize: "none", width: "100%" }}
      />
      <div id="sageTable-noteModal-char-count">
        <p>0/1000</p>
      </div>
    </Dialog>
  );
};

export default NotesModal;
