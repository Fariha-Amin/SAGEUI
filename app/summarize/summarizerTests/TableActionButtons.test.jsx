import React from 'react';
import { screen, render, fireEvent,getByRole } from '@testing-library/react';
import TableActionButtons from '../components/TableActionButtons';
import { toBeInTheDocument,toHaveBeenCalled,toHaveAttribute } from '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import NotesModal from '../../../libs/shared/data-grid/modals/NotesModal';

jest.mock('../components/TableActionButton', () => ({ children, onClickHandler, ...rest }) => {

  const buttonContent = rest.rowData && rest.rowData.notes ? children || rest.children : null;

  return (
    <button onClick={onClickHandler} {...rest}>
      {buttonContent}
    </button>
  );
});

jest.mock('../../../libs/shared/data-grid/modals/NotesModal', () => ({ visible, ...rest }) => {
  return visible ? <div data-testid="notes-modal">Notes Modal</div> : null;
});
const onNoteClick = jest.fn();

describe('TableActionButtons', () => {
  it('renders TableActionButtons component', async () => {
    const rowData = {
      recId: 1,
      notes: '', // Provide some notes here if needed
      favorite: false,
      inprogress: false
    };

    const noteClickHandler = jest.fn();
    const favouriteClickHandler = jest.fn();
    const deleteClickHandler = jest.fn();
    const loginUserEmail = 'test@example.com';

    
    const {container} = render(
      <TableActionButtons
        rowData={rowData}
        noteClickHandler={noteClickHandler}
        favouriteClickHandler={favouriteClickHandler}
        deleteClickHandler={deleteClickHandler}
        loginUserEmail={loginUserEmail}
      >

      </TableActionButtons>
    );

    
    const tableActionButtons = screen.getAllByRole('button');
    const notesButton = tableActionButtons[0];

    expect(notesButton).toBeInTheDocument();
    expect(notesButton).toHaveAttribute('name', 'notes-button');

    await user.click(notesButton);


    const notesModal = screen.getByTestId('notes-modal');
    expect(notesModal).toBeInTheDocument();


    const favoriteButton = tableActionButtons[1];
    expect(favoriteButton).toHaveAttribute('id', expect.stringContaining('favorite'));
    await user.click(favoriteButton);
    //verify favorite set to true or false

    const deleteButton = tableActionButtons[2];
    expect(deleteButton).toHaveAttribute('name', 'delete-button');

    console.log(container.innerHTML)
 

    
  });
});
