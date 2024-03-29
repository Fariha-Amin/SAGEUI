import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor, act, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ChatPrompt from './ChatPrompt';
import sageClient from "_investigate/httpClient";

jest.mock("_investigate/httpClient");

describe("ChatPrompt default state", () => {
    test("renders empty textarea", async () => {
        // Arrange
        mockWindowFunctions();
        const handleOnQuery = jest.fn();

        // Act
        act(() => render(<ChatPrompt loading={false} onQuery={handleOnQuery} />));
        const textarea = await waitFor(() => getTextAreaElement());

        // Assert
        expect(textarea).toHaveValue("");
    });

    test("RPMXCON-84270 - AI Investigate : Verify the presence of input box with place holder in AI Investigate page.", async () => {
        // Arrange
        mockWindowFunctions();
        const handleOnQuery = jest.fn();
        const placeholderText = `Ask your question here, such as "How did Enron manipulate its financial statements, and what were the consequences?"`;

        // Act
        act(() => render(<ChatPrompt loading={false} onQuery={handleOnQuery} />));
        const textarea = await waitFor(() => getTextAreaElement());

        // Assert
        expect(textarea).toHaveProperty("placeholder", placeholderText);
    });

    test("RPMXCON-84272 renders correct text count", async () => {
        // Arrange
        mockWindowFunctions();
        const handleOnQuery = jest.fn();
        const countValue = "0 / 2000";

        // Act
        act(() => render(<ChatPrompt loading={false} onQuery={handleOnQuery} />));
        const textCounter = await waitFor(() => getTextCountElement());

        // Assert
        expect(textCounter.textContent).toMatch(countValue);
    });

    test("renders disabled button", async () => {
        // Arrange
        mockWindowFunctions();
        const handleOnQuery = jest.fn();

        // Act
        act(() => render(<ChatPrompt loading={false} onQuery={handleOnQuery} />));
        const button = await waitFor(() => getButtonElement());

        // Assert
        expect(button).toBeDisabled();
    });

    test("RPMXCON-84314 renders disabled button with zero docs", async () => {
        // Arrange
        mockWindowFunctions();
        const handleOnQuery = jest.fn();

        // Act
        act(() => render(<ChatPrompt loading={false} onQuery={handleOnQuery} docCount={0} />));
        const button = await waitFor(() => getButtonElement());

        // Assert
        expect(button).toBeDisabled();
    });

    test(`RPMXCON-84274 AI Investigate : Verify the presence of "Run" button in the home page of AI Investigate`, async () => {
        // Arrange
        mockWindowFunctions();
        const handleOnQuery = jest.fn();
        const buttonText = "Run";

        // Act
        act(() => render(<ChatPrompt loading={false} onQuery={handleOnQuery} />));
        const button = await waitFor(() => getButtonElement());

        // Assert
        expect(button.textContent).toMatch(buttonText);
    });
});

describe("ChatPrompt input state", () => {
    test("updates textarea text", async () => {
        // Arrange
        mockWindowFunctions();
        const handleOnQuery = jest.fn();
        const inputValue = "Lorem ipsum";

        // Act
        act(() => render(<ChatPrompt loading={false} onQuery={handleOnQuery} />));

        const textarea = await waitFor(() => getTextAreaElement());
        userEvent.type(textarea, inputValue);

        // Assert
        await waitFor(() => {
            const textarea = getTextAreaElement();
            expect(textarea).toHaveValue(inputValue);
        });
    });

    test("updates text count", async () => {
        // Arrange
        mockWindowFunctions();
        const handleOnQuery = jest.fn();
        const inputValue = "Lorem ipsum";
        const countValue = "11 / 2000";

        // Act
        act(() => render(<ChatPrompt loading={false} onQuery={handleOnQuery} />));

        const textarea = await waitFor(() => getTextAreaElement());
        userEvent.type(textarea, inputValue);

        // Assert
        await waitFor(() => {
            const textCounter = getTextCountElement();
            expect(textCounter.textContent).toMatch(countValue);
        });
    });

    test("RPMXCON-84287 textarea text cannot exceed maximum count", async () => {
        // Arrange
        mockWindowFunctions();
        const handleOnQuery = jest.fn();
        const excessiveInputValue = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet finibus urna, et condimentum nisl. Fusce quis tempus lacus. Fusce ut odio vitae turpis dignissim lobortis. Nullam ac risus id leo ornare laoreet. Suspendisse eu nulla in nisi cursus elementum eget ut libero. Etiam ultrices felis vitae neque scelerisque dapibus. Pellentesque ultrices consequat consequat. Duis pulvinar faucibus risus vel malesuada. Integer dapibus in nisl quis sollicitudin. Vivamus at efficitur erat. Aenean ut felis vulputate, tristique sapien nec, elementum dui. Aliquam sit amet facilisis nulla. Duis bibendum urna justo, vel semper diam porta id. Donec interdum, magna vel aliquet pellentesque, ipsum odio elementum sapien, vitae tincidunt augue nibh sed risus. Fusce sed magna in sapien tempus varius. Suspendisse potenti. Aliquam convallis enim in ornare lobortis. Vestibulum commodo nisi in auctor convallis. Nunc elementum, justo at congue porta, ipsum justo viverra tortor, sed pharetra lorem tortor finibus dui. Vivamus et euismod ipsum, lobortis imperdiet magna. Sed porta rutrum nibh quis consequat. Sed auctor aliquam commodo. Nunc vulputate justo nibh, vel congue enim mattis vitae. Phasellus cursus eros a ex vulputate rutrum. Donec sollicitudin finibus justo, non porttitor urna convallis ac. Cras et massa est. Etiam ut justo cursus, placerat urna ac, hendrerit nunc. Vivamus cursus mauris leo, vitae iaculis ligula elementum et. Phasellus eleifend vitae elit nec lacinia. Donec molestie molestie erat, ut sodales risus elementum at. Phasellus nec nisi eget mi egestas tincidunt. Ut at tortor sem. Sed dictum tempor purus, id ultricies tortor convallis euismod. Ut eu pulvinar sem. Nulla vehicula arcu ac erat fermentum, vel venenatis dolor sollicitudin. Etiam faucibus ex facilisis eros tincidunt, quis euismod ante convallis. Etiam luctus nisi mauris, feugiat elementum nulla dignissim non. Cras dictum, eros eu iaculis congue, tortor ante hendrerit ipsum, in tincidunt orci nulla vitae diam. Sed pharetra nunc sit amet aliquet tincidunt. Aliquam finibus turpis vitae lacinia posuere. Nulla ultrices congue tincidunt. Ut et eros sed velit dignissim posuere. Donec iaculis aliquam nibh, ac accumsan mauris rutrum fringilla. Ut dapibus hendrerit sodales. Morbi id fermentum dui. Duis turpis dui, rhoncus ut tortor ut, molestie aliquet sem. Fusce eleifend ac dolor nec ultricies. Proin commodo ligula sit amet mattis maximus. Maecenas imperdiet quis neque eget hendrerit. Etiam pulvinar hendrerit turpis, vel pellentesque leo lacinia sed. Curabitur quam lectus, ultricies fermentum enim eget, commodo posuere mi. In hac habitasse platea dictumst. Suspendisse potenti. Aenean tempus ac orci in ultrices.`;
        const maxInputValue = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet finibus urna, et condimentum nisl. Fusce quis tempus lacus. Fusce ut odio vitae turpis dignissim lobortis. Nullam ac risus id leo ornare laoreet. Suspendisse eu nulla in nisi cursus elementum eget ut libero. Etiam ultrices felis vitae neque scelerisque dapibus. Pellentesque ultrices consequat consequat. Duis pulvinar faucibus risus vel malesuada. Integer dapibus in nisl quis sollicitudin. Vivamus at efficitur erat. Aenean ut felis vulputate, tristique sapien nec, elementum dui. Aliquam sit amet facilisis nulla. Duis bibendum urna justo, vel semper diam porta id. Donec interdum, magna vel aliquet pellentesque, ipsum odio elementum sapien, vitae tincidunt augue nibh sed risus. Fusce sed magna in sapien tempus varius. Suspendisse potenti. Aliquam convallis enim in ornare lobortis. Vestibulum commodo nisi in auctor convallis. Nunc elementum, justo at congue porta, ipsum justo viverra tortor, sed pharetra lorem tortor finibus dui. Vivamus et euismod ipsum, lobortis imperdiet magna. Sed porta rutrum nibh quis consequat. Sed auctor aliquam commodo. Nunc vulputate justo nibh, vel congue enim mattis vitae. Phasellus cursus eros a ex vulputate rutrum. Donec sollicitudin finibus justo, non porttitor urna convallis ac. Cras et massa est. Etiam ut justo cursus, placerat urna ac, hendrerit nunc. Vivamus cursus mauris leo, vitae iaculis ligula elementum et. Phasellus eleifend vitae elit nec lacinia. Donec molestie molestie erat, ut sodales risus elementum at. Phasellus nec nisi eget mi egestas tincidunt. Ut at tortor sem. Sed dictum tempor purus, id ultricies tortor convallis euismod. Ut eu pulvinar sem. Nulla vehicula arcu ac erat fermentum, vel venenatis dolor sollicitudin. Etiam faucibus ex facilisis eros tincidunt, quis euismod ante convallis. Etiam luctus nisi mauris, feugiat elementum nulla dignissim non. Cras dictum, eros eu iaculis congue, tortor ante hendrerit ipsum, in tincidunt orci nulla vitae di`;
        const countValue = "2000 / 2000";
        const user = userEvent.setup({ delay: null });

        // Act
        act(() => render(<ChatPrompt loading={false} onQuery={handleOnQuery} />));

        const textarea = await waitFor(() => getTextAreaElement());
        await user.type(textarea, excessiveInputValue);

        // Assert
        await waitFor(() => {
            const textCounter = getTextCountElement();
            expect(textCounter.textContent).toMatch(countValue);

            const textarea = getTextAreaElement();
            expect(textarea).toHaveValue(maxInputValue);
        });
    }, 60000);

    test("updates button state", async () => {
        // Arrange
        mockWindowFunctions();
        const handleOnQuery = jest.fn();
        const inputValue = "Lorem ipsum";

        // Act
        act(() => render(<ChatPrompt loading={false} onQuery={handleOnQuery} />));

        const textarea = await waitFor(() => getTextAreaElement());
        userEvent.type(textarea, inputValue);

        // Assert
        await waitFor(() => {
            const button = getButtonElement();
            expect(button).not.toBeDisabled();
        });
    });

    test("RPMXCON-84314 - Does not update button state if doc count is zero", async () => {
        // Arrange
        mockWindowFunctions();
        const handleOnQuery = jest.fn();
        const inputValue = "Lorem ipsum";

        // Act
        act(() => render(<ChatPrompt loading={false} onQuery={handleOnQuery} docCount={0} />));

        const textarea = await waitFor(() => getTextAreaElement());
        userEvent.type(textarea, inputValue);

        // Assert
        await waitFor(() => {
            const button = getButtonElement();
            expect(button).toBeDisabled();
        });
    });
});

describe("ChatPrompt onQuery", () => {
    test("fires event", async () => {
        // Arrange
        mockWindowFunctions();
        sageClient.poseQuestionAsync.mockResolvedValue(123);
        const handleOnQuery = jest.fn();
        const inputValue = "Lorem ipsum";

        // Act
        act(() => render(<ChatPrompt loading={false} onQuery={handleOnQuery} />));

        const textarea = await waitFor(() => getTextAreaElement());
        await userEvent.type(textarea, inputValue);

        await waitFor(() => {
            const button = getButtonElement();
            expect(button).not.toBeDisabled();
        });

        const button = getButtonElement();
        await userEvent.click(button);

        // Assert
        await waitFor(() => {
            expect(handleOnQuery).toHaveBeenCalled();
            expect(handleOnQuery).toHaveBeenCalledTimes(1);
        });
    });

    test("updates button to indicate loading", async () => {
        // Arrange
        mockWindowFunctions();
        const mockTimeout = async () => {
            // Set a timeout so we can see the button text change
            await new Promise(function (resolve, reject) {
                setTimeout(resolve(), 3000);
            });
        };
        sageClient.poseQuestionAsync.mockImplementation(mockTimeout);
        const handleOnQuery = jest.fn();
        const inputValue = "Lorem ipsum";

        // Act
        act(() => render(<ChatPrompt loading={false} onQuery={handleOnQuery} />));

        const textarea = await waitFor(() => getTextAreaElement());
        await userEvent.type(textarea, inputValue);

        await waitFor(() => {
            const button = getButtonElement();
            expect(button).not.toBeDisabled();
        });

        const button = getButtonElement();
        userEvent.click(button);

        // Assert
        await waitFor(() => {
            const button = document.querySelector(".p-button-loading");
            expect(button).not.toBeNull();
            expect(button).toBeDefined();
        });
    });
});

describe('RPMXCON-79212 Advanced Settings Flyout', () => {
    test(`RPMXCON-84430 Verify that clicking on the 'Advanced Options' link should open the advanced options popup window`, async () => {
        // Arrange
        mockWindowFunctions();
        sageClient.getDefaultPromptText.mockResolvedValue("Lorem ipsum");
        const handleOnQuery = jest.fn();

        // Act
        act(() => render(<ChatPrompt loading={false} onQuery={handleOnQuery} />));

        const advanceOptionsLink = await waitFor(() => getAdvOptsElement());
        await userEvent.click(advanceOptionsLink);
        let element = document.querySelector(".sage-advanced-options__flyout");

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test(`RPMXCON-84429 Verify 'Advanced Options' link present above question textbox on AI investigate home page`, async () => {
        // Arrange
        mockWindowFunctions();
        sageClient.getDefaultPromptText.mockResolvedValue("Lorem ipsum");
        const handleOnQuery = jest.fn();

        // Act
        act(() => render(<ChatPrompt loading={false} onQuery={handleOnQuery} />));
        const advanceOptionsLink = await waitFor(() => getAdvOptsElement());

        // Assert
        expect(advanceOptionsLink).not.toBeNull();
        expect(advanceOptionsLink).toBeDefined();
    });

    test(`RPMXCON-84433 Verify that clicking on the 'X' button should close the advanced settings window`, async () => {
        // Arrange
        mockWindowFunctions();
        sageClient.getDefaultPromptText.mockResolvedValue("Lorem ipsum");
        const handleOnQuery = jest.fn();

        // Act
        act(() => render(<ChatPrompt loading={false} onQuery={handleOnQuery} />));

        // Click to open Flyout
        const advanceOptionsLink = await waitFor(() => getAdvOptsElement());
        await userEvent.click(advanceOptionsLink);

        // Click to close Flyout
        const advanceOptionsClose = await waitFor(() => getAdvOptsCloseButton());
        await userEvent.click(advanceOptionsClose);

        // Assert
        await waitFor(() => {
            expect(document.querySelector(".sage-advanced-options__flyout")).not.toBeInTheDocument()
        });
    });

    test(`RPMXCON-84435 Verify that helptext icon should be present for advanced options link in AI investigate home page`, async () => {
        // Arrange
        mockWindowFunctions();
        sageClient.getDefaultPromptText.mockResolvedValue("Lorem ipsum");
        const handleOnQuery = jest.fn();

        // Act
        act(() => render(<ChatPrompt loading={false} onQuery={handleOnQuery} />));
        let element = screen.findByTestId("advance-options-link-help");

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });
});

function getButtonElement() {
    return document.querySelector(".chat-prompt-run-button");
}

function getTextAreaElement() {
    return document.querySelector(".chat-prompt-text-area");
}

function getTextCountElement() {
    return document.querySelector(".chat-prompt-text-counter");
}

function getAdvOptsElement() {
    return document.querySelector(".chat-prompt-advanced-options");
}

function getAdvOptsCloseButton() {
    return document.querySelector(".sage-advanced-options__flyout .sage-flyout__footer .footer__close-button");
}

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