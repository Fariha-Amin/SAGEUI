import React from 'react';
import '@testing-library/jest-dom'
import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import RelatedDocumentsFlyout from './RelatedDocumentsFlyout';
import sageClient from "_investigate/httpClient";

jest.mock("_investigate/httpClient");

describe("RelatedDocumentsFlyout UI", () => {
    test("renders expected header text", () => {
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

    test("renders expected header tooltip icon", () => {
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

    test("renders table", () => {
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

    test("renders footer close button", () => {
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
