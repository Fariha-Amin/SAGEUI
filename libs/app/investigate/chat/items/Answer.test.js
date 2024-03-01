import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import Answer from './Answer';

describe("Answer UI", () => {
    test("renders original response", () => {
        // Arrange
        const response = "Yes, Who is on first.";
        const model = getDefaultModel();
        model.response.answer = response;
        model.response.isInProgress = false;
        model.response.result.isSuccess = true;

        // Act
        render(<Answer model={model} />);
        const element = screen.queryByText(response);

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("RPMXCON-84291 renders correct 'I don't know' response", () => {
        // Arrange
        const response = "I do not have enough information in the provided sources to answer your question";
        const model = getDefaultModel();
        model.response.answer = "";
        model.response.isInProgress = false;
        model.response.result.isSuccess = false;
        model.response.result.failureReason = response;

        // Act
        render(<Answer model={model} />);
        const element = screen.queryByText(response);

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("renders response number", () => {
        // Arrange
        const responseId = 456;
        const model = getDefaultModel();
        model.id = responseId;

        // Act
        render(<Answer model={model} />);
        const element = screen.queryByText(`A${responseId}`);

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("renders as a card", async () => {
        // Arrange
        const model = getDefaultModel();

        // Act
        render(<Answer model={model} />);
        const element = await document.querySelector(".sage-chat-history__item-answer.p-card");

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
    });

    test("response contains person Names with hyperlinks and document ids in one answer", async () => {
        // Arrange
        const model = getDefaultPromptAnswer();
        
        // Act
        render(<Answer model={model} />);
        const element = await document.querySelector(".item-answer__answer");

        // Assert
        expect(element).not.toBeNull();
        expect(element).toBeDefined();
        expect(element.outerHTML).toContain('<button class="personName" value=" Wanda Romaine">');
        expect(element.outerHTML).toContain('> Wanda Romaine<');
        expect(element.outerHTML).toContain('<a href="#">ID000001</a>');
        
    });

    test("response contains new line characters" , async () => {

        //Arrange
        const model = getPersonalPromptAnswer();

        //Act
        render(<Answer model={model} />);
        const element = await document.querySelector(".item-answer__answer");
        //Assert
        expect(element).not.toBeNull();
        expect(element.outerHTML.split(/\n/).length).toBe(4);
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
            personNames: [],
            result: {
                isSuccess: true,
                failureReason: "",
            },
        }
    };
}

function getDefaultPromptAnswer(){
    return{
        id: 0,
        datetime: new Date(),
        query: {
            id: 0,
            datetime: new Date(),
            question: "My first question",
            prompt: {
                id: 0,
                value: "",
                type: "",
            }
        },
        response: {
            id: 0,
            datetime: new Date(),
            answer: "Lorem ipsum Wanda Romaine dolor sit amet, consectetur adipiscing elit. Harry Proper ed sed lorem ID000001 nec odio. Maecenas sagittis augue ac ID000024 condimentum malesuada.",
            isInProgress: false,
            documentIds: ["ID000001", "ID000024"],
            personNames: ["Harry Proper", "Wanda Romaine"],
            result: {
                isSuccess: true,
                failureReason: "",
            },
        }
    };
}

function getPersonalPromptAnswer(){
    return{
        id: 0,
        datetime: new Date(),
        query: {
            id: 0,
            datetime: new Date(),
            question: "Provide a summary of [Person name]",
            prompt: {
                id: 0,
                value: "",
                type: "",
            }
        },
        response: {
            id: 0,
            datetime: new Date(),
            answer: "Name of Individual [Person name] \n Job Title: Senior Former President Line Manager/Reports to: Ken Lay(CEO of Enron)\n  Department: Executive Management \n",
            isInProgress: false,
            documentIds: [],
            personNames: [],
            result: {
                isSuccess: true,
                failureReason: "",
            },
        }
    };
}