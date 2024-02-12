import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import AdvancedSettingsFlyout from './AdvancedSettingsFlyout';
import ReactDOM from 'react-dom';

describe("Advanced Settings Modal Tests", () => {
    beforeAll(() => {
        ReactDOM.createPortal = jest.fn((element, node) => {
          return element
        });
        fetch.resetMocks();
      })
    
      afterEach(() => {
        ReactDOM.createPortal.mockClear()
      })

      test('Modal renders', () => {
        // Arrange
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          })),
        });

        fetch.mockResponseOnce(JSON.stringify({data:'Placeholder'}));

        // Act
        const element = renderer.create(<AdvancedSettingsFlyout shouldShow={true} onClose={null} />).toJSON();
            
        // Assert
        expect(JSON.stringify(element)).toContain('Advanced Options');
    });

    test('Default Prompt renders', () => {
        // Arrange
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          })),
        });

        fetch.mockResponseOnce(JSON.stringify({data:'Placeholder'}));

        // Act
        const element = renderer.create(<AdvancedSettingsFlyout shouldShow={true} onClose={null} />).toJSON();
            
        // Assert
        expect(JSON.stringify(element)).toContain('Default Prompt');
    });

    test('Modal onClose fires', () => {
        // Arrange
        mockOnClose = jest.fn();
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          })),
        });

        fetch.mockResponseOnce(JSON.stringify({data:'Placeholder'}));

        // Act
        const baseElement = renderer.create(<AdvancedSettingsFlyout shouldShow={true} onClose={mockOnClose} />);
        const closeButton = baseElement.querySelector(".btn-close");
        fireEvent.click(closeButton);
            
        // Assert
        expect(JSON.stringify(element)).toContain('neXgenAI Investigate');
    });
});
