import './RelatedDocumentsFlyout.scss'
import React from 'react';
import { useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Icon from '_shared/icon/Icon';
import IconButton from '_shared/icon-button/IconButton';
import DataTable from "_shared/data-table/DataTable";
import DataColumn from "_shared/data-table/DataColumn";
import RowSummary from './RowSummary';
import styled from 'styled-components';
import client from './httpClient';

const rowExpandedTemplate = (row) => {
    return (<RowSummary documentId={row.documentId} />);
};

const summaryTemplate = (row) => {
    const [title, setTitle] = useState("View Summary");
    const onExpandedDelegate = () => {
        setTitle("Hide Summary");
    };
    const onCollapsedDelegate = () => {
        setTitle("View Summary");
    };
    const onClickDelegate = (e) => {
        row.toggleRowExpansion(e, onExpandedDelegate, onCollapsedDelegate)
    };
    return (<IconButton icon="fa-regular fa-file" onClick={onClickDelegate} title={title} />);
};

const columns = [
    { key: 0, selector: true },
    { key: 1, field: "number", header: "#" },
    { key: 2, field: "view", header: "", body: (row) => { return (<IconButton icon="fa-regular fa-eye" />); } },
    { key: 3, field: "summary", header: "AI Summary", body: summaryTemplate },
    { key: 4, field: "documentId", header: "DOCID" },
    { key: 5, field: "filename", header: "Doc File Name/Subject" },
    { key: 6, field: "filetype", header: "Doc File Type" },
    { key: 7, field: "score", header: "Similarity Score" },
    { key: 8, field: "included", header: "Fed to AI", body: (row) => { if (row.included) { return (<Icon icon="check" />); } } },
    { key: 9, field: "cited", header: "Cited by AI", body: (row) => { if (row.cited) { return (<Icon icon="check" />); } } }
];

const H3 = styled.h3`
    display: inline-block;
`;

const header = "Relevant Documents";
const helpTooltipText = "Help text placeholder";

const RelatedDocumentsFlyout = ({ visible, onClose, investigationId, documentId }) => {
    const [relatedDocs, setRelatedDocs] = useState([]);
    const [selectedDocs, setSelectedDocs] = useState(null);
    const [expandedDocs, setExpandedDocs] = useState(null);
    const [isLoadingTable, setIsLoadingTable] = useState(false);
    const [isLoadingSummaries, setIsLoadingSummaries] = useState(false);

    useEffect(() => {
        setIsLoadingTable(true);

        async function getRelatedDocuments(investigationId) {
            let docs = await client.getReferenceDocumentsAsync(investigationId);

            // Sort by most relevant (Score descending)
            docs = docs.toSorted((a, b) => b.score - a.score);

            // Add index as "number" field
            for (let i = 0; i < docs.length; i++) {
                docs[i].number = i + 1;
            }

            setRelatedDocs(docs);
            setIsLoadingTable(false);
        }
        getRelatedDocuments(investigationId);
    }, [investigationId]);

    useEffect(() => {
        if (!documentId) {
            // If we aren't viewing a specific document make sure none are selected
            setSelectedDocs(null);
            setExpandedDocs(null);
            return;
        }

        // Set selected
        const selectedDoc = relatedDocs.find(i => i.documentId === documentId);
        setSelectedDocs([selectedDoc]);

        // Set expanded
        const expandedDoc = {};
        expandedDoc[documentId] = true;
        setExpandedDocs(expandedDoc);
    }, [documentId]);

    const onSummariesClickDelegate = (e) => {
        
    };

    const content = ({ closeIconRef, hide }) => {
        return (
            <>
                <div className="sage-flyout__header mb-2">
                    <div className="header__title">
                        <H3>{header}</H3>
                        <IconButton className="sage-icon-superscript" icon="circle-question" title={helpTooltipText} titlePlacement="bottom" />
                    </div>
                    <div className="header__sub-title">
                        <div class="flex justify-content-between flex-wrap">
                            <div class="flex">
                                <Button label="View All Summaries" outlined loading={isLoadingSummaries} onClick={onSummariesClickDelegate} />
                            </div>
                            <div class="flex">
                                {/*Actions button goes here*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sage-flyout__body flex flex-grow-1 mb-2">
                    <DataTable
                        id="relatedDocsTable"
                        dataKey="documentId"
                        data={relatedDocs}
                        style={{ width: "100%" }}
                        loading={isLoadingTable}
                        selectable
                        selectionType="multiple"
                        selectedRows={selectedDocs}
                        expandable
                        expandedRows={expandedDocs}
                        rowExpandedTemplate={rowExpandedTemplate}>
                        {columns.map((col, i) => (
                            <DataColumn {...col} />
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