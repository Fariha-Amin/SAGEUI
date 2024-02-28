import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import Question from './Question';

describe("Question UI", () => {
    test("renders original query", () => {
        // Arrange
        const question = "Who's on first?";
        const model = getDefaultModel();
        model.query.question = question;

        // Act
        render(<Question model={model} />);
        const element = screen.queryByText(question);

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("renders query number", () => {
        // Arrange
        const questionId = 123;
        const model = getDefaultModel();
        model.id = questionId;

        // Act
        render(<Question model={model} />);
        const element = screen.queryByText(`Q${questionId}`);

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("renders prompt type", () => {
        // Arrange
        const promptType = "Tardy";
        const model = getDefaultModel();
        model.query.prompt.type = promptType;

        // Act
        render(<Question model={model} />);
        const element = screen.queryByText(`${promptType} Prompt`);

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("renders as a card", async () => {
        // Arrange
        const model = getDefaultModel();

        // Act
        render(<Question model={model} />);
        const element = await document.querySelector(".sage-chat-history__item-question.p-card");

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