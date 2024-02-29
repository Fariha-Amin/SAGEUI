import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";

const ColumnCheckBox = ({ onSelectAllChange, onCheckboxClick, selectAll }) => {
  return (
    <Column
      headerStyle={{ width: "3rem" }}
      header={<Checkbox onChange={onSelectAllChange} checked={selectAll} />}
      body={(rowData) => {
        return (
          <Checkbox
            checked={isRowSelected(rowData)}
            onChange={(e) => onCheckboxClick(e, rowData)}
          />
        );
      }}
    />
  );
};

export default ColumnCheckBox;
