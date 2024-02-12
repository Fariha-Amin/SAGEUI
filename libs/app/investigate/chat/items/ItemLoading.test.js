import React from 'react';
import '@testing-library/jest-dom'
import { render } from "@testing-library/react";
import ChatItemLoading from './ItemLoading';

describe("ChatHistoryItemLoader renders", () => {
    test("text that says 'Loading...'", () => {
        // Arrange
        const loadingText = "Loading...";

        // Act
        render(<ChatItemLoading />);
        const element = document.querySelector("h2");

        // Assert
        expect(element).toBeDefined();
        expect(element.textContent).toMatch(loadingText);
    });

    test("a circular spinner", () => {
        // Arrange
        // n/a

        // Act
        render(<ChatItemLoading />);
        const element = document.querySelector("div[className='spinner-border']");

        // Assert
        expect(element).toBeDefined();
    });

    test("with css class 'sage-chat-history__item'", () => {
        // Arrange
        // n/a

        // Act
        render(<ChatItemLoading />);
        const element = document.querySelector(".sage-chat-history__item");

        // Assert
        expect(element).toBeDefined();
    });

    test("with css class 'sage-chat-history__item-header'", () => {
        // Arrange
        // n/a

        // Act
        render(<ChatItemLoading />);
        const element = document.querySelector(".sage-chat-history__item-header");

        // Assert
        expect(element).toBeDefined();
    });

    test("with css class 'sage-chat-history__item-body'", () => {
        // Arrange
        // n/a

        // Act
        render(<ChatItemLoading />);
        const element = document.querySelector(".sage-chat-history__item-body");

        // Assert
        expect(element).toBeDefined();
    });

    test("with css class 'sage-chat-history__item-loader'", () => {
        // Arrange
        // n/a

        // Act
        render(<ChatItemLoading />);
        const element = document.querySelector(".sage-chat-history__item-loader");

        // Assert
        expect(element).toBeDefined();
    });
});