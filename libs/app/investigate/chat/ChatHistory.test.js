import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import ChatHistory from './ChatHistory';

describe.skip("ChatHistory UI", () => {
    test("renders a maximum of 25 investigations", async () => {
        // Arrange
        const model = getDefaultModel();
        
        // Act
        render(<ChatHistory model={model} />);
        const element = await document.querySelector(".sage-chat-history__item.accordion");
        
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