import React, { useState, useEffect } from "react";
import { Tree } from "primereact/tree";

const DocumentFolders = () => {
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
  const [selectedKeys, setSelectedKeys] = useState(null);
  return (
    <div className="mt-8">
      <Tree
        value={nodes}
        selectionMode="checkbox"
        selectionKeys={selectedKeys}
        onSelectionChange={(e) => setSelectedKeys(e.value)}
        filter
        filterMode="lenient"
        filterPlaceholder=""
      />
    </div>
  );
};

export default DocumentFolders;
