import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import AdvancedSettingsFlyout from './AdvancedSettingsFlyout';
import sageClient from "_investigate/httpClient";

jest.mock("_investigate/httpClient");

describe("Advanced Settings Flyout", () => {
  test(`RPMXCON-84434 Verify that user can view the 'default investigate prompt' in the advanced options window`, async () => {
    // Arrange
    mockWindowFunctions();
    const defaultPromptText = "Lorem ipsum";
    sageClient.getDefaultPromptText.mockResolvedValue(defaultPromptText);
    const handleOnClose = jest.fn();

    // Act
    render(<AdvancedSettingsFlyout shouldShow={true} onClose={handleOnClose} />);
    const element = await screen.findByText(defaultPromptText);

    // Assert
    expect(element).not.toBeNull();
    expect(element).toBeDefined();
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