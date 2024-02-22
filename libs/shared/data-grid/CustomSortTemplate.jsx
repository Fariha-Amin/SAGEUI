import React from 'react';
import sortIcon from '../../../app/summarize/assets/images/sort.png';
import sortUpIcon from '../../../app/summarize/assets/images/sort-up.png';
import sortDownIcon from '../../../app/summarize/assets/images/sort-down.png';

const CustomSortTemplate = (props) => {
  const { field, header, sortable, sortOrder, onSort, currentSortField } = props;

  // Determine which sort icon to display based on sortOrder and currentSortField
  let sortIconSrc = sortIcon; // Default sort icon
  if (field === currentSortField) {
    sortIconSrc = sortOrder === 1 ? sortUpIcon : sortDownIcon;
  }

  const handleSortClick = () => {
    // Toggle sortOrder when clicked
    const newSortOrder = field === currentSortField ? -1 : 1;
    onSort({ field, order: newSortOrder });
  };

  return (
    <span onClick={handleSortClick} style={{ cursor: 'pointer' }}>
      {header} 
      {sortable && <img src={sortIconSrc} alt="Sort Icon" className="custom-sorticon" />}
    </span>
  );
};

export default CustomSortTemplate;
