import React from 'react';
import '@testing-library/jest-dom'
import { render, waitFor } from "@testing-library/react";
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

        // Act
        const {rerender} = render(<ChatHistory
            queryId={0}
            onHistoryLoading={onHistoryLoading}
            onHistoryLoaded={onHistoryLoaded}
            onInvestigationLoading={onInvestigationLoading}
            onInvestigationLoaded={onInvestigationLoaded}
            onAnswerLoading={onAnswerLoading}
            onAnswerLoaded={onAnswerLoaded}
        />);

        // Wait for the initial load to complete
        await waitFor(() => expect(sageClient.getInvestigationsAsync).toHaveBeenCalled());

        // Re-render with a new query ID (this adds a 26th question to the component)
        rerender(<ChatHistory
            queryId={26}
            onHistoryLoading={onHistoryLoading}
            onHistoryLoaded={onHistoryLoaded}
            onInvestigationLoading={onInvestigationLoading}
            onInvestigationLoaded={onInvestigationLoaded}
            onAnswerLoading={onAnswerLoading}
            onAnswerLoaded={onAnswerLoaded}
        />);

        // Wait for the new question to finish loading
        await waitFor(() => expect(sageClient.getInvestigationByQuestionAsync).toHaveBeenCalled());
        await waitFor(() => expect(sageClient.getAnswerByQuestionAsync).toHaveBeenCalled());

        const elements = document.querySelectorAll(".sage-chat-history__item");

        // Assert
        expect(elements).not.toBeNull();
        expect(elements).toBeDefined();
        expect(elements).toHaveLength(25);
    });
});

function getDefaultModel() {
    return {
        id: 0,
        datetime: new Date(),
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
            isInProgress: false,
            documentIds: [],
            result: {
                isSuccess: true,
                failureReason: "",
            },
        }
    };
}