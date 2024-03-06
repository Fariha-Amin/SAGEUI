import React from "react";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";

export const SelectAllModal = (props) => {
  const {
    visible,
    header,
    footer,
    onHideHandler,
    radioOptions,
    setSelectedRadioOption,
    selectedRadioOption,
  } = props;

  return (
    <Dialog
      visible={visible}
      header={header}
      footer={footer}
      style={{ width: "32rem" }}
      onHide={onHideHandler}
    >
      {radioOptions.map((option) => (
        <div className="p-col p-modal-container" key={option.value}>
          <RadioButton
            inputId={option.value}
            name="option"
            value={option.value}
            onChange={(e) => setSelectedRadioOption(e.value)}
            checked={selectedRadioOption === option.value}
          />
          <label style={{ fontSize: "16px" }} htmlFor={option.value}>
            {option.label}
          </label>
        </div>
      ))}
    </Dialog>
  );
};

export default SelectAllModal;
