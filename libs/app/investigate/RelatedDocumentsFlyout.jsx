//import './RelatedDocumentsFlyout.scss'
import './AdvancedSettingsFlyout.scss'
import React from 'react';
import { useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import IconButton from '_shared/icon-button/IconButton';
import styled from 'styled-components';
import client from './httpClient';

import SageDataTable from "_shared/data-grid/SageDataTable";
import SageTableColumn from "_shared/data-grid/column/SageTableColumn";
import SageDataTableCell from "_shared/data-grid/SageDataTableCell";

const columns = [
    { field: "select", header: "" },
    { field: "number", header: "#" },
    { field: "view", header: "" },
    { field: "summary", header: "AI SUMMARY" },
    { field: "documentId", header: "DOCID" },
    { field: "filename", header: "DOC FILENAME/SUBJECT" },
    { field: "filetype", header: "DOC FILE TYPE" },
    { field: "score", header: "SIMILARITY SCORE" },
    { field: "included", header: "FED TO AI" },
    { field: "cited", header: "CITED BY AI" }
];

const H3 = styled.h3`
    display: inline-block;
`;

const header = "Relevant Documents";
const helpTooltipText = "This is informative text.";

const RelatedDocumentsFlyout = ({ visible, onClose }) => {

    const content = ({ closeIconRef, hide }) => {
        return (
            <>
                <div className="sage-flyout__header">
                    <div className="header__title">
                        <H3>{header}</H3>
                        <IconButton className="sage-icon-superscript" icon="circle-question" title={helpTooltipText} titlePlacement="bottom" />
                    </div>
                </div>
                <div className="sage-flyout__body flex flex-grow-1">
                    <div>
                        <SageDataTable
                            dataKey="docId"
                            isColumnResizable={false}
                            showGridlines={true}
                            paginator={false}
                            rows={25}
                            style={{ width: "100%", minWidth: "50rem" }}
                            cellSelection={false}
                        >
                            {columns.map((col, i) => (
                                <SageTableColumn
                                    key={col.field}
                                    field={col.field}
                                    header={col.header}
                                    isSortable={false}
                                    isFilterable={false}
                                    body={(row) => {
                                        return (
                                            <SageDataTableCell
                                                cellText={row[col.field]}
                                                showToolTip={false}
                                                truncateText={true}
                                            />
                                        );
                                    }}
                                />
                            ))}
                        </SageDataTable>
                    </div>
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
            className="sage-advanced-options__flyout flex flex-column"
            content={content}></Sidebar>
    );
}

export default RelatedDocumentsFlyout;