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

    describe("Select", () => {
        describe("Default Selector", () => {
            test('checkbox fires onSelectionChange event', async () => {
                // Arrange
                const handleOnSelectionChange = jest.fn();
                const testData = [
                    { field1: 1, field2: "a", field3: "I" },
                    { field1: 2, field2: "b", field3: "II" },
                    { field1: 3, field2: "c", field3: "III" }
                ];

                // Act
                render((
                    <DataTable id="testTable" dataKey="field1" value={testData} selectable onSelectionChange={handleOnSelectionChange}>
                        <DataColumn headerClassName="column1" selector />
                        <DataColumn headerClassName="column2" field="field1" />
                        <DataColumn headerClassName="column3" field="field2" />
                        <DataColumn headerClassName="column4" field="field3" />
                    </DataTable>
                ));

                // Click the checkbox in the second row
                const tableRow = document.querySelectorAll("tr");
                const secondRow = tableRow[2];
                const checkbox = secondRow.querySelector('.p-checkbox-box');
                await userEvent.click(checkbox);

                // Assert
                expect(handleOnSelectionChange).toHaveBeenCalled();
                expect(handleOnSelectionChange).toHaveBeenCalledTimes(1);
            });

            test('default selection works as expected', () => {
                // Arrange
                const testData = [
                    { field1: 1, field2: "a", field3: "I" },
                    { field1: 2, field2: "b", field3: "II" },
                    { field1: 3, field2: "c", field3: "III" }
                ];

                // Set the second row as selected
                const selectedRows = [
                    { field1: 2 }
                ];

                // Act
                render((
                    <DataTable id="testTable" dataKey="field1" value={testData} selectable selectedRows={selectedRows}>
                        <DataColumn headerClassName="column1" selector />
                        <DataColumn headerClassName="column2" field="field1" />
                        <DataColumn headerClassName="column3" field="field2" />
                        <DataColumn headerClassName="column4" field="field3" />
                    </DataTable>
                ));

                const rows = document.querySelectorAll("tr");
                const row1 = rows[1];
                const row1column1 = row1.querySelector('.p-checkbox-box[aria-checked="true"]');
                const row2 = rows[2];
                const row2column1 = row2.querySelector('.p-checkbox-box[aria-checked="true"]');
                const row3 = rows[3];
                const row3column1 = row3.querySelector('.p-checkbox-box[aria-checked="true"]');

                // Assert
                expect(row1column1).toBeNull();
                expect(row2column1).not.toBeNull();
                expect(row3column1).toBeNull();
            });

            test('onClick selection works as expected', async () => {
                // Arrange
                const testData = [
                    { field1: 1, field2: "a", field3: "I" },
                    { field1: 2, field2: "b", field3: "II" },
                    { field1: 3, field2: "c", field3: "III" }
                ];

                // Act
                render((
                    <DataTable id="testTable" dataKey="field1" value={testData} selectable>
                        <DataColumn headerClassName="column1" selector />
                        <DataColumn headerClassName="column2" field="field1" />
                        <DataColumn headerClassName="column3" field="field2" />
                        <DataColumn headerClassName="column4" field="field3" />
                    </DataTable>
                ));

                // Click the checkbox in the second row
                const tableRow = document.querySelectorAll("tr");
                const secondRow = tableRow[2];
                const checkbox = secondRow.querySelector('.p-checkbox-box');
                await userEvent.click(checkbox);

                const rows = document.querySelectorAll("tr");
                const row1 = rows[1];
                const row1column1 = row1.querySelector('.p-checkbox-box[aria-checked="true"]');
                const row2 = rows[2];
                const row2column1 = row2.querySelector('.p-checkbox-box[aria-checked="true"]');
                const row3 = rows[3];
                const row3column1 = row3.querySelector('.p-checkbox-box[aria-checked="true"]');

                // Assert
                expect(row1column1).toBeNull();
                expect(row2column1).not.toBeNull();
                expect(row3column1).toBeNull();
            });

            test('"multiple" selection renders checkboxes', () => {
                // Arrange
                const testData = [
                    { field1: 1, field2: "a", field3: "I" },
                    { field1: 2, field2: "b", field3: "II" },
                    { field1: 3, field2: "c", field3: "III" }
                ];

                // Act
                render((
                    <DataTable id="testTable" dataKey="field1" value={testData} selectable selectionType="multiple">
                        <DataColumn headerClassName="column1" selector />
                        <DataColumn headerClassName="column2" field="field1" />
                        <DataColumn headerClassName="column3" field="field2" />
                        <DataColumn headerClassName="column4" field="field3" />
                    </DataTable>
                ));

                const radioButtons = document.querySelectorAll(".p-radiobutton-box");
                const checkboxes = document.querySelectorAll(".p-checkbox-box");

                // Assert
                expect(radioButtons).toHaveLength(0);
                expect(checkboxes).not.toBeNull();
            });

            test('"single" selection renders radio buttons', () => {
                // Arrange
                const testData = [
                    { field1: 1, field2: "a", field3: "I" },
                    { field1: 2, field2: "b", field3: "II" },
                    { field1: 3, field2: "c", field3: "III" }
                ];

                // Act
                render((
                    <DataTable id="testTable" dataKey="field1" value={testData} selectable selectionType="single">
                        <DataColumn headerClassName="column1" selector />
                        <DataColumn headerClassName="column2" field="field1" />
                        <DataColumn headerClassName="column3" field="field2" />
                        <DataColumn headerClassName="column4" field="field3" />
                    </DataTable>
                ));

                const radioButtons = document.querySelectorAll(".p-radiobutton-box");
                const checkboxes = document.querySelectorAll(".p-checkbox-box");

                // Assert
                expect(radioButtons).not.toBeNull();
                expect(checkboxes).toHaveLength(0);
            });
        });

        describe("Custom Selector", () => {
            test('button fires onSelectionChange event', async () => {
                // Arrange
                const handleOnSelectionChange = jest.fn();
                const bodyTemplate = (row) => {
                    const buttonId = `test-toggle-button-${row.field1}`;
                    return (<button id={buttonId} onClick={row.toggleRowSelection}>Test</button>);
                };
                const testData = [
                    { field1: 1, field2: "a", field3: "I" },
                    { field1: 2, field2: "b", field3: "II" },
                    { field1: 3, field2: "c", field3: "III" }
                ];

                // Act
                render((
                    <DataTable id="testTable" dataKey="field1" value={testData} selectable onSelectionChange={handleOnSelectionChange}>
                        <DataColumn headerClassName="column1" body={bodyTemplate} />
                        <DataColumn headerClassName="column2" field="field1" />
                        <DataColumn headerClassName="column3" field="field2" />
                        <DataColumn headerClassName="column4" field="field3" />
                    </DataTable>
                ));

                // Click the button in the second row
                const button = document.querySelector("#test-toggle-button-2");
                await userEvent.click(button);

                // Assert
                expect(handleOnSelectionChange).toHaveBeenCalled();
                expect(handleOnSelectionChange).toHaveBeenCalledTimes(1);
            });

            test('default selection works as expected', () => {
                // Arrange
                const bodyTemplate = (row) => {
                    const buttonId = `test-toggle-button-${row.field1}`;
                    return (<button id={buttonId} onClick={row.toggleRowSelection}>Test</button>);
                };
                const testData = [
                    { field1: 1, field2: "a", field3: "I" },
                    { field1: 2, field2: "b", field3: "II" },
                    { field1: 3, field2: "c", field3: "III" }
                ];

                // Set the second row as selected
                const selectedRows = [
                    { field1: 2 }
                ];

                // Act
                render((
                    <DataTable id="testTable" dataKey="field1" value={testData} selectable selectedRows={selectedRows}>
                        <DataColumn headerClassName="column1" body={bodyTemplate} />
                        <DataColumn headerClassName="column2" field="field1" />
                        <DataColumn headerClassName="column3" field="field2" />
                        <DataColumn headerClassName="column4" field="field3" />
                    </DataTable>
                ));

                const rows = document.querySelectorAll("tr");

                // Assert
                expect(rows[1].getAttribute("aria-selected")).toBe("false");
                expect(rows[2].getAttribute("aria-selected")).toBe("true");
                expect(rows[3].getAttribute("aria-selected")).toBe("false");
            });

            test('onClick selection works as expected', async () => {
                // Arrange
                const bodyTemplate = (row) => {
                    const buttonId = `test-toggle-button-${row.field1}`;
                    return (<button id={buttonId} onClick={row.toggleRowSelection}>Test</button>);
                };
                const testData = [
                    { field1: 1, field2: "a", field3: "I" },
                    { field1: 2, field2: "b", field3: "II" },
                    { field1: 3, field2: "c", field3: "III" }
                ];

                // Act
                render((
                    <DataTable id="testTable" dataKey="field1" value={testData} selectable>
                        <DataColumn headerClassName="column1" body={bodyTemplate} />
                        <DataColumn headerClassName="column2" field="field1" />
                        <DataColumn headerClassName="column3" field="field2" />
                        <DataColumn headerClassName="column4" field="field3" />
                    </DataTable>
                ));

                // Click the button in the second row
                const button = document.querySelector("#test-toggle-button-2");
                await userEvent.click(button);

                const rows = document.querySelectorAll("tr");

                // Assert
                expect(rows[1].getAttribute("aria-selected")).toBe("false");
                expect(rows[2].getAttribute("aria-selected")).toBe("true");
                expect(rows[3].getAttribute("aria-selected")).toBe("false");
            });

            test('all callback events are triggered on selection change', async () => {
                // Arrange
                const handleOnSelected = jest.fn();
                const handleOnUnselected = jest.fn();
                const bodyTemplate = (row) => {
                    const selectId = `test-select-button-${row.field1}`;
                    const select = (e) => { row.selectRow(e, handleOnSelected); }
                    const unselectId = `test-unselect-button-${row.field1}`;
                    const unselect = (e) => { row.unselectRow(e, handleOnUnselected); }
                    return (
                        <>
                            <button id={selectId} onClick={select}>Select</button>
                            <button id={unselectId} onClick={unselect}>Unselect</button>
                        </>);
                };
                const testData = [
                    { field1: 1, field2: "a", field3: "I" },
                    { field1: 2, field2: "b", field3: "II" },
                    { field1: 3, field2: "c", field3: "III" }
                ];

                // Act
                render((
                    <DataTable id="testTable" dataKey="field1" value={testData} selectable>
                        <DataColumn headerClassName="column1" body={bodyTemplate} />
                        <DataColumn headerClassName="column2" field="field1" />
                        <DataColumn headerClassName="column3" field="field2" />
                        <DataColumn headerClassName="column4" field="field3" />
                    </DataTable>
                ));

                // Click the buttons in the second row
                const selectButton = document.querySelector("#test-select-button-2");
                await userEvent.click(selectButton);
                const unselectButton = document.querySelector("#test-unselect-button-2");
                await userEvent.click(unselectButton);

                // Assert
                expect(handleOnSelected).toHaveBeenCalled();
                expect(handleOnSelected).toHaveBeenCalledTimes(1);
                expect(handleOnUnselected).toHaveBeenCalled();
                expect(handleOnUnselected).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe("Expand", () => {
        describe("Default Expander", () => {
            test('expand fires onExpansionChange event', async () => {
                // Arrange
                const handleOnExpansionChange = jest.fn();
                const testData = [
                    { field1: 1, field2: "a", field3: "I" },
                    { field1: 2, field2: "b", field3: "II" },
                    { field1: 3, field2: "c", field3: "III" }
                ];

                // Act
                render((
                    <DataTable id="testTable" dataKey="field1" value={testData} expandable onExpansionChange={handleOnExpansionChange}>
                        <DataColumn headerClassName="column1" expander />
                        <DataColumn headerClassName="column2" field="field1" />
                        <DataColumn headerClassName="column3" field="field2" />
                        <DataColumn headerClassName="column4" field="field3" />
                    </DataTable>
                ));

                // Click an expander once to expand
                const button = document.querySelector("button.p-row-toggler");
                await userEvent.click(button);

                // Assert
                expect(handleOnExpansionChange).toHaveBeenCalled();
                expect(handleOnExpansionChange).toHaveBeenCalledTimes(1);
            });

            test('default expansion works as expected', () => {
                // Arrange
                const rowExpandedTemplate = (row) => {
                    return (<p>{row.description}</p>);
                };
                const testData = [
                    { field1: 1, field2: "a", field3: "I", description: "Hello, world!" },
                    { field1: 2, field2: "b", field3: "II", description: "Lorem ipsum" },
                    { field1: 3, field2: "c", field3: "III", description: "foo bar baz" }
                ];

                // Set the second row as expanded
                const expandedRows = [
                    testData[1]
                ];

                // Act
                render((
                    <DataTable id="testTable" dataKey="field1" value={testData} expandable expandedRows={expandedRows} rowExpandedTemplate={rowExpandedTemplate}>
                        <DataColumn headerClassName="column1" expander />
                        <DataColumn headerClassName="column2" field="field1" />
                        <DataColumn headerClassName="column3" field="field2" />
                        <DataColumn headerClassName="column4" field="field3" />
                    </DataTable>
                ));

                const row1 = screen.queryByText(testData[0].description);
                const row2 = screen.queryByText(testData[1].description);
                const row3 = screen.queryByText(testData[2].description);

                // Assert
                expect(row1).toBeNull();
                expect(row2).not.toBeNull();
                expect(row3).toBeNull();
            });

            test('onClick expansion works as expected', async () => {
                // Arrange
                const rowExpandedTemplate = (row) => {
                    return (<p>{row.description}</p>);
                };
                const testData = [
                    { field1: 1, field2: "a", field3: "I", description: "Hello, world!" },
                    { field1: 2, field2: "b", field3: "II", description: "Lorem ipsum" },
                    { field1: 3, field2: "c", field3: "III", description: "foo bar baz" }
                ];

                // Act
                render((
                    <DataTable id="testTable" dataKey="field1" value={testData} expandable rowExpandedTemplate={rowExpandedTemplate}>
                        <DataColumn headerClassName="column1" expander />
                        <DataColumn headerClassName="column2" field="field1" />
                        <DataColumn headerClassName="column3" field="field2" />
                        <DataColumn headerClassName="column4" field="field3" />
                    </DataTable>
                ));

                // Click the checkbox in the second row
                const buttons = document.querySelectorAll("button.p-row-toggler");
                const secondRowButton = buttons[1];
                await userEvent.click(secondRowButton);

                const row1 = screen.queryByText(testData[0].description);
                const row2 = screen.queryByText(testData[1].description);
                const row3 = screen.queryByText(testData[2].description);

                // Assert
                expect(row1).toBeNull();
                expect(row2).not.toBeNull();
                expect(row3).toBeNull();
            });
        });

        describe("Custom Expander", () => {
            test('button fires onExpansionChange event', async () => {
                // Arrange
                const handleOnExpansionChange = jest.fn();
                const bodyTemplate = (row) => {
                    const buttonId = `test-toggle-button-${row.field1}`;
                    return (<button id={buttonId} onClick={row.toggleRowExpansion}>Test</button>);
                };
                const testData = [
                    { field1: 1, field2: "a", field3: "I", description: "Hello, world!" },
                    { field1: 2, field2: "b", field3: "II", description: "Lorem ipsum" },
                    { field1: 3, field2: "c", field3: "III", description: "foo bar baz" }
                ];

                // Act
                render((
                    <DataTable id="testTable" dataKey="field1" value={testData} expandable onExpansionChange={handleOnExpansionChange}>
                        <DataColumn headerClassName="column1" body={bodyTemplate} />
                        <DataColumn headerClassName="column2" field="field1" />
                        <DataColumn headerClassName="column3" field="field2" />
                        <DataColumn headerClassName="column4" field="field3" />
                    </DataTable>
                ));

                // Click the button in the second row
                const button = document.querySelector("#test-toggle-button-2");
                await userEvent.click(button);

                // Assert
                expect(handleOnExpansionChange).toHaveBeenCalled();
                expect(handleOnExpansionChange).toHaveBeenCalledTimes(1);
            });

            test('default expansion works as expected', () => {
                // Arrange
                const rowExpandedTemplate = (row) => {
                    return (<p>{row.description}</p>);
                };
                const bodyTemplate = (row) => {
                    const buttonId = `test-toggle-button-${row.field1}`;
                    return (<button id={buttonId} onClick={row.toggleRowExpansion}>Test</button>);
                };
                const testData = [
                    { field1: 1, field2: "a", field3: "I", description: "Hello, world!" },
                    { field1: 2, field2: "b", field3: "II", description: "Lorem ipsum" },
                    { field1: 3, field2: "c", field3: "III", description: "foo bar baz" }
                ];

                // Set the second row as expanded
                const expandedRows = [
                    testData[1]
                ];

                // Act
                render((
                    <DataTable id="testTable" dataKey="field1" value={testData} expandable expandedRows={expandedRows} rowExpandedTemplate={rowExpandedTemplate}>
                        <DataColumn headerClassName="column1" body={bodyTemplate} />
                        <DataColumn headerClassName="column2" field="field1" />
                        <DataColumn headerClassName="column3" field="field2" />
                        <DataColumn headerClassName="column4" field="field3" />
                    </DataTable>
                ));

                const row1 = screen.queryByText(testData[0].description);
                const row2 = screen.queryByText(testData[1].description);
                const row3 = screen.queryByText(testData[2].description);

                // Assert
                expect(row1).toBeNull();
                expect(row2).not.toBeNull();
                expect(row3).toBeNull();
            });

            test('onClick expansion works as expected', async () => {
                // Arrange
                const rowExpandedTemplate = (row) => {
                    return (<p>{row.description}</p>);
                };
                const bodyTemplate = (row) => {
                    const buttonId = `test-toggle-button-${row.field1}`;
                    return (<button id={buttonId} onClick={row.toggleRowExpansion}>Test</button>);
                };
                const testData = [
                    { field1: 1, field2: "a", field3: "I", description: "Hello, world!" },
                    { field1: 2, field2: "b", field3: "II", description: "Lorem ipsum" },
                    { field1: 3, field2: "c", field3: "III", description: "foo bar baz" }
                ];

                // Act
                render((
                    <DataTable id="testTable" dataKey="field1" value={testData} expandable rowExpandedTemplate={rowExpandedTemplate}>
                        <DataColumn headerClassName="column1" body={bodyTemplate} />
                        <DataColumn headerClassName="column2" field="field1" />
                        <DataColumn headerClassName="column3" field="field2" />
                        <DataColumn headerClassName="column4" field="field3" />
                    </DataTable>
                ));

                // Click the button in the second row
                const button = document.querySelector("#test-toggle-button-2");
                await userEvent.click(button);

                const row1 = screen.queryByText(testData[0].description);
                const row2 = screen.queryByText(testData[1].description);
                const row3 = screen.queryByText(testData[2].description);

                // Assert
                expect(row1).toBeNull();
                expect(row2).not.toBeNull();
                expect(row3).toBeNull();
            });

            test('all callback events are triggered on expansion change', async () => {
                // Arrange
                const handleOnExpanded = jest.fn();
                const handleOnCollapsed = jest.fn();
                const bodyTemplate = (row) => {
                    const expandId = `test-expand-button-${row.field1}`;
                    const expand = (e) => { row.expandRow(e, handleOnExpanded); }
                    const collapseId = `test-collapse-button-${row.field1}`;
                    const collapse = (e) => { row.collapseRow(e, handleOnCollapsed); }
                    return (
                        <>
                            <button id={expandId} onClick={expand}>Expand</button>
                            <button id={collapseId} onClick={collapse}>Collapse</button>
                        </>);
                };
                const testData = [
                    { field1: 1, field2: "a", field3: "I" },
                    { field1: 2, field2: "b", field3: "II" },
                    { field1: 3, field2: "c", field3: "III" }
                ];

                // Act
                render((
                    <DataTable id="testTable" dataKey="field1" value={testData} expandable>
                        <DataColumn headerClassName="column1" body={bodyTemplate} />
                        <DataColumn headerClassName="column2" field="field1" />
                        <DataColumn headerClassName="column3" field="field2" />
                        <DataColumn headerClassName="column4" field="field3" />
                    </DataTable>
                ));

                // Click the buttons in the second row
                const expandButton = document.querySelector("#test-expand-button-2");
                await userEvent.click(expandButton);
                const collapseButton = document.querySelector("#test-collapse-button-2");
                await userEvent.click(collapseButton);

                // Assert
                expect(handleOnExpanded).toHaveBeenCalled();
                expect(handleOnExpanded).toHaveBeenCalledTimes(1);
                expect(handleOnCollapsed).toHaveBeenCalled();
                expect(handleOnCollapsed).toHaveBeenCalledTimes(1);
            });
        });
    });
});
