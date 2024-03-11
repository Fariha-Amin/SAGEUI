import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const charLimit = 1000;

const NotesModal = ({
  dialogPosition,
  visible,
  setVisible,
  saveClickHandler,
  rowData,
}) => {
  const [charCount, setCharCount] = useState(rowData.notes.length);
  const [inputChars, setInputChars] = useState(rowData.notes);

  const footerContent = (
    <div>
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        style={{ margin: "0rem 0.6rem" }}
        onClick={() => onNotesCancelClick()}
      />
      <Button
        label="Save & Close"
        severity="primary"
        onClick={(e) => onNotesSaveClick(e)}
        disabled={charCount > charLimit ? true : false}
      />
    </div>
  );

  const onNotesSaveClick = (e) => {
    // saveClickHandler();
  };

  const onNotesCancelClick = () => {
    setVisible(false);
    setCharCount(0);
  };

  const handleInputChange = (e) => {
    setCharCount(e.target.value.length);
    setInputChars(e.target.value);
  };

  return (
    <Dialog
      className="sageTable-note-modal"
      header="Add note"
      footer={footerContent}
      visible={visible}
      blockScroll={true}
      modal
      closable={false}
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
    >
      <InputTextarea
        rows={8}
        placeholder="Enter a note."
        style={{ resize: "none", width: "100%" }}
        onChange={(e) => handleInputChange(e)}
        className={charCount > charLimit ? "p-invalid" : ""}
        value={inputChars}
      />
      <div
        className="sageTable-noteModal-char-count"
        style={charCount > charLimit ? { color: "red" } : {}}
      >
        <p>
          {charCount}/1000{" "}
          {charCount > charLimit
            ? "You have reached the maximun character limit."
            : ""}
        </p>
      </div>
    </Dialog>
  );
};

export default NotesModal;
