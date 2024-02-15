import React from 'react';
import '@testing-library/jest-dom'
import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Actions from './Actions';

describe("'Favorite' action", () => {
    test("renders correct default icon", async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnFavorite = jest.fn();

        // Act
        render(<Actions model={model} onFavoriteClick={handleOnFavorite} />);
        const icon = document.querySelector('[data-icon="star"]');
        const type = document.querySelector('[data-prefix="far"]');
        
        // Assert
        expect(icon).not.toBeNull();
        expect(icon).toBeDefined();
        expect(type).not.toBeNull();
        expect(type).toBeDefined();
    });

    test("renders correct active icon", async () => {
        // Arrange
        const model = getDefaultModel();
        model.isFavorite = true; // <-- active
        const handleOnFavorite = jest.fn();

        // Act
        render(<Actions model={model} onFavoriteClick={handleOnFavorite} />);
        const icon = document.querySelector('[data-icon="star"]');
        const type = document.querySelector('[data-prefix="fas"]');
        
        // Assert
        expect(icon).not.toBeNull();
        expect(icon).toBeDefined();
        expect(type).not.toBeNull();
        expect(type).toBeDefined();
    });

    test('fires click event', async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnFavorite = jest.fn();
        render(<Actions model={model} onFavoriteClick={handleOnFavorite} />);
        const element = document.querySelector("button.item-actions_favorite");

        // Act
        await userEvent.click(element);

        // Assert
        expect(handleOnFavorite).toHaveBeenCalled();
        expect(handleOnFavorite).toHaveBeenCalledTimes(1);
    });

    test('has tooltip that reads "Favorite"', async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnFavorite = jest.fn();
        const favoriteText = "Favorite";

        // Act
        render(<Actions model={model} onFavoriteClick={handleOnFavorite} />);
        const element = document.querySelector("button.item-actions_favorite");
        await userEvent.hover(element);
        const toolTip = document.querySelector('[role="tooltip"]');

        // Assert
        expect(toolTip).not.toBeNull();
        expect(toolTip).toBeDefined();
        expect(toolTip.outerHTML).toMatch(favoriteText);
    });
});

describe("'Comment' action", () => {
    test("renders correct icon", async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnNote = jest.fn();
        const faIcon = "file-lines";

        // Act
        render(<Actions model={model} onNoteClick={handleOnNote} />);
        const element = document.querySelector(`[data-icon="${faIcon}"]`);
        
        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test('fires click event', async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnNote = jest.fn();
        render(<Actions model={model} onNoteClick={handleOnNote} />);
        const element = document.querySelector("button.item-actions_document");

        // Act
        await userEvent.click(element);

        // Assert
        expect(handleOnNote).toHaveBeenCalled();
        expect(handleOnNote).toHaveBeenCalledTimes(1);
    });
});

describe("'Bad Response' action", () => {
    test("renders correct icon", async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnReportIssue = jest.fn();
        const faIcon = "comments";

        // Act
        render(<Actions model={model} onReportIssueClick={handleOnReportIssue} />);
        const element = document.querySelector(`[data-icon="${faIcon}"]`);
        
        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test('fires click event', async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnReportIssue = jest.fn();
        render(<Actions model={model} onReportIssueClick={handleOnReportIssue} />);
        const element = document.querySelector("button.item-actions_comment");

        // Act
        await userEvent.click(element);

        // Assert
        expect(handleOnReportIssue).toHaveBeenCalled();
        expect(handleOnReportIssue).toHaveBeenCalledTimes(1);
    });
});

describe("'Delete' action", () => {
    test("renders correct icon", async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnDelete = jest.fn();
        const faIcon = "trash-can";

        // Act
        render(<Actions model={model} onDeleteClick={handleOnDelete} />);
        const element = document.querySelector(`[data-icon="${faIcon}"]`);
        
        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test('fires click event', async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnDelete = jest.fn();
        render(<Actions model={model} onDeleteClick={handleOnDelete} />);
        const element = document.querySelector("button.item-actions_delete");

        // Act
        await userEvent.click(element);

        // Assert
        expect(handleOnDelete).toHaveBeenCalled();
        expect(handleOnDelete).toHaveBeenCalledTimes(1);
    });
});

function getDefaultModel() {
    return {
        id: 0,
        datetime: new Date(),
        isFavorite: false,
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