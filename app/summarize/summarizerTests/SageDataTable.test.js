import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import SageDataTable from '../../../libs/shared/data-grid/SageDataTable'; 
import { Column } from 'primereact/column';
import store from '../store/store';
import { Provider } from 'react-redux';
import { toBeInTheDocument,findByText } from '@testing-library/jest-dom';


const mockedApiResponse = {
  totalRecords: 10,
  data: [
    {
      "recId": 203,
      "summaryGeneratedOn": "2012/02/03 01:14 PM",
      "user": "mlabrum5m",
      "documentId": "TQ-5041bxv2",
      "summary": "Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
      "notes": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. N",
      "favorite": true,
      "inprogress": false
  },
  {
      "recId": 117,
      "summaryGeneratedOn": "2011/11/29 01:07 PM",
      "user": "gpolo38",
      "documentId": "HW-40938qnq",
      "summary": "Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.",
      "notes": "",
      "favorite": true,
      "inprogress": false
  },
  {
      "recId": 116,
      "summaryGeneratedOn": "2011/10/07 11:09 PM",
      "user": "sduddy37",
      "documentId": "GN-7669ipek",
      "summary": "Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.",
      "notes": "",
      "favorite": false,
      "inprogress": false
  },
  {
      "recId": 129,
      "summaryGeneratedOn": "2011/10/07 05:41 AM",
      "user": "blivesley3k",
      "documentId": "ON-0075c0bp",
      "summary": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.",
      "notes": "",
      "favorite": false,
      "inprogress": false
  },
  ],
};

describe('SageDataTable Component', () => {

  it('renders with correct column headers', async () => {

    // Mock for all the props and props children for SageDataTable
    const mockProps = {
      dataKey: 'recId',
      loginUserEmail: 'test@example.com',
      defaultSortField: 'summaryGeneratedOn',
      defaultSortOrder: -1,
      onCellClickHandler: jest.fn(),
      onTableDataUpdateHandler: jest.fn(),
      expandedRowsTemplateHandler: jest.fn(),
      dataUrl: 'mockURL',
      lazy: true, 
    };


    const columnHeaders = [
      <Column key="1" field="ViewDoc" header="View Doc" />,
      <Column key="2" field="summaryGeneratedOn" header="Date/Time" />,
      <Column key="3" field="user" header="User" />,
      <Column key="4" field="documentId" header="DocId (Fed to AI)" />,
      <Column key="5" field="Summary" header="Summary" />,
      <Column key="6" field="notes" header="Notes" />,
      <Column key="7" field="Actions" header="" />,

    ];

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockedApiResponse),
    });

    await waitFor(async () => {
      render(
        <Provider store={store}>
          <SageDataTable {...mockProps}>{columnHeaders}</SageDataTable>
        </Provider>
      );
    });

    const columnHeaderElements = screen.getAllByRole('columnheader');

    const expectedHeaders = [
      '',
      'View Doc',
      'Date/Time',
      'User',
      'DocId (Fed to AI)',
      'Summary',
      'Notes',
      ""
    ];
    
    columnHeaderElements.forEach((columnHeader, index) => {

      
      const headerText = columnHeader.textContent.trim();
      // console.log("column: "+index+headerText)

      if (headerText !== '') {
        expect(headerText).toEqual(expectedHeaders[index]);
      }
    });


  });
});
