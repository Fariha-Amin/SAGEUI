import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

const CustomDialog = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });

  const handleMouseClick = (event) => {
    // Calculate dialog position based on mouse click coordinates
    const posX = event.clientX;
    const posY = event.clientY;

    setDialogPosition({ x: posX, y: posY });
    setDialogVisible(true);
  };

  const handleDialogHide = () => {
    setDialogVisible(false);
  };

  return (
    <div onClick={handleMouseClick}>
      <Dialog
        visible={dialogVisible}
        onHide={handleDialogHide}
        header="Custom Dialog"
        style={{
          position: "absolute",
          left: dialogPosition.x,
          top: dialogPosition.y,
        }}
      >
        {<p>Hello!</p>}
      </Dialog>
    </div>
  );
};

export default CustomDialog;
