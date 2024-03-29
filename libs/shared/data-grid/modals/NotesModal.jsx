import React, { useState, useRef, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { DataService } from "../utility/DataService";
import { useDispatch } from "react-redux";
import { updateNotesByRecId } from "../features/tableDataSlice";

const charLimit = 1000;

const NotesModal = ({
  dialogPosition,
  visible,
  setVisible,
  rowData,
  loginUserEmail,
}) => {
  const [charCount, setCharCount] = useState(rowData.notes.length);
  const [inputChars, setInputChars] = useState(rowData.notes);
  const dispatch = useDispatch();

  const textareaRef = useRef(null);

  const handleKeyDown = (event) => {
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ) {
      event.stopPropagation();
    }
  };

  const footerContent = (
    <div className="footer-button">
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        onClick={() => onNotesCancelClick()}
      />
      <Button
        label="Save & Close"
        severity="primary"
        onClick={() => onNotesSaveClick()}
        disabled={charCount > charLimit ? true : false}
      />
    </div>
  );

  const onNotesSaveClick = () => {
    const updateData = {
      recId: rowData.recId,
      notes: inputChars.trim(),
      userId: loginUserEmail,
    };
    DataService.updateSummarizeData(
      "https://localhost:5000/api/saveOrEditNotes",
      updateData
    );
    dispatch(updateNotesByRecId(updateData));
    setVisible(false);
    setInputChars(updateData.notes);
  };

  const onNotesCancelClick = () => {
    setVisible(false);
    setCharCount(rowData.notes.length);
    setInputChars(rowData.notes);
  };

  const handleInputChange = (e) => {
    setCharCount(e.target.value.length);
    setInputChars(e.target.value);
  };

  return (
    <Dialog
      className="sageTable-note-modal"
      maskClassName="sageTable-notes-modal-mask"
      headerClassName="sageTable-noteModal-header"
      header="Add note"
      footer={footerContent}
      visible={visible}
      blockScroll={true}
      modal={true}
      closable={false}
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
        placeholder="Enter a note here."
        style={{ resize: "none", width: "100%" }}
        onChange={handleInputChange}
        className={charCount > charLimit ? "p-invalid" : ""}
        value={inputChars}
        ref={textareaRef}
        onKeyDown={handleKeyDown}
        autoFocus={true}
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
