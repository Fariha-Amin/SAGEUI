import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'
import { fireEvent, render } from "@testing-library/react";
import IconButton from './IconButton';

describe("IconButton renders", () => {
    test('requested icon', () => {
        // Arrange
        const faIcon = "circle-question";

        // Act
        const element = renderer
            .create(<IconButton icon={faIcon} />)
            .toJSON();

        // Assert
        expect(JSON.stringify(element)).toMatch('"data-icon":"circle-question"');
    });

    // Solid is the expected default
    test('SOLID icon type by default', () => {
        // Arrange
        const faIcon = "circle-question";

        // Act
        const element = renderer
            .create(<IconButton icon={faIcon} />)
            .toJSON();

        // Assert
        expect(JSON.stringify(element)).toMatch('"data-prefix":"fas"');
    });

    // Regular is the expected output when specified
    test('REGULAR icon type when specified as string', () => {
        // Arrange
        const faIcon = "fa-regular fa-circle-question";

        // Act
        const element = renderer
            .create(<IconButton icon={faIcon} />)
            .toJSON();

        // Assert
        expect(JSON.stringify(element)).toMatch('"data-prefix":"far"');
    });

    // Regular is the expected output when specified
    test('REGULAR icon type when specified as array', () => {
        // Arrange
        const faIcon = ["far", "circle-question"];

        // Act
        const element = renderer
            .create(<IconButton icon={faIcon} />)
            .toJSON();

        // Assert
        expect(JSON.stringify(element)).toMatch('"data-prefix":"far"');
    });

    test('Tooltip Renders if added', () => {
        // Arrange
        const tooltipId = "tooltipTest";
        const tooltip = "This is only a test";
        const faIcon = ["far", "circle-question"];

        // Act
        const element = renderer
            .create(<IconButton icon={faIcon} tooltipId={tooltipId} tooltip={tooltip} />)
            .toJSON();

        // Assert
        expect(JSON.stringify(element)).toContain('tooltipTest');
    });
});

describe("IconButton onClick", () => {
    test('fires click event', () => {
        // Arrange
        const faIcon = "circle-question";
        const handleOnClick = jest.fn();
        render(<IconButton icon={faIcon} onClick={handleOnClick} />);
        const element = document.querySelector("button");

        // Act
        fireEvent.click(element);

        // Assert
        expect(handleOnClick).toHaveBeenCalled();
        expect(handleOnClick).toHaveBeenCalledTimes(1);
    });
});