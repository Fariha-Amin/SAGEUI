import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, prettyDOM } from '@testing-library/react';
import { userEvent } from "@testing-library/user-event";
import '@testing-library/jest-dom'
import AdvancedSettingsFlyout from './AdvancedSettingsFlyout';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../../app/Investigate/store';
import App from '../../../app/investigate/App';
import ChatPrompt from './chat/ChatPrompt';

describe('RPMXCON-79212 Advanced Settings Flyout', () => {
  test(`RPMXCON-84430 Verify that clicking on the 'Advanced Options' link should open the advanced options popup window		`, async () => {
        // Arrange
        mockWindowFunctions();
        const handleOnQuery = jest.fn();

        // Act
        const element = render(<ChatPrompt loading={false} onQuery={handleOnQuery} />);
        
        const advOptions = getAdvOptsElement();
        await userEvent.click(advOptions);

        //Assert
        expect(await element.findByText('Default Prompt')).not.toBeNull();
  });

  test(`RPMXCON-84429 Verify 'Advanced Options' link present above question textbox on AI investigate home page		`, async () => {
    // Arrange
    mockWindowFunctions();
    const handleOnQuery = jest.fn();

    // Act
    render(<ChatPrompt loading={false} onQuery={handleOnQuery} />);
    const advOptions = getAdvOptsElement();

    // Assert
    expect(advOptions).not.toBeNull();
  });

  test(`RPMXCON-84433 Verify that when clicking on the 'X' button should close the advanced settings window and return to AI investigate home page`, async () => {
    // Arrange
    mockWindowFunctions();
    const handleOnQuery = jest.fn();

    // Act
    const element = render(<ChatPrompt loading={false} onQuery={handleOnQuery} />);
 
    //Click to open Flyout
    const advOptions = getAdvOptsElement();
    await userEvent.click(advOptions);
    await element.findByText('Default Prompt')
    
    //Click to close flyout
    const advOptionsClose = getAdvOptsCloseButton();
    await userEvent.click(advOptionsClose);

    //Assert
    expect(JSON.stringify(element.baseElement)).not.toContain('Default Prompt');
  });

  test(`RPMXCON-84434 Verify that user  can view the 'default investigate prompt' in the advanced options window`, async () => {
    // Arrange
    mockWindowFunctions();
    const handleOnQuery = jest.fn();

    // Act
    const element = render(<ChatPrompt loading={false} onQuery={handleOnQuery} />);
 
    //Click to open Flyout
    const advOptions = getAdvOptsElement();
    await userEvent.click(advOptions);
    await element.findByText('Default Prompt')
    
    //Assert
    expect(JSON.stringify(element.baseElement)).not.toContain('advopt-body');
  });

  test(`RPMXCON-84435 Verify that helptext icon should be present for advanced options link in AI investigate home page`, async () => {
    // Arrange
    mockWindowFunctions();
    const handleOnQuery = jest.fn();

    // Act
    const element = render(<ChatPrompt loading={false} onQuery={handleOnQuery} />);
 
    //Assert
    expect(JSON.stringify(element.baseElement)).not.toContain('advopt-title-help');
  });
});

function mockWindowFunctions() {
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
}

function getAdvOptsElement() {
  return document.querySelector(".chat-prompt-advanced-options");
}

function getAdvOptsCloseButton() {
  return document.querySelector(".advopt-close-button");
}