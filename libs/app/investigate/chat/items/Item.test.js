import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import ChatItem from './Item';

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

        // Act
        render(<ChatItem model={model} />);
        const element = await screen.findByText(expectedFormat);
        
        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("renders as an accordian", async () => {
        // Arrange
        const model = getDefaultModel();
        
        // Act
        render(<ChatItem model={model} />);
        const element = await document.querySelector(".sage-chat-history__item.accordion");
        
        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("RPMXCON-84283-A renders question", async () => {
        // Arrange
        const question = "What is the answer?";
        const model = getDefaultModel();
        model.query.question = question;
        
        // Act
        render(<ChatItem model={model} />);
        const questionText = await screen.findByText(question);
        const questionElement = await document.querySelector(".sage-chat-history__item-question");
        
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
        
        // Act
        render(<ChatItem model={model} />);
        const answerText = await screen.findByText(answer);
        const answerElement = await document.querySelector(".sage-chat-history__item-answer");
        
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
        
        // Act
        render(<ChatItem model={model} />);
        const questionText = await screen.findByText(question);
        const questionElement = await document.querySelector(".sage-chat-history__item-question");
        const answerText = await screen.findByText(answer);
        const answerElement = await document.querySelector(".sage-chat-history__item-answer");
        
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
            personNames: [],
            result: {
                isSuccess: true,
                failureReason: "",
            },
        }
    };
}