import './RelatedDocumentsFlyout.scss'
import React from 'react';
import { useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Icon from '_shared/icon/Icon';
import IconButton from '_shared/icon-button/IconButton';
import DataTable from "_shared/data-table/DataTable";
import DataColumn from "_shared/data-table/DataColumn";
import styled from 'styled-components';
import client from './httpClient';

const columns = [
    { field: "number", header: "#" },
    { field: "view", header: "", body: (row) => { return (<IconButton icon="fa-regular fa-eye" />); } },
    { field: "summary", header: "AI Summary", body: (row) => { return (<IconButton icon="fa-regular fa-file" />); } },
    { field: "documentId", header: "DOCID" },
    { field: "filename", header: "Doc File Name/Subject" },
    { field: "filetype", header: "Doc File Type" },
    { field: "score", header: "Similarity Score" },
    { field: "included", header: "Fed to AI", body: (row) => { if (row.included) { return (<Icon icon="check" />); } } },
    { field: "cited", header: "Cited by AI", body: (row) => { if (row.cited) { return (<Icon icon="check" />); } } }
];

const H3 = styled.h3`
    display: inline-block;
`;

const header = "Relevant Documents";
const helpTooltipText = "Help text placeholder";

const RelatedDocumentsFlyout = ({ visible, onClose, investigationId }) => {
    const [relatedDocs, setRelatedDocs] = useState([]);
    const [selectedDocs, setSelectedDocs] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        async function getRelatedDocuments(investigationId) {
            let docs = await client.getReferenceDocumentsAsync(investigationId);
            
            // Sort by most relevant (Score descending)
            docs = docs.toSorted((a, b) => b.score - a.score);

            // Add index as "number" field
            for (let i = 0; i < docs.length; i++) {
                docs[i].number = i + 1;
            }

            setRelatedDocs(docs);
            setIsLoading(false);
        }
        getRelatedDocuments(investigationId);
    }, [investigationId]);

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
                        id="relatedDocsTable"
                        dataKey="documentId"
                        className="sage-table"
                        value={relatedDocs}
                        selectionMode="multiple"
                        selection={selectedDocs}
                        onSelectionChange={(e) => setSelectedDocs(e.value)}
                        style={{ width: "100%" }}
                        loading={isLoading}>
                        {columns.map((col, i) => (
                            <DataColumn
                                key={col.field}
                                columnKey={col.field}
                                className="sage-column"
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