import React from 'react';
import '@testing-library/jest-dom'
import { render } from "@testing-library/react";
import ChatHistoryPlaceholder from './ChatHistoryPlaceholder';

describe("ChatHistoryPlaceholder renders", () => {
    test("as a card", () => {
        // Arrange
        // n/a

        // Act
        render(<ChatHistoryPlaceholder />);
        const element = document.querySelector(".card");

        // Assert
        expect(element).toBeDefined();
    });

    test("as a card with specific header text", () => {
        // Arrange
        const headerText = "Your results will appear in this space.";

        // Act
        render(<ChatHistoryPlaceholder />);
        const element = document.querySelector(".card .card-body .card-title");

        // Assert
        expect(element).toBeDefined();
        expect(element.textContent).toMatch(headerText);
    });

    test("as a card with specific body text", () => {
        // Arrange
        const bodyText = "You can then investigate into the questions and answers generated from documents in population.";

        // Act
        render(<ChatHistoryPlaceholder />);
        const element = document.querySelector(".card .card-body .card-text");

        // Assert
        expect(element).toBeDefined();
        expect(element.textContent).toMatch(bodyText);
    });

    test("with css class 'sage-chat-history__placeholder'", () => {
        // Arrange
        // n/a

        // Act
        render(<ChatHistoryPlaceholder />);
        const element = document.querySelector(".sage-chat-history__placeholder");

        // Assert
        expect(element).toBeDefined();
    });
});