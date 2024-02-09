import React from 'react';
import '@testing-library/jest-dom'
import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Actions from './Actions';

describe("'Favorite' action", () => {
    test("renders correct icon", async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnFavorite = jest.fn();
        const faIcon = "star";

        // Act
        render(<Actions model={model} onFavorite={handleOnFavorite} />);
        const element = document.querySelector(`[data-icon="${faIcon}"]`);
        
        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test('fires click event', async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnFavorite = jest.fn();
        render(<Actions model={model} onFavorite={handleOnFavorite} />);
        const element = document.querySelector("button.item-actions_favorite");

        // Act
        await userEvent.click(element);

        // Assert
        expect(handleOnFavorite).toHaveBeenCalled();
        expect(handleOnFavorite).toHaveBeenCalledTimes(1);
    });
});

describe("'Search' action", () => {
    test("renders correct icon", async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnSearch = jest.fn();
        const faIcon = "magnifying-glass";

        // Act
        render(<Actions model={model} onSearch={handleOnSearch} />);
        const element = document.querySelector(`[data-icon="${faIcon}"]`);
        
        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test('fires click event', async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnSearch = jest.fn();
        render(<Actions model={model} onSearch={handleOnSearch} />);
        const element = document.querySelector("button.item-actions_search");

        // Act
        await userEvent.click(element);

        // Assert
        expect(handleOnSearch).toHaveBeenCalled();
        expect(handleOnSearch).toHaveBeenCalledTimes(1);
    });
});

describe("'Magic' action", () => {
    test("renders correct icon", async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnMagic = jest.fn();
        const faIcon = "wand-magic-sparkles";

        // Act
        render(<Actions model={model} onMagic={handleOnMagic} />);
        const element = document.querySelector(`[data-icon="${faIcon}"]`);
        
        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test('fires click event', async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnMagic = jest.fn();
        render(<Actions model={model} onMagic={handleOnMagic} />);
        const element = document.querySelector("button.item-actions_magic");

        // Act
        await userEvent.click(element);

        // Assert
        expect(handleOnMagic).toHaveBeenCalled();
        expect(handleOnMagic).toHaveBeenCalledTimes(1);
    });
});

describe("'Document' action", () => {
    test("renders correct icon", async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnDocument = jest.fn();
        const faIcon = "file-lines";

        // Act
        render(<Actions model={model} onDocument={handleOnDocument} />);
        const element = document.querySelector(`[data-icon="${faIcon}"]`);
        
        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test('fires click event', async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnDocument = jest.fn();
        render(<Actions model={model} onDocument={handleOnDocument} />);
        const element = document.querySelector("button.item-actions_document");

        // Act
        await userEvent.click(element);

        // Assert
        expect(handleOnDocument).toHaveBeenCalled();
        expect(handleOnDocument).toHaveBeenCalledTimes(1);
    });
});

describe("'Comment' action", () => {
    test("renders correct icon", async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnComment = jest.fn();
        const faIcon = "comments";

        // Act
        render(<Actions model={model} onComment={handleOnComment} />);
        const element = document.querySelector(`[data-icon="${faIcon}"]`);
        
        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test('fires click event', async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnComment = jest.fn();
        render(<Actions model={model} onComment={handleOnComment} />);
        const element = document.querySelector("button.item-actions_comment");

        // Act
        await userEvent.click(element);

        // Assert
        expect(handleOnComment).toHaveBeenCalled();
        expect(handleOnComment).toHaveBeenCalledTimes(1);
    });
});

describe("'Delete' action", () => {
    test("renders correct icon", async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnDelete = jest.fn();
        const faIcon = "trash-can";

        // Act
        render(<Actions model={model} onDelete={handleOnDelete} />);
        const element = document.querySelector(`[data-icon="${faIcon}"]`);
        
        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test('fires click event', async () => {
        // Arrange
        const model = getDefaultModel();
        const handleOnDelete = jest.fn();
        render(<Actions model={model} onDelete={handleOnDelete} />);
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