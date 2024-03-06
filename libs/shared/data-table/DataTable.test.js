import React from 'react';
import '@testing-library/jest-dom'
import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import DataTable from './DataTable';
import DataColumn from './DataColumn';

describe("DataTable UI", () => {
    describe("Default", () => {
        test('renders expected message when no data loaded', async () => {
            // Arrange
            const testData = [];
            const expectedText = "Your query returned no data";

            // Act
            render((
                <DataTable id="testTable" value={testData}>
                    <DataColumn field="field1" />
                    <DataColumn field="field2" />
                    <DataColumn field="field3" />
                </DataTable>
            ));
            const element = await screen.findByText(expectedText);

            // Assert
            expect(element).not.toBeNull();
            expect(element).toBeDefined();
        });

        test('renders expected number of rows', async () => {
            // Arrange
            const testData = [
                { field1: 1, field2: "a", field3: "I" },
                { field1: 2, field2: "b", field3: "II" },
                { field1: 3, field2: "c", field3: "III" },
                { field1: 4, field2: "d", field3: "IV" },
                { field1: 5, field2: "e", field3: "V" }
            ];
            const headerRowCount = 1;
            const bodyRowCount = 5;
            const expectedRowCount = headerRowCount + bodyRowCount;

            // Act
            render((
                <DataTable id="testTable" value={testData}>
                    <DataColumn field="field1" />
                    <DataColumn field="field2" />
                    <DataColumn field="field3" />
                </DataTable>
            ));
            const elements = document.querySelectorAll("tr");

            // Assert
            expect(elements.length).toBe(expectedRowCount);
        });

        test('renders expected number of columns', async () => {
            // Arrange
            const testData = [
                { field1: 1, field2: "a", field3: "I" },
                { field1: 2, field2: "b", field3: "II" },
                { field1: 3, field2: "c", field3: "III" },
                { field1: 4, field2: "d", field3: "IV" },
                { field1: 5, field2: "e", field3: "V" }
            ];
            const expectedColumnCount = 3;

            // Act
            render((
                <DataTable id="testTable" value={testData}>
                    <DataColumn field="field1" />
                    <DataColumn field="field2" />
                    <DataColumn field="field3" />
                </DataTable>
            ));
            const elements = document.querySelectorAll("th");

            // Assert
            expect(elements.length).toBe(expectedColumnCount);
        });
    });
});

describe("DataTable UX", () => {
    describe("Sort", () => {
        test('sortable column fires onSort event', async () => {
            // Arrange
            const handleOnSort = jest.fn();
            const testData = [
                { field1: 1, field2: "a", field3: "I" },
                { field1: 2, field2: "b", field3: "II" },
                { field1: 3, field2: "c", field3: "III" }
            ];

            // Act
            render((
                <DataTable id="testTable" value={testData} onSort={handleOnSort}>
                    <DataColumn headerClassName="column1" field="field1" sortable />
                    <DataColumn headerClassName="column2" field="field2" sortable />
                    <DataColumn headerClassName="column3" field="field3" sortable />
                </DataTable>
            ));

            const th = document.querySelector(".column1");
            await userEvent.click(th);

            // Assert
            expect(handleOnSort).toHaveBeenCalled();
            expect(handleOnSort).toHaveBeenCalledTimes(1);
        });

        test('static column does not fire onSort event', async () => {
            // Arrange
            const handleOnSort = jest.fn();
            const testData = [
                { field1: 1, field2: "a", field3: "I" },
                { field1: 2, field2: "b", field3: "II" },
                { field1: 3, field2: "c", field3: "III" }
            ];

            // Act
            render((
                <DataTable id="testTable" value={testData} onSort={handleOnSort}>
                    <DataColumn headerClassName="column1" field="field1" />
                    <DataColumn headerClassName="column2" field="field2" />
                    <DataColumn headerClassName="column3" field="field3" />
                </DataTable>
            ));

            const th = document.querySelector(".column1");
            await userEvent.click(th);

            // Assert
            expect(handleOnSort).not.toHaveBeenCalled();
        });

        test('sort ascending - default order - works as expected', async () => {
            // Arrange
            const handleOnSort = jest.fn();
            const testData = [
                { field1: 1, field2: "a", field3: "I" },
                { field1: 2, field2: "b", field3: "II" },
                { field1: 3, field2: "c", field3: "III" }
            ];

            // Act
            render((
                <DataTable id="testTable" value={testData} onSort={handleOnSort}>
                    <DataColumn headerClassName="column1" field="field1" sortable sortOrder={1} />
                    <DataColumn headerClassName="column2" field="field2" />
                    <DataColumn headerClassName="column3" field="field3" />
                </DataTable>
            ));

            const rows = document.querySelectorAll("tr");
            const row1 = rows[1];
            const row1column1 = row1.querySelectorAll("td")[0];
            const row2 = rows[2];
            const row2column1 = row2.querySelectorAll("td")[0];
            const row3 = rows[3];
            const row3column1 = row3.querySelectorAll("td")[0];

            // Assert
            expect(row1column1.innerHTML).toBe("1");
            expect(row2column1.innerHTML).toBe("2");
            expect(row3column1.innerHTML).toBe("3");
        });

        test('sort ascending - on click - works as expected', async () => {
            // Arrange
            const handleOnSort = jest.fn();
            const testData = [
                { field1: 1, field2: "a", field3: "I" },
                { field1: 2, field2: "b", field3: "II" },
                { field1: 3, field2: "c", field3: "III" }
            ];

            // Act
            render((
                <DataTable id="testTable" value={testData} onSort={handleOnSort}>
                    <DataColumn headerClassName="column1" field="field1" sortable sortOrder={0} />
                    <DataColumn headerClassName="column2" field="field2" />
                    <DataColumn headerClassName="column3" field="field3" />
                </DataTable>
            ));

            // Click the column ONCE to sort ASCENDING
            const th = document.querySelector(".column1");
            await userEvent.click(th);

            const rows = document.querySelectorAll("tr");
            const row1 = rows[1];
            const row1column1 = row1.querySelectorAll("td")[0];
            const row2 = rows[2];
            const row2column1 = row2.querySelectorAll("td")[0];
            const row3 = rows[3];
            const row3column1 = row3.querySelectorAll("td")[0];

            // Assert
            expect(row1column1.innerHTML).toBe("1");
            expect(row2column1.innerHTML).toBe("2");
            expect(row3column1.innerHTML).toBe("3");
        });

        test('sort descending - default order - works as expected', async () => {
            // Arrange
            const handleOnSort = jest.fn();
            const testData = [
                { field1: 1, field2: "a", field3: "I" },
                { field1: 2, field2: "b", field3: "II" },
                { field1: 3, field2: "c", field3: "III" }
            ];

            // Act
            render((
                <DataTable id="testTable" value={testData} onSort={handleOnSort}>
                    <DataColumn headerClassName="column1" field="field1" sortable sortOrder={-1} />
                    <DataColumn headerClassName="column2" field="field2" />
                    <DataColumn headerClassName="column3" field="field3" />
                </DataTable>
            ));
            
            const rows = document.querySelectorAll("tr");
            const row1 = rows[1];
            const row1column1 = row1.querySelectorAll("td")[0];
            const row2 = rows[2];
            const row2column1 = row2.querySelectorAll("td")[0];
            const row3 = rows[3];
            const row3column1 = row3.querySelectorAll("td")[0];

            // Assert
            expect(row1column1.innerHTML).toBe("3");
            expect(row2column1.innerHTML).toBe("2");
            expect(row3column1.innerHTML).toBe("1");
        });

        test('sort descending - on click - works as expected', async () => {
            // Arrange
            const handleOnSort = jest.fn();
            const testData = [
                { field1: 1, field2: "a", field3: "I" },
                { field1: 2, field2: "b", field3: "II" },
                { field1: 3, field2: "c", field3: "III" }
            ];

            // Act
            render((
                <DataTable id="testTable" value={testData} onSort={handleOnSort}>
                    <DataColumn headerClassName="column1" field="field1" sortable sortOrder={0} />
                    <DataColumn headerClassName="column2" field="field2" />
                    <DataColumn headerClassName="column3" field="field3" />
                </DataTable>
            ));

            // Click the column TWICE to sort DESCENDING
            const th = document.querySelector(".column1");
            await userEvent.click(th);
            await userEvent.click(th);

            const rows = document.querySelectorAll("tr");
            const row1 = rows[1];
            const row1column1 = row1.querySelectorAll("td")[0];
            const row2 = rows[2];
            const row2column1 = row2.querySelectorAll("td")[0];
            const row3 = rows[3];
            const row3column1 = row3.querySelectorAll("td")[0];

            // Assert
            expect(row1column1.innerHTML).toBe("3");
            expect(row2column1.innerHTML).toBe("2");
            expect(row3column1.innerHTML).toBe("1");
        });
    });
});
