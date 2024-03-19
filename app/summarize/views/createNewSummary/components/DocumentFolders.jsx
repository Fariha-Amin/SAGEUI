import React, { useState, useEffect } from "react";
import { Tree } from "primereact/tree";
import store from "../../../store/store";

import { updateSelectedFolders } from "../../../features/createNewSummary/selectDocumentsSlice";
import { useSelector, useDispatch } from "react-redux";

import styles from "../style.module.scss";

const DocumentFolders = () => {
  const dispatch = useDispatch();
  // Table data state subscribers
  const selectedFolders = useSelector(
    (state) => state.selectDocumentsDataSlice.selectedFolders
  );

  const onFolderSelectionChange = (e) => {
    console.log("before change:", store.getState().selectDocumentsDataSlice);
    dispatch(updateSelectedFolders(e.value));
    console.log("after change:", store.getState().selectDocumentsDataSlice);
  };

  const [nodes, setNodes] = useState([
    {
      key: "0",
      label:
        "Documentsghfghfghfghfghfghfghfghfghfghfghfghfghfghfghfghfghfghfghfghfghfghfghfghf",
      data: "Documents Folder",
      icon: "pi pi-fw pi-inbox",
      children: [
        {
          key: "0-0",
          label: "Work",
          data: "Work Folder",
          icon: "pi pi-fw pi-cog",
          children: [
            {
              key: "0-0-0",
              label: "Expenses.doc",
              icon: "pi pi-fw pi-file",
              data: "Expenses Document",
            },
            {
              key: "0-0-1",
              label: "Resume.doc",
              icon: "pi pi-fw pi-file",
              data: "Resume Document",
            },
          ],
        },
        {
          key: "0-1",
          label: "Home",
          data: "Home Folder",
          icon: "pi pi-fw pi-home",
          children: [
            {
              key: "0-1-0",
              label: "Invoices.txt",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div className="">
      <Tree
        value={nodes}
        selectionMode="checkbox"
        selectionKeys={selectedFolders}
        onSelectionChange={onFolderSelectionChange}
        filter
        filterMode="lenient"
        filterPlaceholder=""
        className="w-full"
        pt={{
          content: { className: `${styles.treeContent}` },
        }}
      />
    </div>
  );
};

export default DocumentFolders;
