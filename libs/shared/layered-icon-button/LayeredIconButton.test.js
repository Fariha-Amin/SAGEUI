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
        const element = renderer
            .create(
                <LayeredIconButton>
                    <Icon icon={primaryIcon} />
                    <Icon icon={secondaryIcon} />
                </LayeredIconButton>
            )
            .toJSON();
        const strElement = JSON.stringify(element);

        // Assert
        expect(strElement).toMatch('"data-icon":"circle"');
        expect(strElement).toMatch('"data-icon":"square"');
    });

    // Solid is the expected default
    test('SOLID icon type by default', () => {
        // Arrange
        const primaryIcon = "circle";
        const secondaryIcon = "square";

        // Act
        const element = renderer
            .create(
                <LayeredIconButton>
                    <Icon icon={primaryIcon} />
                    <Icon icon={secondaryIcon} />
                </LayeredIconButton>
            )
            .toJSON();
        const strElement = JSON.stringify(element);

        // Assert
        expect(strElement).toMatch('"data-prefix":"fas"');
    });

    // Regular is the expected output when specified
    test('REGULAR icon type when specified as string', () => {
        // Arrange
        const primaryIcon = "fa-regular fa-circle";
        const secondaryIcon = "fa-regular fa-square";

        // Act
        const element = renderer
            .create(
                <LayeredIconButton>
                    <Icon icon={primaryIcon} />
                    <Icon icon={secondaryIcon} />
                </LayeredIconButton>
            )
            .toJSON();
        const strElement = JSON.stringify(element);

        // Assert
        expect(strElement).toMatch('"data-prefix":"far"');
    });

    // Regular is the expected output when specified
    test('REGULAR icon type when specified as array', () => {
        // Arrange
        const primaryIcon = ["far", "circle"];
        const secondaryIcon = ["far", "square"];

        // Act
        const element = renderer
            .create(
                <LayeredIconButton>
                    <Icon icon={primaryIcon} />
                    <Icon icon={secondaryIcon} />
                </LayeredIconButton>
            )
            .toJSON();
        const strElement = JSON.stringify(element);

        // Assert
        expect(strElement).toMatch('"data-prefix":"far"');
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