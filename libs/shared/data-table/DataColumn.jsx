import React from "react";
import { Column } from "primereact/column";

const columnTemplate = {
    columnKey: null,
    field: null,
    style: null,
    className: null,
    header: null,
    headerStyle: null,
    headerClassName: null,
    footer: null,
    footerStyle: null,
    footerClassName: null,
    body: null,
    bodyStyle: null,
    bodyClassName: null,
    sortable: null,
    selectionMode: null,
    expander: null
}

function intersect(template, data) {
    // Return an object that contains values for properties that exist in both the template and data model
    // Example: template { a, b, c } -> data { a: "1", c: "3", d: "4" } -> intersection { a: "1", c: "3" }
    // - include a and c since these properties are present on both template and data
    // - exclude b since it is not present on data
    // - exclude d since it is not present on template
    const tKeys = Object.keys(template);
    const dKeys = Object.keys(data);
    const result = {};
    for (const key of tKeys)
        if (dKeys.includes(key)) {
            result[key] = data[key];
        }
    return result;
}

export default function SageDataColumn(props) {

    const columnProps = intersect(columnTemplate, props);

    return (
        <Column {...columnProps} />
    );
}
