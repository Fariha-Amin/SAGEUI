import React from 'react';
import '@testing-library/jest-dom'
import { render } from "@testing-library/react";
import ChatHistoryPlaceholder from './ChatHistoryPlaceholder';

describe("ChatHistoryPlaceholder renders", () => {
    test("as a card", () => {
        // Arrange
        // n/a

        // Act
        render(<ChatHistoryPlaceholder docCount={100}/>);
        const element = document.querySelector(".p-card");

        // Assert
        expect(element).toBeDefined();
    });

    test("RPMXCON-84256-A as a card with specific header text", () => {
        // Arrange
        const headerText = "Your results will appear in this space.";

        // Act
        render(<ChatHistoryPlaceholder docCount={100} />);
        const element = document.querySelector(".p-card .p-card-body .p-card-title");

        // Assert
        expect(element).toBeDefined();
        expect(element.textContent).toMatch(headerText);
    });

    test("RPMXCON-84256-B as a card with specific body text", () => {
        // Arrange
        const bodyText = "You can then investigate into the questions and answers generated from documents in population.";

        // Act
        render(<ChatHistoryPlaceholder docCount={100} />);
        const element = document.querySelector(".p-card .p-card-body .p-card-content");

        // Assert
        expect(element).toBeDefined();
        expect(element.textContent).toMatch(bodyText);
    });

    test("RPMXCON-84257-A when zero docs as a card with specific header text", () => {
        // Arrange
        const headerText = "There are currently no documents in your Investigate Population.";

        // Act
        render(<ChatHistoryPlaceholder docCount={0} />);
        const element = document.querySelector(".p-card .p-card-body .p-card-title");

        // Assert
        expect(element).toBeDefined();
        expect(element.textContent).toMatch(headerText);
    });

    test("RPMXCON-84257-B when zero docs as a card with specific body text", () => {
        // Arrange
        const bodyText = `Please add documents using the "Manage Population" button above. Once added, you can ask questions about the documents in your Investigate Population and take action on the responses provided by the Generative AI model.`;

        // Act
        render(<ChatHistoryPlaceholder docCount={0} />);
        const element = document.querySelector(".p-card .p-card-body .p-card-content");

        // Assert
        expect(element).toBeDefined();
        expect(element.textContent).toMatch(bodyText);
    });

    test("with css class 'sage-chat-history__placeholder'", () => {
        // Arrange
        // n/a

        // Act
        render(<ChatHistoryPlaceholder docCount={100} />);
        const element = document.querySelector(".sage-chat-history__placeholder");

        // Assert
        expect(element).toBeDefined();
    });
});