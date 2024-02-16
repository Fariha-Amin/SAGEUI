import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import Answer from './Answer';

describe("Answer UI", () => {
    test("renders original response", () => {
        // Arrange
        const response = "Yes, Who is on first.";
        const model = getDefaultModel();
        model.response.answer = response;
        model.response.isInProgress = false;
        model.response.result.isSuccess = true;

        // Act
        render(<Answer model={model} />);
        const element = screen.queryByText(response);

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("RPMXCON-84291 renders correct 'I don't know' response", () => {
        // Arrange
        const response = "I do not have enough information in the provided sources to answer your question";
        const model = getDefaultModel();
        model.response.answer = "";
        model.response.isInProgress = false;
        model.response.result.isSuccess = false;
        model.response.result.failureReason = response;

        // Act
        render(<Answer model={model} />);
        const element = screen.queryByText(response);

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("renders response number", () => {
        // Arrange
        const responseId = 456;
        const model = getDefaultModel();
        model.id = responseId;

        // Act
        render(<Answer model={model} />);
        const element = screen.queryByText(`A${responseId}`);

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("renders as a card", async () => {
        // Arrange
        const model = getDefaultModel();

        // Act
        render(<Answer model={model} />);
        const element = await document.querySelector(".sage-chat-history__item-answer.card");

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
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