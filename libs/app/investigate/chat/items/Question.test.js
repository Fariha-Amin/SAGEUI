import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
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

    test("renders as a card", () => {
        // Arrange
        const model = getDefaultModel();

        // Act
        render(<Question model={model} />);
        const element = document.querySelector(".sage-chat-history__item-question.p-card");

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("renders '25 Relevant Docs' link when answer loads", () => {
        // Arrange
        const model = getDefaultModel();
        model.response.isInProgress = false;
        model.response.result.isSuccess = true;

        // Act
        render(<Question model={model} />);
        const element = screen.queryByText("25 Relevant Docs");

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("does not render '25 Relevant Docs' link before answer loads", () => {
        // Arrange
        const model = getDefaultModel();
        model.response.isInProgress = true;
        model.response.result.isSuccess = true;

        // Act
        render(<Question model={model} />);
        const element = screen.queryByText("25 Relevant Docs");

        // Assert
        expect(element).toBeNull();
    });

    test("does not render '25 Relevant Docs' link when answer fails to load", () => {
        // Arrange
        const model = getDefaultModel();
        model.response.isInProgress = false;
        model.response.result.isSuccess = false;

        // Act
        render(<Question model={model} />);
        const element = screen.queryByText("25 Relevant Docs");

        // Assert
        expect(element).toBeNull();
    });
});

describe("Question UX", () => {
    test("clicking '25 Relevant Docs' link triggers event", async () => {
        // Arrange
        const handleOnClick = jest.fn();
        const model = getDefaultModel();

        // Act
        render(<Question model={model} onRelevantDocsClicked={handleOnClick} />);
        const element = screen.queryByText("25 Relevant Docs");
        await userEvent.click(element);

        // Assert
        expect(handleOnClick).toHaveBeenCalled();
        expect(handleOnClick).toHaveBeenCalledTimes(1);
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