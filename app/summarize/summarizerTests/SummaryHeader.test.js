// SummaryHeader.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import store from '../store/store.js';


// Import the mocked SVG components from the svgMock.js file
// import { MockedHelpIcon, MockedDownloadIcon, MockedHelpIconSm } from '../../../__mocks__/svgMock';
import SummaryHeader from '../views/home/components/SummaryHeader.jsx';
import { Provider } from 'react-redux';

// Mock the SVG imports
// jest.mock("../icons/help.svg", () => ({
//   React: jest.requireActual("react"),
//   default: () => <MockedHelpIcon />
// }));

// jest.mock("../icons/download.svg", () => ({
//   React: jest.requireActual("react"),
//   default: () => <MockedDownloadIcon />
// }));

// jest.mock("../icons/help_18.svg", () => ({
//   React: jest.requireActual("react"),
//   default: () => <MockedHelpIconSm />
// }));


test('Verify Page Title', async () => {

  const mockOnNewSummaryClick = jest.fn();


  render(
    <Provider store={store}>
      <SummaryHeader onNewSummaryClick={mockOnNewSummaryClick}/>
    </Provider>
  );

  const paragraphText = screen.getByText(/neXgenAI Summarize/i);
  expect(paragraphText).toBeInTheDocument();
});


test('Verify List of Summaries table header', async () => {

    const mockOnNewSummaryClick = jest.fn();
    render(
        <Provider store={store}>
          <SummaryHeader onNewSummaryClick={mockOnNewSummaryClick}/>
        </Provider>
      );

  const paragraphText = screen.getByText(/List of Summaries/i);
  expect(paragraphText).toBeInTheDocument();
  
});

test('Verify View All Summaries Button', async () => {

    const mockOnNewSummaryClick = jest.fn();
    render(
        <Provider store={store}>
          <SummaryHeader onNewSummaryClick={mockOnNewSummaryClick}/>
        </Provider>
      );

  const buttons = screen.getAllByRole("button");

  const viewAllSummariesButton = buttons.find(button =>
    button.textContent === "View all summaries"
  );

  expect(viewAllSummariesButton).toBeInTheDocument();
  
});

test('Verify Create New Summary Button', async () => {
  
    const mockOnNewSummaryClick = jest.fn();
    render(
        <Provider store={store}>
          <SummaryHeader onNewSummaryClick={mockOnNewSummaryClick}/>
        </Provider>
      );

  const buttons = screen.getAllByRole("button");

  const newSummaryButton = buttons.find(button =>
    button.textContent === "Create new summary"
  );

  expect(newSummaryButton).toBeInTheDocument();
  
});

test('Verify Action Dropdown', async () => {
  
    const mockOnNewSummaryClick = jest.fn();
    render(
        <Provider store={store}>
          <SummaryHeader onNewSummaryClick={mockOnNewSummaryClick}/>
        </Provider>
      );

  const dropdown = screen.getAllByRole("button");

  const actionDropdown = dropdown.find(button =>
    button.textContent === "Action"
  );

  expect(actionDropdown).toBeInTheDocument();
  
});


