import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, waitFor, act } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event';
import ChatItem from './Item';
import sageClient from "_investigate/httpClient";

jest.mock("_investigate/httpClient");

describe("ChatItem UI", () => {
    test("RPMXCON-84290 renders timestamp correctly", async () => {
        // Arrange
        const year = 1234;
        const march = 2;
        const day = 2;
        const hour = 15;
        const meridiem = "PM";
        const minute = 45;
        const second = 56;
        const model = getDefaultModel();
        model.datetime = new Date(year, march, day, hour, minute, second);
        // Expectation -> 2 March 1234 - 03:45 PM
        const expectedFormat = `${day} March ${year} - 03:${minute} ${meridiem}`;

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        act(() => render(<ChatItem model={model} />));
        const element = await screen.findByText(expectedFormat);

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("renders as an accordian", async () => {
        // Arrange
        const model = getDefaultModel();

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        act(() => render(<ChatItem model={model} />));
        const element = await waitFor(() => { return document.querySelector(".sage-chat-history__item .p-accordion"); });

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("RPMXCON-84283-A renders question", async () => {
        // Arrange
        const question = "What is the answer?";
        const model = getDefaultModel();
        model.query.question = question;

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        act(() => render(<ChatItem model={model} />));
        const questionText = await screen.findByText(question);
        const questionElement = document.querySelector(".sage-chat-history__item-question");

        // Assert
        expect(questionText).not.toBeNull();
        expect(questionText).toBeDefined();
        expect(questionElement).not.toBeNull();
        expect(questionElement).toBeDefined();
    });

    test("RPMXCON-84283-B renders answer", async () => {
        // Arrange
        const answer = "42, according to Douglas Adams.";
        const model = getDefaultModel();
        model.response.answer = answer;

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        act(() => render(<ChatItem model={model} />));
        const answerText = await screen.findByText(answer);
        const answerElement = document.querySelector(".sage-chat-history__item-answer");

        // Assert
        expect(answerText).not.toBeNull();
        expect(answerText).toBeDefined();
        expect(answerElement).not.toBeNull();
        expect(answerElement).toBeDefined();
    });

    test("RPMXCON-84283-C renders both question and answer", async () => {
        // Arrange
        const question = "What is the answer?";
        const answer = "42, according to Douglas Adams.";
        const model = getDefaultModel();
        model.query.question = question;
        model.response.answer = answer;

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        act(() => render(<ChatItem model={model} />));
        const questionText = await screen.findByText(question);
        const questionElement = document.querySelector(".sage-chat-history__item-question");
        const answerText = await screen.findByText(answer);
        const answerElement = document.querySelector(".sage-chat-history__item-answer");

        // Assert
        expect(questionText).not.toBeNull();
        expect(questionText).toBeDefined();
        expect(questionElement).not.toBeNull();
        expect(questionElement).toBeDefined();
        expect(answerText).not.toBeNull();
        expect(answerText).toBeDefined();
        expect(answerElement).not.toBeNull();
        expect(answerElement).toBeDefined();
    });
});

describe("ChatItem UX", () => {
    describe("Relevant Docs", () => {
        test("RPMXCON-85447 '25 Relevant Docs' link is visible", async () => {
            // Arrange
            const model = getDefaultModel();

            const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
            sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

            // Act
            act(() => render(<ChatItem model={model} />));

            const link = await screen.findByText("25 Relevant Docs");

            // Assert
            expect(link).not.toBeNull();
            expect(link).toBeDefined();
        });

        test("RPMXCON-85448 clicking '25 Relevant Docs' link opens flyout", async () => {
            // Arrange
            const model = getDefaultModel();

            const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
            sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

            // Act
            act(() => render(<ChatItem model={model} />));

            const link = await screen.findByText("25 Relevant Docs");
            await userEvent.click(link);

            const flyout = document.querySelector(".sage-related-documents__flyout");

            // Assert
            expect(flyout).not.toBeNull();
            expect(flyout).toBeDefined();
        });

        test("RPMXCON-85451 clicking individual document link opens flyout", async () => {
            // Arrange
            const docId = "DOC0000001";
            const summaryText = "Test Summary Text";
            const model = getDefaultModel();
            model.response.answer = docId;
            model.response.documentIds = [docId];

            const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
            sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

            const mockGetSummaryAsync = () => { return Promise.resolve(summaryText); };
            sageClient.getSummaryAsync.mockImplementation(mockGetSummaryAsync);

            // Act
            act(() => render(<ChatItem model={model} />));

            const link = await screen.findByText(docId);
            await userEvent.click(link);

            const flyout = document.querySelector(".sage-related-documents__flyout");

            // Assert
            expect(flyout).not.toBeNull();
            expect(flyout).toBeDefined();
        });

        test("RPMXCON-85451 clicking individual document link selects specific table row", async () => {
            // Arrange
            const docId = "DOC0000002";
            const summaryText = "Test Summary Text";
            const model = getDefaultModel();
            model.response.answer = docId;
            model.response.documentIds = [docId];

            // 3 rows of data - 2nd row should be selected
            const tableData = [
                { documentId: "DOC0000001", filename: "", filetype: "", score: 0.0, included: false, cited: false },
                { documentId: docId, filename: "", filetype: "", score: 0.0, included: false, cited: false },
                { documentId: "DOC0000003", filename: "", filetype: "", score: 0.0, included: false, cited: false }
            ];
            const mockGetReferenceDocumentsAsync = () => { return Promise.resolve(tableData); };
            sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

            const mockGetSummaryAsync = () => { return Promise.resolve(summaryText); };
            sageClient.getSummaryAsync.mockImplementation(mockGetSummaryAsync);

            // Act
            act(() => render(<ChatItem model={model} />));

            const link = await screen.findByText(docId);
            await userEvent.click(link);

            const rows = document.querySelectorAll("tr");
            const row1 = rows[1];
            const row1column1 = row1.querySelector('.p-checkbox-box[aria-checked="true"]');
            const row2 = rows[2];
            const row2column1 = row2.querySelector('.p-checkbox-box[aria-checked="true"]');
            const row3 = rows[3];
            const row3column1 = row3.querySelector('.p-checkbox-box[aria-checked="true"]');

            // Assert
            expect(row1column1).toBeNull();
            expect(row2column1).not.toBeNull();
            expect(row3column1).toBeNull();
        });

        test("RPMXCON-85451 clicking individual document link expands specific table row", async () => {
            // Arrange
            const docId = "DOC0000002";
            const summaryText = "Test Summary Text";
            const model = getDefaultModel();
            model.response.answer = docId;
            model.response.documentIds = [docId];

            // 3 rows of data - 2nd row should be expanded
            const tableData = [
                { documentId: "DOC0000001", filename: "", filetype: "", score: 0.0, included: false, cited: false },
                { documentId: docId, filename: "", filetype: "", score: 0.0, included: false, cited: false },
                { documentId: "DOC0000003", filename: "", filetype: "", score: 0.0, included: false, cited: false }
            ];
            const mockGetReferenceDocumentsAsync = () => { return Promise.resolve(tableData); };
            sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

            const mockGetSummaryAsync = () => { return Promise.resolve(summaryText); };
            sageClient.getSummaryAsync.mockImplementation(mockGetSummaryAsync);

            // Act
            act(() => render(<ChatItem model={model} />));

            const link = await screen.findByText(docId);
            await userEvent.click(link);

            const expansion = await screen.findByText(summaryText);

            // Assert
            expect(expansion).not.toBeNull();
        });
    });

    describe("Delete", () => {
        test("clicking shows confirmation dialog", async () => {
            // Arrange
            const model = getDefaultModel();

            // Act
            render(<ChatItem model={model} />);
            const hiddenDialog = document.querySelector(".sage-dialog");
            const button = document.querySelector(".item-actions_delete");
            await userEvent.click(button);
            const visibleDialog = document.querySelector(".sage-dialog");

            // Assert
            expect(hiddenDialog).toBeNull();
            expect(visibleDialog).not.toBeNull();
            expect(visibleDialog).toBeDefined();
        });

        test("cancelling does not delete item", async () => {
            // Arrange
            const model = getDefaultModel();

            const mockUpdateInvestigationAsync = jest.fn();
            sageClient.updateInvestigation.mockImplementation(mockUpdateInvestigationAsync);

            // Act
            render(<ChatItem model={model} />);
            const deleteButton = document.querySelector(".item-actions_delete");
            await userEvent.click(deleteButton);
            const cancelButton = document.querySelector('button[aria-label="Cancel"]');
            await userEvent.click(cancelButton);

            // Assert
            expect(mockUpdateInvestigationAsync).not.toHaveBeenCalled();
        });

        test("confirming does delete item", async () => {
            // Arrange
            const model = getDefaultModel();

            const mockUpdateInvestigationAsync = jest.fn();
            sageClient.updateInvestigation.mockImplementation(mockUpdateInvestigationAsync);

            // Act
            render(<ChatItem model={model} />);
            const deleteButton = document.querySelector(".item-actions_delete");
            await userEvent.click(deleteButton);
            const okButton = document.querySelector('button[aria-label="Ok"]');
            await userEvent.click(okButton);

            // Assert
            expect(mockUpdateInvestigationAsync).toHaveBeenCalled();
            expect(mockUpdateInvestigationAsync).toHaveBeenCalledTimes(1);
        });

        test("deleting shows progress indicator", async () => {
            // Arrange
            const model = getDefaultModel();

            const mockUpdateInvestigationAsync = jest.fn();
            sageClient.updateInvestigation.mockImplementation(mockUpdateInvestigationAsync);

            // Act
            render(<ChatItem model={model} />);
            const deleteButton = document.querySelector(".item-actions_delete");
            await userEvent.click(deleteButton);
            const okButton = document.querySelector('button[aria-label="Ok"]');
            await userEvent.click(okButton);
            const progress = document.querySelector('button[aria-label="Ok"].p-button-loading');

            // Assert
            expect(progress).not.toBeNull();
            expect(progress).toBeDefined();
        });
    });

    describe("Favorite", () => {
        test("clicking does favorite the item", async () => {
            // Arrange
            const model = getDefaultModel();

            const mockUpdateInvestigationAsync = jest.fn();
            sageClient.updateInvestigation.mockImplementation(mockUpdateInvestigationAsync);

            // Act
            render(<ChatItem model={model} />);
            const favoriteButton = document.querySelector(".item-actions_favorite");
            await userEvent.click(favoriteButton);

            // Assert
            expect(mockUpdateInvestigationAsync).toHaveBeenCalled();
            expect(mockUpdateInvestigationAsync).toHaveBeenCalledTimes(1);
        });
    });

    describe("Feedback", () => {
        test("RPMXCON-85412 - Clicking Save closes Modal and updates item", async () => {
            const model = getDefaultModel();
            const feedback = "";
            const newFeedback = "This is an example feedback.";
            model.response.feedback = feedback;
            const user = userEvent.setup({ delay: null });

            const mockUpdateInvestigationAsync = jest.fn();
            sageClient.updateInvestigation.mockImplementation(mockUpdateInvestigationAsync);

            // Act
            render(<ChatItem model={model} />);

            const feedbackButton = await waitFor(() => document.querySelector(".item-actions_feedback"));
            await userEvent.click(feedbackButton);
            const textarea = await waitFor(() => document.querySelector(".feedback-modal__text-area"));
            await user.type(textarea, newFeedback);
            const cancelButton = await waitFor(() => document.querySelector(".feedback-modal__save"));
            await userEvent.click(cancelButton);
            //Get feedback button state after cancel
            const feedbackButtonAfter = await waitFor(() => document.querySelector(".item-actions_feedback"));


            // Assert
            expect(model.response.feedback).toEqual(newFeedback);
            expect(feedbackButton.outerHTML).toContain("item-actions_feedback_active");
        });

        test("RPMXCON-85411 - Clicking Cancel closes Modal without changes", async () => {
            // Arrange
            const model = getDefaultModel();
            const feedback = "";
            const newFeedback = "This is an example feedback.";
            model.response.feedback = feedback;
            const user = userEvent.setup({ delay: null });

            const mockUpdateInvestigationAsync = jest.fn();
            sageClient.updateInvestigation.mockImplementation(mockUpdateInvestigationAsync);

            // Act
            render(<ChatItem model={model} />);

            const feedbackButton = await waitFor(() => document.querySelector(".item-actions_feedback"));
            await userEvent.click(feedbackButton);
            const textarea = await waitFor(() => document.querySelector(".feedback-modal__text-area"));
            await user.type(textarea, newFeedback);
            const cancelButton = await waitFor(() => document.querySelector(".feedback-modal__cancel"));
            await userEvent.click(cancelButton);
            //Get feedback button state after cancel
            const feedbackButtonAfter = await waitFor(() => document.querySelector(".item-actions_feedback"));


            // Assert
            expect(model.response.feedback).toEqual(feedback);
            expect(feedbackButton.outerHTML).toEqual(feedbackButtonAfter.outerHTML);
        });
    });
});

function getDefaultModel() {
    return {
        id: 0,
        datetime: new Date(),
        hasFeedback: false,
        query: {
            id: 0,
            datetime: new Date(),
            question: "",
            prompt: {
                id: 0,
                value: "",
                type: "",
            }
        },
        response: {
            id: 0,
            datetime: new Date(),
            answer: "",
            feedback: "",
            isInProgress: false,
            documentIds: [],
            personNames: [],
            result: {
                isSuccess: true,
                failureReason: "",
            },
        }
    };
}