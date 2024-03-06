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

  test(`RPMXCON-85405 Verify that clicking Cancel calls close delegate`, async () => {
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

  test(`RPMXCON-85405 Verify that clicking X calls close delegate`, async () => {
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

  test("RPMXCON-85409 - Verify that the text count updates", async () => {
    // Arrange
    mockWindowFunctions();
    const countValue = "11 / 400";
    var feedback = '';
    const newFeedback = "Lorem ipsum";
    const handleOnClose = jest.fn();
    const handleOnSave = (e) => {feedback = e;};
    const user = userEvent.setup({ delay: null });

    // Act
    render(<FeedbackModal shouldShow={true} onClose={handleOnClose} onSave={handleOnSave} feedback={feedback} />);
    
    const textarea = await waitFor(() => getFeedbackTextArea());
    await user.clear(textarea);
    await user.type(textarea, newFeedback);

    // Assert
    await waitFor(() => {
        const textCounter = getTextCountElement();
        expect(textCounter.textContent).toMatch(countValue);
    });
  });

  test("RPMXCON-85410 - Verify the max text message", async () => {
    // Arrange
    mockWindowFunctions();
    const countValue = "You have exceeded the max character limit.";
    const newFeedback = "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum";
    const handleOnClose = jest.fn();
    const handleOnSave = (e) => {feedback = e;};
    const user = userEvent.setup({ delay: null });

    // Act
    render(<FeedbackModal shouldShow={true} onClose={handleOnClose} onSave={handleOnSave} feedback={''} />);
    
    const textarea = await waitFor(() => getFeedbackTextArea());
    await user.clear(textarea);
    await user.type(textarea, newFeedback);

    // Assert
    await waitFor(() => {
        const textCounter = getTextCountElement();
        expect(textCounter.textContent).toMatch(countValue);
    });
  });

  test("RPMXCON-85408 - Verify save button disabled when no text entered", async () => {
    // Arrange
    mockWindowFunctions();
    const handleOnClose = jest.fn();
    const handleOnSave = (e) => {feedback = e;};
    const user = userEvent.setup({ delay: null });

    // Act
    render(<FeedbackModal shouldShow={true} onClose={handleOnClose} onSave={handleOnSave} feedback={''} />);
    
    const textarea = await waitFor(() => getFeedbackTextArea());
    const saveButton = await waitFor(() => getFeedbackSaveButton());
    
    // Assert
    expect(saveButton).toBeDisabled();
  });

  test("RPMXCON-85408 - Verify save button enabled when text entered", async () => {
    // Arrange
    mockWindowFunctions();
    const newFeedback = "Hello!";
    const handleOnClose = jest.fn();
    const handleOnSave = (e) => {feedback = e;};
    const user = userEvent.setup({ delay: null });

    // Act
    render(<FeedbackModal shouldShow={true} onClose={handleOnClose} onSave={handleOnSave} feedback={''} />);
    
    const textarea = await waitFor(() => getFeedbackTextArea());
    await user.type(textarea, newFeedback);
    const saveButton = await waitFor(() => getFeedbackSaveButton());
    
    // Assert
    expect(saveButton).not.toBeDisabled();
  });

  test("RPMXCON-85402 - Verify modal verbiage", async () => {
    // Arrange
    mockWindowFunctions();
    const countValue = "0 / 400";
    const header = "Report Bad Response";
    const tooltip = "If you are not satisfied with the response, please let us know. For more optimal results, please be specific when forming your questions. The default investigation prompt is a guide on how to format questions to the LLM.";
    const placeholder = "Enter your feedback for this question & answer here."
    const saveLabel = "Save";
    const cancelLabel = "Cancel";
    const handleOnClose = jest.fn();
    const handleOnSave = (e) => {feedback = e;};
    const user = userEvent.setup({ delay: null });

    // Act
    render(<FeedbackModal shouldShow={true} onClose={handleOnClose} onSave={handleOnSave} feedback={''} />);
    
    const textarea = await waitFor(() => getFeedbackTextArea());
    const textCounter = await waitFor(() => getTextCountElement());
    const feedbackHeader = await waitFor(() => getFeedbackHeader());
    const saveButton = await waitFor(() => getFeedbackSaveButton());
    const cancelButton = await waitFor(() => getFeedbackCancelButton());
    const helpIcon = await waitFor(() => getFeedbackHeaderHelpIcon());

    // Assert
        expect(textCounter.textContent).toMatch(countValue);
        expect(textarea).toHaveProperty("placeholder", placeholder);
        expect(feedbackHeader.textContent).toMatch(header);
        expect(helpIcon.outerHTML).toContain(tooltip);
        expect(saveButton.textContent).toMatch(saveLabel);
        expect(cancelButton.textContent).toMatch(cancelLabel);
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

function getTextCountElement() {
  return document.querySelector(".feedback-modal__text-counter");
}

function getFeedbackHeader() {
  return document.querySelector(".feedback-modal__header");
}

function getFeedbackHeaderHelpIcon() {
  return document.querySelector(".feedback-modal__header .sage-icon-button");
}


