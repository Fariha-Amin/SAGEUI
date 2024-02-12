import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'
import { fireEvent, render } from "@testing-library/react";
import LayeredIconButton from './LayeredIconButton';
import Icon from '../icon/Icon';

describe("LayeredIconButton renders", () => {
    test('requested icons', () => {
        // Arrange
        const primaryIcon = "circle";
        const secondaryIcon = "square";

        // Act
        render(
            <LayeredIconButton>
                <Icon icon={primaryIcon} />
                <Icon icon={secondaryIcon} />
            </LayeredIconButton>
        );
        const circleIcon = document.querySelector('[data-icon="circle"]');
        const squareIcon = document.querySelector('[data-icon="square"]');

        // Assert
        expect(circleIcon).not.toBeNull();
        expect(circleIcon).toBeDefined();
        expect(squareIcon).not.toBeNull();
        expect(squareIcon).toBeDefined();
    });

    // Solid is the expected default
    test('SOLID icon type by default', () => {
        // Arrange
        const primaryIcon = "circle";
        const secondaryIcon = "square";

        // Act
        render(
            <LayeredIconButton>
                <Icon icon={primaryIcon} />
                <Icon icon={secondaryIcon} />
            </LayeredIconButton>
        );
        const element = document.querySelector('[data-prefix="fas"]');

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    // Regular is the expected output when specified
    test('REGULAR icon type when specified as string', () => {
        // Arrange
        const primaryIcon = "fa-regular fa-circle";
        const secondaryIcon = "fa-regular fa-square";

        // Act
        render(
            <LayeredIconButton>
                <Icon icon={primaryIcon} />
                <Icon icon={secondaryIcon} />
            </LayeredIconButton>
        );
        const element = document.querySelector('[data-prefix="far"]');

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    // Regular is the expected output when specified
    test('REGULAR icon type when specified as array', () => {
        // Arrange
        const primaryIcon = ["far", "circle"];
        const secondaryIcon = ["far", "square"];

        // Act
        render(
            <LayeredIconButton>
                <Icon icon={primaryIcon} />
                <Icon icon={secondaryIcon} />
            </LayeredIconButton>
        );
        const element = document.querySelector('[data-prefix="far"]');

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });
});

describe("LayeredIconButton onClick", () => {
    test('fires click event', () => {
        // Arrange
        const primaryIcon = "circle";
        const secondaryIcon = "square";
        const handleOnClick = jest.fn();

        // Act
        render(
            <LayeredIconButton onClick={handleOnClick}>
                <Icon icon={primaryIcon} />
                <Icon icon={secondaryIcon} />
            </LayeredIconButton>
        );
        const element = document.querySelector("button");

        // Act
        fireEvent.click(element);

        // Assert
        expect(handleOnClick).toHaveBeenCalled();
        expect(handleOnClick).toHaveBeenCalledTimes(1);
    });
});