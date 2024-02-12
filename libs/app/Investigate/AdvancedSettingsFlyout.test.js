import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import AdvancedSettingsModal from './AdvancedSettingsModal';
import ReactDOM from 'react-dom';

describe("Advanced Settings Modal Tests", () => {
    beforeAll(() => {
        ReactDOM.createPortal = jest.fn((element, node) => {
          return element
        })
      })
    
      afterEach(() => {
        ReactDOM.createPortal.mockClear()
      })

      test('Modal renders', () => {
        // Arrange
        

        // Act
        const element = renderer.create(<AdvancedSettingsModal shouldShow={true} onClose={null} />).toJSON();
            
        // Assert
        expect(JSON.stringify(element)).toContain('Advanced Options');
    });

    test('Default Prompt renders', () => {
        // Arrange
        

        // Act
        const element = renderer.create(<AdvancedSettingsModal shouldShow={true} onClose={null} />).toJSON();
            
        // Assert
        expect(JSON.stringify(element)).toContain('Default Prompt');
    });

    test('Modal onClose fires', () => {
        // Arrange
        mockOnClose = jest.fn();

        // Act
        const baseElement = renderer.create(<AdvancedSettingsModal shouldShow={true} onClose={mockOnClose} />);
        const closeButton = baseElement.querySelector(".btn-close");
        fireEvent.click(closeButton);
            
        // Assert
        expect(JSON.stringify(element)).toContain('neXgenAI Investigate');
    });
});
