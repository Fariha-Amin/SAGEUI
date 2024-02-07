import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'
import { fireEvent, render } from "@testing-library/react";
import Counter from './Counter';

describe("Counter Tests", () => {
    test('Counter renders with commas', () => {
        // Arrange
        const count = 1000;

        // Act
        const element = renderer
            .create(<Counter count={count} />)
            .toJSON();

        // Assert
        expect(JSON.stringify(element)).toContain('"1,000"');
    });

    test('Counter has zero class when set to zero', () => {
        // Arrange
        const count = 0;

        // Act
        const element = renderer
            .create(<Counter count={count} />);
            

        // Assert
        expect(JSON.stringify(element)).toContain('counter--zero');
    });

    test('Counter does not have zero class when non zero', () => {
        // Arrange
        const count = 1000;

         // Act
         const element = renderer
         .create(<Counter count={count} />);
         

        // Assert
        expect(JSON.stringify(element)).not.toContain('counter--zero');
    });
});
