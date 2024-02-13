import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import ChatItem from './Item';

describe("ChatItem UI", () => {
    test("RPMXCON-84290 renders timestamp correctly", async () => {
        // Arrange
        const year = 1234;
        const march = 2;
        const day = 2;
        const hour = 15;
        const meridiem = "PM";
        const minute = 45;
        const second = 56;
        const model = getDefaultModel();
        model.datetime = new Date(year, march, day, hour, minute, second);
        // Expectation -> 2 March 1234 - 03:45 PM
        const expectedFormat = `${day} March ${year} - 03:${minute} ${meridiem}`;

        // Act
        render(<ChatItem model={model} />);
        const element = await screen.findByText(expectedFormat);
        
        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("renders as an accordian", async () => {
        // Arrange
        const model = getDefaultModel();
        
        // Act
        render(<ChatItem model={model} />);
        const element = await document.querySelector(".sage-chat-history__item.accordion");
        
        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });
});

function getDefaultModel() {
    return {
        id: 0,
        datetime: new Date(),
        query: {
            id: 0,
            datetime: new Date(),
            question: "",
            prompt: {
                id: 0,
                value: "",
                type: "",
            }
        },
        response: {
            id: 0,
            datetime: new Date(),
            answer: "",
            isInProgress: false,
            documentIds: [],
            result: {
                isSuccess: true,
                failureReason: "",
            },
        }
    };
}