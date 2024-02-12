import React from 'react';
import '@testing-library/jest-dom'
import { render, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ChatPrompt from './ChatPrompt';
import sageClient from "../httpClient";

jest.mock("../httpClient");

describe("ChatPrompt default state", () => {
    test("renders empty textarea", () => {
        // Arrange
        const handleOnQuery = jest.fn();

        // Act
        render(<ChatPrompt loading={false} onQuery={handleOnQuery} />);
        const textarea = getTextAreaElement();

        // Assert
        expect(textarea).toHaveValue("");
    });

    test("renders textarea with correct placeholder text", () => {
        // Arrange
        const handleOnQuery = jest.fn();
        const placeholderText = `Ask your question here, such as "How did Enron manipulate its financial statements, and what were the consequences?"`;

        // Act
        render(<ChatPrompt loading={false} onQuery={handleOnQuery} />);
        const textarea = getTextAreaElement();

        // Assert
        expect(textarea).toHaveProperty("placeholder", placeholderText);
    });

    test("renders correct text count", () => {
        // Arrange
        const handleOnQuery = jest.fn();
        const countValue = "0 / 2000";

        // Act
        render(<ChatPrompt loading={false} onQuery={handleOnQuery} />);
        const textCounter = getTextCountElement();

        // Assert
        expect(textCounter.textContent).toMatch(countValue);
    });

    test("renders disabled button", () => {
        // Arrange
        const handleOnQuery = jest.fn();

        // Act
        render(<ChatPrompt loading={false} onQuery={handleOnQuery} />);
        const button = getButtonElement();

        // Assert
        expect(button).toBeDisabled();
    });

    test("renders button with correct text", () => {
        // Arrange
        const handleOnQuery = jest.fn();
        const buttonText = "Run";

        // Act
        render(<ChatPrompt loading={false} onQuery={handleOnQuery} />);
        const button = getButtonElement();

        // Assert
        expect(button.textContent).toMatch(buttonText);
    });
});

describe("ChatPrompt input state", () => {
    test("updates textarea text", async () => {
        // Arrange
        const handleOnQuery = jest.fn();
        const inputValue = "Lorem ipsum";

        // Act
        render(<ChatPrompt loading={false} onQuery={handleOnQuery} />);

        const textarea = getTextAreaElement();
        userEvent.type(textarea, inputValue);

        // Assert
        await waitFor(() => {
            const textarea = getTextAreaElement();
            expect(textarea).toHaveValue(inputValue);
        });
    });

    test("updates text count", async () => {
        // Arrange
        const handleOnQuery = jest.fn();
        const inputValue = "Lorem ipsum";
        const countValue = "11 / 2000";

        // Act
        render(<ChatPrompt loading={false} onQuery={handleOnQuery} />);

        const textarea = getTextAreaElement();
        userEvent.type(textarea, inputValue);

        // Assert
        await waitFor(() => {
            const textCounter = getTextCountElement();
            expect(textCounter.textContent).toMatch(countValue);
        });
    });

    test("updates button state", async () => {
        // Arrange
        const handleOnQuery = jest.fn();
        const inputValue = "Lorem ipsum";

        // Act
        render(<ChatPrompt loading={false} onQuery={handleOnQuery} />);

        const textarea = getTextAreaElement();
        userEvent.type(textarea, inputValue);

        // Assert
        await waitFor(() => {
            const button = getButtonElement();
            expect(button).not.toBeDisabled();
        });
    });
});

describe("ChatPrompt onQuery", () => {
    test("fires event", async () => {
        // Arrange
        sageClient.poseQuestionAsync.mockResolvedValue(123);
        const handleOnQuery = jest.fn();
        const inputValue = "Lorem ipsum";

        // Act
        render(<ChatPrompt loading={false} onQuery={handleOnQuery} />);

        const textarea = getTextAreaElement();
        await userEvent.type(textarea, inputValue);

        await waitFor(() => {
            const button = getButtonElement();
            expect(button).not.toBeDisabled();
        });

        const button = getButtonElement();
        await userEvent.click(button);

        // Assert
        await waitFor(() => {
            expect(handleOnQuery).toHaveBeenCalled();
            expect(handleOnQuery).toHaveBeenCalledTimes(1);
        });
    });

    test("updates button text", async () => {
        // Arrange
        const mockTimeout = async () => {
            // Set a timeout so we can see the button text change
            await new Promise(function (resolve, reject) {
                setTimeout(resolve(), 3000);
            });
        };
        sageClient.poseQuestionAsync.mockImplementation(mockTimeout);
        const handleOnQuery = jest.fn();
        const inputValue = "Lorem ipsum";
        const buttonText = "Loading...";

        // Act
        render(<ChatPrompt loading={false} onQuery={handleOnQuery} />);

        const textarea = getTextAreaElement();
        await userEvent.type(textarea, inputValue);

        await waitFor(() => {
            const button = getButtonElement();
            expect(button).not.toBeDisabled();
        });

        const button = getButtonElement();
        userEvent.click(button);

        // Assert
        await waitFor(() => {
            const button = getButtonElement();
            expect(button.textContent).toMatch(buttonText);
        });
    });
});

function getButtonElement() {
    return document.querySelector(".chat-prompt-run-button");
}

function getTextAreaElement() {
    return document.querySelector(".chat-prompt-text-area");
}

function getTextCountElement() {
    return document.querySelector(".chat-prompt-text-counter");
}