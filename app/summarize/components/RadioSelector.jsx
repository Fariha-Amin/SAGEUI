import React from "react";
import { RadioButton } from "primereact/radiobutton";
const RadioSelector = ({
  options,
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <>
      {options.map((option) => (
        <div key={option.key} className="d-flex align-items-center mb-3">
          <RadioButton
            inputId={option.key}
            name="category"
            value={option.key}
            onChange={(e) => {
              setSelectedOption(e.value);
            }}
            checked={selectedOption === option.key}
          />
          <label htmlFor={option.key}>{option.name}</label>
        </div>
      ))}
    </>
  );
};

export default RadioSelector;
