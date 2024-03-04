import './RelatedDocumentsFlyout.scss'
import React from 'react';
import { useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Icon from '_shared/icon/Icon';
import IconButton from '_shared/icon-button/IconButton';
import styled from 'styled-components';
import client from './httpClient';

import DataTable from "_shared/data-table/DataTable";
import DataColumn from "_shared/data-table/DataColumn";

const columns = [
    { field: "number", header: "#" },
    { field: "view", header: "", body: (row) => { return (<IconButton icon="fa-regular fa-eye"/>) } },
    { field: "summary", header: "AI Summary", body: (row) => { return (<IconButton icon="fa-regular fa-file"/>) } },
    { field: "documentId", header: "DOCID" },
    { field: "filename", header: "Doc File Name/Subject" },
    { field: "filetype", header: "Doc File Type" },
    { field: "score", header: "Similarity Score" },
    { field: "included", header: "Fed to AI", body: (row) => { if (row.included) {return (<Icon icon="check"/>) }} },
    { field: "cited", header: "Cited by AI", body: (row) => { if (row.cited) {return (<Icon icon="check"/>) }} }
];

const data = [
    {
        select: false,
        number: 1,
        view: "",
        summary: "summary",
        documentId: "4321",
        filename: "filename",
        filetype: "filetype",
        score: "1.0",
        included: true,
        cited: true
    },
    {
        select: false,
        number: 2,
        view: "",
        summary: "summary",
        documentId: "3214",
        filename: "filename",
        filetype: "filetype",
        score: "0.9",
        included: false,
        cited: false
    },
    {
        select: false,
        number: 3,
        view: "",
        summary: "summary",
        documentId: "2143",
        filename: "filename",
        filetype: "filetype",
        score: "0.8",
        included: true,
        cited: false
    },
    {
        select: false,
        number: 4,
        view: "",
        summary: "summary",
        documentId: "1432",
        filename: "filename",
        filetype: "filetype",
        score: "0.7",
        included: false,
        cited: true
    }
];

const H3 = styled.h3`
    display: inline-block;
`;

const header = "Relevant Documents";
const helpTooltipText = "This is informative text.";

const RelatedDocumentsFlyout = ({ visible, onClose }) => {
    const [values, setValues] = useState([]);
    const [selectedData, setSelectedData] = useState(null);

    useEffect(() => {
        setValues(data)
    }, []);

    const content = ({ closeIconRef, hide }) => {
        return (
            <>
                <div className="sage-flyout__header">
                    <div className="header__title">
                        <H3>{header}</H3>
                        <IconButton className="sage-icon-superscript" icon="circle-question" title={helpTooltipText} titlePlacement="bottom" />
                    </div>
                </div>
                <div className="sage-flyout__body flex flex-grow-1 mb-2">
                    <DataTable
                        dataKey="documentId"
                        value={values}
                        selectionMode="multiple"
                        selection={selectedData}
                        onSelectionChange={(e) => setSelectedData(e.value)}
                        style={{ width: "100%" }}>
                        {columns.map((col, i) => (
                            <DataColumn
                                key={col.field}
                                columnKey={col.field}
                                {...col}
                            />
                        ))}
                    </DataTable>
                </div>
                <div className="sage-flyout__footer flex justify-content-end">
                    <Button className="footer__close-button" ref={closeIconRef} onClick={(e) => hide(e)} label="Close" />
                </div>
            </>
        );
    };

    return (
        <Sidebar
            position="right"
            visible={visible}
            onHide={onClose}
            className="sage-related-documents__flyout flex flex-column"
            content={content}></Sidebar>
    );
}

export default RelatedDocumentsFlyout;