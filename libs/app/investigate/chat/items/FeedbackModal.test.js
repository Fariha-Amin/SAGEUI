import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import FeedbackModal from './FeedbackModal';

jest.mock("_investigate/httpClient");

describe("Feedback Modal Tests", () => {
  test(`Verify Modal Renders with Feedback`, async () => {
    // Arrange
    mockWindowFunctions();
    const feedback = "Lorem ipsum";
    const handleOnClose = jest.fn();
    const handleOnSave = jest.fn();

    // Act
    render(<FeedbackModal shouldShow={true} onClose={handleOnClose} onSave={handleOnSave} feedback={feedback} />);
    const element = await screen.findByText(feedback);

    // Assert
    expect(element).not.toBeNull();
    expect(element).toBeDefined();
  });

  test(`Verify that clicking Cancel calls close delegate`, async () => {
    // Arrange
    mockWindowFunctions();
    const feedback = "Lorem ipsum";
    var shouldShow = true;
    const handleOnClose = () => {shouldShow = !shouldShow;};
    const handleOnSave = jest.fn();

    // Act
    render(<FeedbackModal shouldShow={shouldShow} onClose={handleOnClose} onSave={handleOnSave} feedback={feedback} />);
    const element = await screen.findByText(feedback);

    const feedbackClose = await waitFor(() => getFeedbackCancelButton());
    await userEvent.click(feedbackClose);

    // Assert
    expect(shouldShow).toEqual(false);
  });

  test(`Verify that clicking X calls close delegate`, async () => {
    // Arrange
    mockWindowFunctions();
    const feedback = "Lorem ipsum";
    var shouldShow = true;
    const handleOnClose = () => {shouldShow = !shouldShow;};
    const handleOnSave = jest.fn();

    // Act
    render(<FeedbackModal shouldShow={shouldShow} onClose={handleOnClose} onSave={handleOnSave} feedback={feedback} />);
    const element = await screen.findByText(feedback);
    
    const feedbackClose = await waitFor(() => getFeedbackCloseButton());
    await userEvent.click(feedbackClose);
    
    // Assert
    expect(shouldShow).toEqual(false);
  });

  test(`Verify that feedback is returned on save`, async () => {
    // Arrange
    mockWindowFunctions();
    var feedback = "Lorem ipsum";
    const newFeedback = "This is new feedback";
    const handleOnClose = jest.fn();
    const handleOnSave = (e) => {feedback = e;};
    const user = userEvent.setup({ delay: null });

    // Act
    render(<FeedbackModal shouldShow={true} onClose={handleOnClose} onSave={handleOnSave} feedback={feedback} />);
    const element = await screen.findByText(feedback);

    const textarea = await waitFor(() => getFeedbackTextArea());
    await user.clear(textarea);
    await user.type(textarea, newFeedback);

    const feedbackSave = await waitFor(() => getFeedbackSaveButton());
    await userEvent.click(feedbackSave);

    // Assert
    expect(feedback).toEqual(newFeedback);
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

function getFeedbackCloseButton() {
    return document.querySelector(".feedback-modal__dialog .p-dialog-header .p-dialog-header-close-icon");
}

function getFeedbackCancelButton() {
    return document.querySelector(".feedback-modal__cancel");
}

function getFeedbackSaveButton() {
    return document.querySelector(".feedback-modal__save");
}

function getFeedbackTextArea() {
    return document.querySelector(".feedback-modal__text-area");
}