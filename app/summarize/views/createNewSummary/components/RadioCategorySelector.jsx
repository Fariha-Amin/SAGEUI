import React from "react";
import { RadioButton } from "primereact/radiobutton";
const RadioCategorySelector = ({
  categories,
  selectedCategory,
  onRadioSelectionChange,
  categoryContainer,
}) => {
  return (
    <>
      {categories.map((category) => (
        <div key={category.key} className={categoryContainer}>
          <RadioButton
            inputId={category.key}
            name="category"
            value={category.key}
            onChange={onRadioSelectionChange}
            checked={selectedCategory === category.key}
          />
          <label htmlFor={category.key}>{category.name}</label>
        </div>
      ))}
    </>
  );
};

export default RadioCategorySelector;
