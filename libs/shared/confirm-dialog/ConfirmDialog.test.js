import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render } from "@testing-library/react";
import ConfirmDialog from './ConfirmDialog';

describe("ConfirmDialog renders", () => {
    test('default title text', () => {
        // Arrange
        const text = "Confirm";

        // Act
        render(<ConfirmDialog visible={true} />);
        const element = document.querySelector(".sage-dialog__header");

        // Assert
        expect(element.innerHTML).toMatch(text);
    });

    test('custom title text', () => {
        // Arrange
        const text = "Custom jest test title";

        // Act
        render(<ConfirmDialog visible={true} header={text} />);
        const element = document.querySelector(".sage-dialog__header");

        // Assert
        expect(element.innerHTML).toMatch(text);
    });

    test('default body text', () => {
        // Arrange
        const text = "Are you sure you want to proceed?";

        // Act
        render(<ConfirmDialog visible={true} />);
        const element = document.querySelector(".sage-dialog__content");

        // Assert
        expect(element.innerHTML).toMatch(text);
    });

    test('custom body text', () => {
        // Arrange
        const text = "Custom jest test body";

        // Act
        render(<ConfirmDialog visible={true} message={text} />);
        const element = document.querySelector(".sage-dialog__content");

        // Assert
        expect(element.innerHTML).toMatch(text);
    });

    test('default accept button text', () => {
        // Arrange
        const text = "Ok";

        // Act
        render(<ConfirmDialog visible={true} />);
        const element = document.querySelector(`button[aria-label="${text}"]`);

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test('custom accept button text', () => {
        // Arrange
        const text = "Sure!";

        // Act
        render(<ConfirmDialog visible={true} acceptButtonLabel={text} />);
        const element = document.querySelector(`button[aria-label="${text}"]`);

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test('default reject button text', () => {
        // Arrange
        const text = "Cancel";

        // Act
        render(<ConfirmDialog visible={true} />);
        const element = document.querySelector(`button[aria-label="${text}"]`);

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test('custom reject button text', () => {
        // Arrange
        const text = "No way!";

        // Act
        render(<ConfirmDialog visible={true} rejectButtonLabel={text} />);
        const element = document.querySelector(`button[aria-label="${text}"]`);

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test('accept button indicates loading', () => {
        // Arrange
        // n/a

        // Act
        render(<ConfirmDialog visible={true} acceptLoading={true} />);
        const element = document.querySelector('button[aria-label="Ok"].p-button-loading');

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test('reject button indicates loading', () => {
        // Arrange
        // n/a

        // Act
        render(<ConfirmDialog visible={true} rejectLoading={true} />);
        const element = document.querySelector('button[aria-label="Cancel"].p-button-loading');

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });
});

describe("ConfirmDialog onClick", () => {
    test('fires accept click event', () => {
        // Arrange
        const handleOnClick = jest.fn();

        // Act
        render(<ConfirmDialog visible={true} onAccept={handleOnClick} />);
        const element = document.querySelector('button[aria-label="Ok"]');
        fireEvent.click(element);

        // Assert
        expect(handleOnClick).toHaveBeenCalled();
        expect(handleOnClick).toHaveBeenCalledTimes(1);
    });

    test('fires reject click event', () => {
        // Arrange
        const handleOnClick = jest.fn();

        // Act
        render(<ConfirmDialog visible={true} onReject={handleOnClick} />);
        const element = document.querySelector('button[aria-label="Cancel"]');
        fireEvent.click(element);

        // Assert
        expect(handleOnClick).toHaveBeenCalled();
        expect(handleOnClick).toHaveBeenCalledTimes(1);
    });
});