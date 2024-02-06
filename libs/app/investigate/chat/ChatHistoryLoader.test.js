import React from 'react';
import '@testing-library/jest-dom'
import { render } from "@testing-library/react";
import ChatHistoryLoader from './ChatHistoryLoader';

describe("ChatHistoryLoader renders", () => {
    test("text that says 'Loading...'", () => {
        // Arrange
        const loadingText = "Loading...";

        // Act
        const dom = render(<ChatHistoryLoader />);
        const element = dom.container.querySelector("h2");

        // Assert
        expect(element).toBeDefined();
        expect(element.textContent).toMatch(loadingText);
    });

    test("a circular spinner", () => {
        // Arrange
        // n/a

        // Act
        const dom = render(<ChatHistoryLoader />);
        const element = dom.container.querySelector("div[className='spinner-border']");

        // Assert
        expect(element).toBeDefined();
    });

    test("with css class 'sage-chat-history__loader'", () => {
        // Arrange
        // n/a

        // Act
        const dom = render(<ChatHistoryLoader />);
        const element = dom.container.querySelector(".sage-chat-history__loader");

        // Assert
        expect(element).toBeDefined();
    });
});