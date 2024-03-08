import React from 'react';
import '@testing-library/jest-dom'
import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import RelatedDocumentsFlyout from './RelatedDocumentsFlyout';
import sageClient from "_investigate/httpClient";

jest.mock("_investigate/httpClient");

describe("RelatedDocumentsFlyout UI", () => {
    test("RPMXCON-85449 renders expected header text", () => {
        // Arrange
        const handleOnClose = jest.fn();
        const expectedText = "Relevant Documents";

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />);
        const element = document.querySelector(".sage-flyout__header h3");

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
        expect(element.innerHTML).toMatch(expectedText);
    });

    test("RPMXCON-85449 renders expected header tooltip icon", () => {
        // Arrange
        const handleOnClose = jest.fn();
        const expectedIcon = "circle-question";

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />);
        const element = document.querySelector(`.sage-flyout__header [data-icon="${expectedIcon}"]`);

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("RPMXCON-85449 renders table", () => {
        // Arrange
        const handleOnClose = jest.fn();

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />);
        const element = document.querySelector(".sage-flyout__body table");

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("RPMXCON-85450 renders expected table headers", () => {
        // Arrange
        const handleOnClose = jest.fn();

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />);
        
        const headers = document.querySelectorAll("th .p-column-title");

        // Assert
        expect(headers).toHaveLength(10);

        const selectionHeader = headers[0];
        expect(selectionHeader.innerHTML).toMatch("");

        const numberHeader = headers[1];
        expect(numberHeader.innerHTML).toMatch("#");

        const viewHeader = headers[2];
        expect(viewHeader.innerHTML).toMatch("");

        const summaryHeader = headers[3];
        expect(summaryHeader.innerHTML).toMatch("AI Summary");

        const docIdHeader = headers[4];
        expect(docIdHeader.innerHTML).toMatch("DOCID");

        const fileNameHeader = headers[5];
        expect(fileNameHeader.innerHTML).toMatch("Doc File Name/Subject");

        const fileTypeHeader = headers[6];
        expect(fileTypeHeader.innerHTML).toMatch("Doc File Type");

        const scoreHeader = headers[7];
        expect(scoreHeader.innerHTML).toMatch("Similarity Score");

        const includedHeader = headers[8];
        expect(includedHeader.innerHTML).toMatch("Fed to AI");

        const citedHeader = headers[9];
        expect(citedHeader.innerHTML).toMatch("Cited by AI");
    });

    test("RPMXCON-85449 renders footer close button", () => {
        // Arrange
        const handleOnClose = jest.fn();
        const expectedText = "Close";

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />);
        const element = document.querySelector(".sage-flyout__footer button");

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
        expect(element.innerHTML).toMatch(expectedText);
    });

    test("RPMXCON-85452 does not render paginator", () => {
        // Arrange
        const handleOnClose = jest.fn();

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />);
        const element = document.querySelector(".p-paginator");

        // Assert
        expect(element).toBeNull();
    });
});

describe("RelatedDocumentsFlyout UX", () => {
    test("renders expected header tooltip", async () => {
        // Arrange
        const handleOnClose = jest.fn();
        const expectedText = "Help text placeholder";

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />);
        const element = document.querySelector(".sage-flyout__header .sage-icon-superscript");
        await userEvent.hover(element);
        const toolTip = document.querySelector('[role="tooltip"]');

        // Assert
        expect(toolTip).not.toBeNull();
        expect(toolTip).toBeDefined();
        expect(toolTip.innerHTML).toMatch(expectedText);
    });

    test("clicking 'Close' button triggers onClose event", async () => {
        // Arrange
        const handleOnClose = jest.fn();

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />);
        const element = document.querySelector(".footer__close-button");
        await userEvent.click(element);

        // Assert
        expect(handleOnClose).toHaveBeenCalled();
        expect(handleOnClose).toHaveBeenCalledTimes(1);
    });
});
