import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, waitFor, act } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ChatHistory from './ChatHistory';
import sageClient from "_investigate/httpClient";

jest.mock("_investigate/httpClient");

describe("ChatHistory UI", () => {
    test("RPMXCON-84289-A renders a maximum of 25 investigations on load", async () => {
        // Arrange
        const queryId = 0;
        const onHistoryLoading = jest.fn();
        const onHistoryLoaded = jest.fn();
        const onInvestigationLoading = jest.fn();
        const onInvestigationLoaded = jest.fn();
        const onAnswerLoading = jest.fn();
        const onAnswerLoaded = jest.fn();

        // Load 30 items to prove that only 25 are shown initially
        const mockGetInvestigationsAsync = () => {
            return new Promise(function (resolve, reject) {
                let data = [];
                for (let i = 0; i < 30; i++) {
                    const model = getDefaultModel();
                    model.id = i;
                    data.push(model);
                }
                resolve(data);
            });
        };
        sageClient.getInvestigationsAsync.mockImplementation(mockGetInvestigationsAsync);

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        act(() => render(<ChatHistory
            queryId={queryId}
            onHistoryLoading={onHistoryLoading}
            onHistoryLoaded={onHistoryLoaded}
            onInvestigationLoading={onInvestigationLoading}
            onInvestigationLoaded={onInvestigationLoaded}
            onAnswerLoading={onAnswerLoading}
            onAnswerLoaded={onAnswerLoaded}
        />));
        await waitFor(() => expect(sageClient.getInvestigationsAsync).toHaveBeenCalled());
        const elements = document.querySelectorAll(".sage-chat-history__item");

        // Assert
        expect(elements).not.toBeNull();
        expect(elements).toBeDefined();
        expect(elements).toHaveLength(25);
    });

    test("RPMXCON-84289-B renders a maximum of 25 investigations on add", async () => {
        // Arrange
        window.HTMLElement.prototype.scrollIntoView = jest.fn();
        const onHistoryLoading = jest.fn();
        const onHistoryLoaded = jest.fn();
        const onInvestigationLoading = jest.fn();
        const onInvestigationLoaded = jest.fn();
        const onAnswerLoading = jest.fn();
        const onAnswerLoaded = jest.fn();

        const mockGetInvestigationsAsync = () => {
            return new Promise(function (resolve, reject) {
                let data = [];
                for (let i = 0; i < 25; i++) {
                    const model = getDefaultModel();
                    model.id = i;
                    data.push(model);
                }
                resolve(data);
            });
        };
        sageClient.getInvestigationsAsync.mockImplementation(mockGetInvestigationsAsync);

        const mockGetInvestigationByQuestionAsync = () => {
            return new Promise(function (resolve, reject) {
                const model = getDefaultModel();
                resolve(model);
            });
        };
        sageClient.getInvestigationByQuestionAsync.mockImplementation(mockGetInvestigationByQuestionAsync);

        const mockGetAnswerByQuestionAsync = () => {
            return new Promise(function (resolve, reject) {
                const model = getDefaultModel();
                resolve(model.response);
            });
        };
        sageClient.getAnswerByQuestionAsync.mockImplementation(mockGetAnswerByQuestionAsync);

        const mockGetReferenceDocumentsAsync = () => { return Promise.resolve([]); };
        sageClient.getReferenceDocumentsAsync.mockImplementation(mockGetReferenceDocumentsAsync);

        // Act
        const renderResult = await act(() => {
            return render(<ChatHistory
                queryId={0}
                onHistoryLoading={onHistoryLoading}
                onHistoryLoaded={onHistoryLoaded}
                onInvestigationLoading={onInvestigationLoading}
                onInvestigationLoaded={onInvestigationLoaded}
                onAnswerLoading={onAnswerLoading}
                onAnswerLoaded={onAnswerLoaded}
            />);
        });

        // Wait for the initial load to complete
        await waitFor(() => expect(sageClient.getInvestigationsAsync).toHaveBeenCalled());

        act(() => {
            // Re-render with a new query ID (this adds a 26th question to the component)
            renderResult.rerender(<ChatHistory
                queryId={26}
                onHistoryLoading={onHistoryLoading}
                onHistoryLoaded={onHistoryLoaded}
                onInvestigationLoading={onInvestigationLoading}
                onInvestigationLoaded={onInvestigationLoaded}
                onAnswerLoading={onAnswerLoading}
                onAnswerLoaded={onAnswerLoaded}
            />);
        });

        // Wait for the new question to finish loading
        await waitFor(() => expect(sageClient.getInvestigationByQuestionAsync).toHaveBeenCalled());
        await waitFor(() => expect(sageClient.getAnswerByQuestionAsync).toHaveBeenCalled());

        const elements = document.querySelectorAll(".sage-chat-history__item");

        // Assert
        expect(elements).not.toBeNull();
        expect(elements).toBeDefined();
        expect(elements).toHaveLength(25);
    }, 10000);
});

describe("ChatHistory UX", () => {
    describe("Delete Item", () => {
        test("shows toast notification", async () => {
            // Arrange
            const queryId = 0;
            const onHistoryLoading = jest.fn();
            const onHistoryLoaded = jest.fn();
            const onInvestigationLoading = jest.fn();
            const onInvestigationLoaded = jest.fn();
            const onAnswerLoading = jest.fn();
            const onAnswerLoaded = jest.fn();
            const toastText = "Your question has been successfully deleted from the page.";
    
            // Load 1 item
            const mockGetInvestigationsAsync = () => {
                return new Promise(function (resolve, reject) {
                    let data = [ getDefaultModel() ];
                    resolve(data);
                });
            };
            sageClient.getInvestigationsAsync.mockImplementation(mockGetInvestigationsAsync);
    
            // Act
            render(<ChatHistory
                queryId={queryId}
                onHistoryLoading={onHistoryLoading}
                onHistoryLoaded={onHistoryLoaded}
                onInvestigationLoading={onInvestigationLoading}
                onInvestigationLoaded={onInvestigationLoaded}
                onAnswerLoading={onAnswerLoading}
                onAnswerLoaded={onAnswerLoaded}
            />);
            await waitFor(() => expect(sageClient.getInvestigationsAsync).toHaveBeenCalled());
            const deleteButton = document.querySelector(".item-actions_delete");
            await userEvent.click(deleteButton);
            const okButton = document.querySelector('button[aria-label="Ok"]');
            await userEvent.click(okButton);
            const element = await screen.findByText(toastText);
    
            // Assert
            expect(element).not.toBeNull();
            expect(element).toBeDefined();
        });
    });
});

function getDefaultModel() {
    return {
        id: 0,
        datetime: new Date(),
        hasFeedback: false,
        isDeleted: false,
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