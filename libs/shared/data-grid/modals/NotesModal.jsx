import React from "react";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";

const NotesModal = ({ dialogPosition, visible, setVisible }) => {
  return (
    <Dialog
      header="Add note"
      visible={visible}
      blockScroll={true}
      modal
      closable={true}
      headerStyle={{
        padding: "0.5rem 0.5rem 0rem 0.5rem",
        fontFamily: "Inter, Helvetica",
      }}
      contentStyle={{
        padding: "0.5rem 0.5rem 5rem 0.5rem",
      }}
      style={{
        width: "20vw",
        position: "absolute",
        left: dialogPosition.x,
        top: dialogPosition.y,
        padding: "0.5rem",
      }}
      onHide={() => setVisible(false)}
    >
      <InputTextarea rows={5} cols={30} autoResize />
    </Dialog>
  );
};

export default NotesModal;
