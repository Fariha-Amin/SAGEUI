import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ChatHistoryItem from './ChatHistoryItem';

describe("ChatHistoryItem UI", () => {
    describe("Question UI", () => {
        test("renders original query", () => {
            // Arrange
            const question = "Who's on first?";
            const model = getDefaultModel();
            model.query.question = question;

            // Act
            render(<ChatHistoryItem model={model} />);
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
            render(<ChatHistoryItem model={model} />);
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
            render(<ChatHistoryItem model={model} />);
            const element = screen.queryByText(`${promptType} Prompt`);
            
            // Assert
            expect(element).not.toBeNull();
            expect(element).toBeDefined();
        });

        test("renders as a card", async () => {
            // Arrange
            const model = getDefaultModel();
            
            // Act
            render(<ChatHistoryItem model={model} />);
            const element = await document.querySelector(".sage-chat-history__item-question.card");
            
            // Assert
            expect(element).not.toBeNull();
            expect(element).toBeDefined();
        });
    });

    describe("Answer UI", () => {
        test("renders original response", () => {
            // Arrange
            const response = "Yes, Who is on first.";
            const model = getDefaultModel();
            model.response.answer = response;
            model.response.isInProgress = false;
            model.response.result.isSuccess = true;

            // Act
            render(<ChatHistoryItem model={model} />);
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
            render(<ChatHistoryItem model={model} />);
            const element = screen.queryByText(`A${responseId}`);
            
            // Assert
            expect(element).not.toBeNull();
            expect(element).toBeDefined();
        });

        test("renders as a card", async () => {
            // Arrange
            const model = getDefaultModel();
            
            // Act
            render(<ChatHistoryItem model={model} />);
            const element = await document.querySelector(".sage-chat-history__item-answer.card");
            
            // Assert
            expect(element).not.toBeNull();
            expect(element).toBeDefined();
        });
    });

    test("renders timestamp correctly", async () => {
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

        // Act
        render(<ChatHistoryItem model={model} />);
        const element = await screen.findByText(expectedFormat);
        
        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("renders as an accordian", async () => {
        // Arrange
        const model = getDefaultModel();
        
        // Act
        render(<ChatHistoryItem model={model} />);
        const element = await document.querySelector(".sage-chat-history__item.accordion");
        
        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });
});

describe("ChatHistoryItem UX", () => {
    test("fires events or whatever", async () => {
        // Arrange
        // Act
        // Assert
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