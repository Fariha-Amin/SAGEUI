import React from 'react';
import '@testing-library/jest-dom'
import { screen, render, waitFor, act } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import RelatedDocumentsFlyout from './RelatedDocumentsFlyout';
import sageClient from "_investigate/httpClient";

jest.mock("_investigate/httpClient");

describe("RelatedDocumentsFlyout UI", () => {
    test("RPMXCON-85449 renders expected header text", async () => {
        // Arrange
        const handleOnClose = jest.fn();
        const expectedText = "Relevant Documents";

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        await act(() => render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />));
        const element = document.querySelector(".sage-flyout__header h3");

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
        expect(element.innerHTML).toMatch(expectedText);
    });

    test("RPMXCON-85449 renders expected header tooltip icon", async () => {
        // Arrange
        const handleOnClose = jest.fn();
        const expectedIcon = "circle-question";

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        await act(() => render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />));
        const element = document.querySelector(`.sage-flyout__header [data-icon="${expectedIcon}"]`);

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("RPMXCON-85449 renders table", async () => {
        // Arrange
        const handleOnClose = jest.fn();

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        await act(() => render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />));
        const element = document.querySelector(".sage-flyout__body table");

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("RPMXCON-85450 renders expected table headers", async () => {
        // Arrange
        const handleOnClose = jest.fn();

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        await act(() => render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />));

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

    test("RPMXCON-85449 renders footer close button", async () => {
        // Arrange
        const handleOnClose = jest.fn();
        const expectedText = "Close";

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        await act(() => render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />));
        const element = document.querySelector(".sage-flyout__footer button");

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
        expect(element.innerHTML).toMatch(expectedText);
    });

    test("RPMXCON-85452 does not render paginator", async () => {
        // Arrange
        const handleOnClose = jest.fn();

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        await act(() => render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />));
        const element = document.querySelector(".p-paginator");

        // Assert
        expect(element).toBeNull();
    });

    test("RPMXCON-85840 renders 'expand all' button", async () => {
        // Arrange
        const handleOnClose = jest.fn();
        const buttonText = "View All Summaries";

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        await act(() => render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />));
        const button = await screen.findByText(buttonText);

        // Assert
        expect(button).not.toBeNull();
        expect(button).toBeDefined();
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
        await act(() => render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />));
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
        await act(() => render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />));
        const element = document.querySelector(".footer__close-button");
        await userEvent.click(element);

        // Assert
        expect(handleOnClose).toHaveBeenCalled();
        expect(handleOnClose).toHaveBeenCalledTimes(1);
    });

    test("clicking 'expand all' button expands all rows", async () => {
        // Arrange
        const handleOnClose = jest.fn();
        const buttonText = "View All Summaries";
        const summaryText = "Test Summary Text";
        const mockReferenceDocs = [
            {
                documentId: "1"
            },
            {
                documentId: "2"
            },
            {
                documentId: "3"
            }
        ];

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve(mockReferenceDocs); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        const mockGetSummaryAsync = () => { return Promise.resolve(summaryText); };
        sageClient.getSummaryAsync.mockImplementation(mockGetSummaryAsync);

        // Act
        await act(() => render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />));
        const button = await screen.findByText(buttonText);
        await userEvent.click(button);

        const summaries = await screen.findAllByText(summaryText);

        // Assert
        expect(summaries).toHaveLength(3);
    });

    test("RPMXCON-85841 clicking 'expand all' button changes button text", async () => {
        // Arrange
        const handleOnClose = jest.fn();
        const expandButtonText = "View All Summaries";
        const collapseButtonText = "Collapse All Summaries";

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        const mockGetSummaryAsync = () => { return Promise.resolve(""); };
        sageClient.getSummaryAsync.mockImplementation(mockGetSummaryAsync);

        // Act
        await act(() => render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />));
        const beforeClickButton = await screen.findByText(expandButtonText);
        await userEvent.click(beforeClickButton);

        const afterClickButton = await screen.findAllByText(collapseButtonText);

        // Assert
        expect(afterClickButton).not.toBeNull();
        expect(afterClickButton).toBeDefined();
    });

    test("clicking 'collapse all' button collapses all rows", async () => {
        // Arrange
        const handleOnClose = jest.fn();
        const expandButtonText = "View All Summaries";
        const collapseButtonText = "Collapse All Summaries";
        const summaryText = "Test Summary Text";
        const mockReferenceDocs = [
            {
                documentId: "1"
            },
            {
                documentId: "2"
            },
            {
                documentId: "3"
            }
        ];

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve(mockReferenceDocs); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        const mockGetSummaryAsync = () => { return Promise.resolve(summaryText); };
        sageClient.getSummaryAsync.mockImplementation(mockGetSummaryAsync);

        // Act
        await act(() => render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />));

        const expandButton = await screen.findByText(expandButtonText);
        await userEvent.click(expandButton);
        const expandSummaries = await screen.findAllByText(summaryText);

        const collapseButton = await screen.findByText(collapseButtonText);
        await userEvent.click(collapseButton);
        const collapseSummaries = await waitFor(() => screen.queryByText(summaryText));

        // Assert
        expect(expandSummaries).toHaveLength(3);
        expect(collapseSummaries).toBeNull();
    });

    test("RPMXCON-85844 clicking 'expand all' button shows loading indicator", async () => {
        // Arrange
        const handleOnClose = jest.fn();
        const buttonText = "View All Summaries";
        const mockReferenceDocs = [
            {
                documentId: "1"
            },
            {
                documentId: "2"
            },
            {
                documentId: "3"
            }
        ];

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve(mockReferenceDocs); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        const mockGetSummaryAsync = async () => {
            // Set a timeout so we can see the loading indicator(s)
            await new Promise(function (resolve, reject) {
                setTimeout(() => { resolve("summary"); }, 3000);
            });
        };
        sageClient.getSummaryAsync.mockImplementation(mockGetSummaryAsync);

        // Act
        await act(() => render(<RelatedDocumentsFlyout visible={true} onClose={handleOnClose} investigationId={1} />));

        const button = await screen.findByText(buttonText);
        await userEvent.click(button);

        // Assert
        const loadingIndicators = document.querySelectorAll(".p-skeleton")
        expect(loadingIndicators).not.toBeNull();
        expect(loadingIndicators.length).toBeGreaterThan(1);
    });
});
