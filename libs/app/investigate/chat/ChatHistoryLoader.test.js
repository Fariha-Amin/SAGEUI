import React from 'react';
import '@testing-library/jest-dom'
import { render } from "@testing-library/react";
import ChatHistoryLoader from './ChatHistoryLoader';

describe("ChatHistoryLoader renders", () => {
    test("text that says 'Loading...'", () => {
        // Arrange
        const loadingText = "Loading...";

        // Act
        render(<ChatHistoryLoader />);
        const element = document.querySelector("h2");

        // Assert
        expect(element).toBeDefined();
        expect(element.textContent).toMatch(loadingText);
    });

    test("a circular spinner", () => {
        // Arrange
        // n/a

        // Act
        render(<ChatHistoryLoader />);
        const element = document.querySelector("div[className='spinner-border']");

        // Assert
        expect(element).toBeDefined();
    });

    test("with css class 'sage-chat-history__loader'", () => {
        // Arrange
        // n/a

        // Act
        render(<ChatHistoryLoader />);
        const element = document.querySelector(".sage-chat-history__loader");

        // Assert
        expect(element).toBeDefined();
    });
});