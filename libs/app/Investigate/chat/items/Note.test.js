import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Note from './Note';

jest.mock("_investigate/httpClient");

describe("Note Tests", ()=> {
    
    test(`Verify Note component loading`, async () => {
        // Arrange
        mockWindowFunctions();
        const note = "Some note text";
        const handleOnSave = jest.fn();
        const handleOnCancel = jest.fn();
        // Act  
        render(<Note onSave={handleOnSave} onCancel={handleOnCancel} note={note} />);
        const element = await screen.findByText(note);
        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test(`Verify count of input update`, async () => {
        //Arrange
        mockWindowFunctions();
        const note = '';
        const noteText = "Some note text";
        const counterValue = "14 / 400";
        const handleOnSave = (e) => {feedback = e;};
        const handleOnCancel = jest.fn();
        const user = userEvent.setup({ delay: null });
        //Act
        render(<Note onSave={handleOnSave} onCancel={handleOnCancel} note={note} />);
        const textarea = await waitFor(()=> getNoteTextArea())
        await user.clear(textarea);
        await user.type(textarea, noteText);
        // Assert
        await waitFor(() => {
            const textCounter = getTextCountElement();
            expect(textCounter.textContent).toMatch(counterValue);
        });
    });

    test(`Verify max length and warning message for note input`, async () => {
        //Arrange
        mockWindowFunctions();
        const note = '';
        const noteText = "Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note text!Some note1";
        const counterValue = "400 / 400";
        const warningMsg = "You have reached the maximum character limit.";
        const handleOnSave = (e) => {feedback = e;};
        const handleOnCancel = jest.fn();
        const user = userEvent.setup({ delay: null });
        //Act
        render(<Note onSave={handleOnSave} onCancel={handleOnCancel} note={note} />);
        const textarea = await waitFor(()=> getNoteTextArea())
        await user.clear(textarea);
        await user.type(textarea, noteText);
        // Assert
        await waitFor(() => {
            const textCounter = getTextCountWarningElement();
            expect(textCounter.textContent).toMatch(counterValue);
            expect(textCounter.textContent).toMatch(warningMsg);
        });
    });

    test(`Verify Note component default text`, async () => {
        // Arrange
        mockWindowFunctions();
        const noteDefaultMsg = "Enter a note.";
        const note = '';
        const counterValue = "0 / 400";
        const handleOnSave = jest.fn();
        const handleOnCancel = jest.fn();
        // Act  
        render(<Note onSave={handleOnSave} onCancel={handleOnCancel} note={note} />);
        const textArea = await waitFor(() =>  getNoteTextArea());
        const textCounter = await waitFor(() =>  getTextCountElement());
        // Assert
        expect(textArea).toHaveProperty("placeholder", noteDefaultMsg);
        expect(textCounter.textContent).toMatch(counterValue);
        });

    test(`Verify save button enabled and cancel button is enabled where we create new note`, async () => {
        // Arrange
        mockWindowFunctions();
        const newNoteText = 'New note.';
        const handleOnSave = (e) => {feedback = e;};
        const handleOnCancel = jest.fn();
        const user = userEvent.setup({ delay: null });
        // Act 
        render(<Note onSave={handleOnSave} onCancel={handleOnCancel} note={''} />);
        const textarea = await waitFor(() => getNoteTextArea());
        await user.type(textarea, newNoteText);
        const saveButton = await waitFor(() => getNoteSaveButton());
        const cancelButton = await waitFor(() => getNoteCancelButton());
        // Assert 
        expect(saveButton).not.toBeDisabled();
        expect(cancelButton).not.toBeDisabled();
    });

    test(`Verify save button disabled and cancel button is enabled where we open new note`, async () => {
        // Arrange
        mockWindowFunctions();
        const handleOnSave = (e) => {feedback = e;};
        const handleOnCancel = jest.fn();
        // Act 
        render(<Note onSave={handleOnSave} onCancel={handleOnCancel} note={''} />);
        const saveButton = await waitFor(() => getNoteSaveButton());
        const cancelButton = await waitFor(() => getNoteCancelButton());
        // Assert 
        expect(saveButton).toBeDisabled();
        expect(cancelButton).not.toBeDisabled();
    });
});


function mockWindowFunctions() {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), 
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  }

function getNoteSaveButton() {
    return document.querySelector(".note-save-button");
}
function getNoteCancelButton() {
    return document.querySelector(".note-cancel-button");
}
function getTextCountElement() {
    return document.querySelector(".note-text-counter");
  }

function getTextCountWarningElement() {
    return document.querySelector(".note-warning-msg");
  }

function getNoteTextArea() {
    return document.querySelector(".note-text-area");
}