import React, { useState, useEffect } from "react";
import { Tree } from "primereact/tree";
import store from "../../../store/store";

import {
  updateSelectedFolders,
  updateExpandFolders,
} from "../../../features/createNewSummary/selectDocumentsSlice";
import { useSelector, useDispatch } from "react-redux";

import styles from "../style.module.scss";

const DocumentFolders = () => {
  const dispatch = useDispatch();

  // Subscribers
  const selectedFolders = useSelector(
    (state) => state.selectDocumentsDataSlice.selectedFolders
  );
  const expandedFolders = useSelector(
    (state) => state.selectDocumentsDataSlice.expandedFolders
  );

  // Expand and collapse event
  const onFolderToggleHandler = (e) => {
    dispatch(updateExpandFolders(e.value));
  };

  const onFolderSelectionChange = (e) => {
    dispatch(updateSelectedFolders(e.value));
  };

  const [nodes, setNodes] = useState([
    {
      key: "0",
      label:
        "Documentsghfghfghfghfghfghgkghkhfghfghfghfghfghfghfghfghfghfghfghfghfghfghfghfghfghfghf",
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
              children: [
                {
                  key: "0-1-0-0",
                  label: "Invoices.txt",
                  icon: "pi pi-fw pi-file",
                  data: "Invoices for this month",
                },
                {
                  key: "0-1-0-1",
                  label: "Invoices.txt",
                  icon: "pi pi-fw pi-file",
                  data: "Invoices for this month",
                },
                {
                  key: "0-1-0-2",
                  label: "Invoices.txt",
                  icon: "pi pi-fw pi-file",
                  data: "Invoices for this month",
                },
                {
                  key: "0-1-0-3",
                  label: "Invoices.txt",
                  icon: "pi pi-fw pi-file",
                  data: "Invoices for this month",
                },
                {
                  key: "0-1-0-4",
                  label: "Invoices.txt",
                  icon: "pi pi-fw pi-file",
                  data: "Invoices for this month",
                },
              ],
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
        expandedKeys={expandedFolders}
        selectionMode="checkbox"
        selectionKeys={selectedFolders}
        onSelectionChange={onFolderSelectionChange}
        filter
        filterMode="lenient"
        filterPlaceholder=""
        onToggle={onFolderToggleHandler}
        pt={{
          content: { className: `${styles.treeContent}` },
          container: { className: `${styles.treeContainer}` },
          root: { className: `${styles.treeRootContainer}` },
        }}
      />
    </div>
  );
};

export default DocumentFolders;
