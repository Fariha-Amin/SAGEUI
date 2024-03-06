import React from 'react';
import '@testing-library/jest-dom'
import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Actions from './Actions';

describe("'Favorite' action", () => {
    test("RPMXCON-84748 - renders correct default icon", async () => {
        // Arrange
        const model = getDefaultModel();
        const faIcon = "star";

        // Act
        render(<Actions model={model} />);
        const element = document.querySelector("button.item-actions_favorite");

        // Assert
        expect(element.outerHTML).toMatch(`data-icon="${faIcon}"`);
    });

    test("RPMXCON-84752 - renders correct active icon", async () => {
        // Arrange
        const model = getDefaultModel();
        model.isFavorite = true; // <-- active

        // Act
        render(<Actions model={model} />);
        const element = document.querySelector("button.item-actions_favorite_active");

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test('fires click event', async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnFavorite = jest.fn();

        // Act
        render(<Actions model={model} onFavoriteClick={handleOnFavorite} />);
        const element = document.querySelector("button.item-actions_favorite");
        await userEvent.click(element);

        // Assert
        expect(handleOnFavorite).toHaveBeenCalled();
        expect(handleOnFavorite).toHaveBeenCalledTimes(1);
    });

    test('RPMXCON-84852 - has tooltip that reads "Favorite"', async () => {
        // Arrange
        const model = getDefaultModel();
        const toolTipText = "Favorite";

        // Act
        render(<Actions model={model} />);
        const element = document.querySelector("button.item-actions_favorite");
        await userEvent.hover(element);
        const toolTip = document.querySelector('[role="tooltip"]');

        // Assert
        expect(toolTip).not.toBeNull();
        expect(toolTip).toBeDefined();
        expect(toolTip.outerHTML).toMatch(toolTipText);
    });
});

describe("'Note' action", () => {
    test("renders correct icon", async () => {
        // Arrange
        const model = getDefaultModel();
        const faIcon = "file-lines";

        // Act
        render(<Actions model={model} />);
        const element = document.querySelector("button.item-actions_notes");

        // Assert
        expect(element.outerHTML).toMatch(`data-icon="${faIcon}"`);
    });

    test("renders correct active icon", async () => {
        // Arrange
        const model = getDefaultModel();
        model.hasNote = true; // <-- active

        // Act
        render(<Actions model={model} />);
        const element = document.querySelector("button.item-actions_notes_active");

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test('fires click event', async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnNote = jest.fn();

        // Act
        render(<Actions model={model} onNoteClick={handleOnNote} />);
        const element = document.querySelector("button.item-actions_notes");
        await userEvent.click(element);

        // Assert
        expect(handleOnNote).toHaveBeenCalled();
        expect(handleOnNote).toHaveBeenCalledTimes(1);
    });

    test('has tooltip that reads "Add notes"', async () => {
        // Arrange
        const model = getDefaultModel();
        const toolTipText = "Add notes";

        // Act
        render(<Actions model={model} />);
        const element = document.querySelector("button.item-actions_notes");
        await userEvent.hover(element);
        const toolTip = document.querySelector('[role="tooltip"]');

        // Assert
        expect(toolTip).not.toBeNull();
        expect(toolTip).toBeDefined();
        expect(toolTip.outerHTML).toMatch(toolTipText);
    });
});

describe("'Bad Response' action", () => {
    test("renders correct icon", async () => {
        // Arrange
        const model = getDefaultModel();
        const faIcon = "comments";

        // Act
        render(<Actions model={model} />);
        const element = document.querySelector("button.item-actions_feedback");

        // Assert
        expect(element.outerHTML).toMatch(`data-icon="${faIcon}"`);
    });

    test("renders correct active icon", async () => {
        // Arrange
        const model = getDefaultModel();
        model.hasFeedback = true; // <-- active

        // Act
        render(<Actions model={model} />);
        const element = document.querySelector("button.item-actions_feedback_active");

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test('fires click event', async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnFeedback = jest.fn();

        // Act
        render(<Actions model={model} onFeedbackClick={handleOnFeedback} />);
        const element = document.querySelector("button.item-actions_feedback");
        await userEvent.click(element);

        // Assert
        expect(handleOnFeedback).toHaveBeenCalled();
        expect(handleOnFeedback).toHaveBeenCalledTimes(1);
    });

    test('RPMXCON-85401 has tooltip that reads "Report a bad response"', async () => {
        // Arrange
        const model = getDefaultModel();
        const toolTipText = "Report a bad response";

        // Act
        render(<Actions model={model} />);
        const element = document.querySelector("button.item-actions_feedback");
        await userEvent.hover(element);
        const toolTip = document.querySelector('[role="tooltip"]');

        // Assert
        expect(toolTip).not.toBeNull();
        expect(toolTip).toBeDefined();
        expect(toolTip.outerHTML).toMatch(toolTipText);
    });
});

describe("'Delete' action", () => {
    test("RPMXCON-85184 renders correct icon", async () => {
        // Arrange
        const model = getDefaultModel();
        const faIcon = "trash-can";

        // Act
        render(<Actions model={model} />);
        const element = document.querySelector("button.item-actions_delete");

        // Assert
        expect(element.outerHTML).toMatch(`data-icon="${faIcon}"`);
    });

    test('fires click event', async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnDelete = jest.fn();

        // Act
        render(<Actions model={model} onDeleteClick={handleOnDelete} />);
        const element = document.querySelector("button.item-actions_delete");
        await userEvent.click(element);

        // Assert
        expect(handleOnDelete).toHaveBeenCalled();
        expect(handleOnDelete).toHaveBeenCalledTimes(1);
    });

    test('RPMXCON-85196 has tooltip that reads "Delete from page"', async () => {
        // Arrange
        const model = getDefaultModel();
        const toolTipText = "Delete from page";

        // Act
        render(<Actions model={model} />);
        const element = document.querySelector("button.item-actions_delete");
        await userEvent.hover(element);
        const toolTip = document.querySelector('[role="tooltip"]');

        // Assert
        expect(toolTip).not.toBeNull();
        expect(toolTip).toBeDefined();
        expect(toolTip.outerHTML).toMatch(toolTipText);
    });
});

function getDefaultModel() {
    return {
        id: 0,
        datetime: new Date(),
        isFavorite: false,
        hasNote: false,
        hasFeedback: false,
        isDeleted: false,
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