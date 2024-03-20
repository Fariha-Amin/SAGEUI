import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import store from '../store/store.js';
import { Provider ,useSelector } from 'react-redux';
import ViewAllSummariesButton from '../components/ViewAllSummariesButton.jsx';


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));


test('Verify Bulk View/Collapse button text change on click', async () => {

  useSelector.mockReturnValue(false);

  
  render(
    <Provider store={store}>
      <ViewAllSummariesButton />
    </Provider>
  );

 
  expect(screen.getByText('View all summaries')).toBeInTheDocument();


  useSelector.mockReturnValue(true);


  render(
    <Provider store={store}>
      <ViewAllSummariesButton />
    </Provider>
  );

 
  expect(screen.getByText('Collapse all summaries')).toBeInTheDocument();

         
      
    });