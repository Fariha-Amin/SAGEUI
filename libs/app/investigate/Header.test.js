import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { userEvent } from "@testing-library/user-event";
import Header from './Header'

describe("Main Page Header Tests", () => {
    beforeEach(() => {
        fetch.resetMocks()
    })

    it('RPMXCON-84244 Counter renders', () => {
        // Arrange
        fetch.mockResponseOnce(JSON.stringify({data:'10000'}));

        // Act
        const element = renderer
            .create(<Header docCount={100} />);
            

        // Assert
        expect(JSON.stringify(element)).toContain('counter');
    });

    test('Title Renders', () => {
        // Arrange
        fetch.mockResponseOnce(JSON.stringify({data:'10000'}));

        // Act
        const element = renderer
            .create(<Header docCount={100} />);
            

        // Assert
        expect(JSON.stringify(element)).toContain('neXgenAI Investigate');
    });

    test('Help Icon Renders', () => {
        // Arrange
        fetch.mockResponseOnce(JSON.stringify({data:'10000'}));

        // Act
        const element = renderer
            .create(<Header docCount={100} />);
         

        // Assert
        expect(JSON.stringify(element)).toContain('circle-question');
    });

    test("RPMXCON-84594 renders FAQ link", async () => {
        // Arrange
        const url = "https://www.sightlinecentral.com/doc/faq/gen-ai-faq/";
        
        // Act
        render(<Header docCount={100} />);
        const anchor = document.querySelector(`[href="${url}"]`);
        
        // Assert
        expect(anchor).not.toBeNull();
        expect(anchor).toBeDefined();
    });

    test('RPMXCON-84255 - AI Investigate: Verify the "Manage document population" button in AI Investigate page for newly created project.', ()=>{
        // Arrange
        fetch.mockResponseOnce(JSON.stringify({data:'0'}));
        const btnLabel = "Manage Document Population";

        // Act
        const element = renderer
            .create(<Header docCount={100} />);

        // Assert
        expect(JSON.stringify(element)).toMatch(btnLabel);
    });

    test('RPMXCON-84231 - AI Investigate: Verify the composition of the header subtext in the AI Investigate home page.', ()=>{
        // Arrange
        fetch.mockResponseOnce(JSON.stringify({data:'0'}));
        const appMainLabel = "Enter a question to start your investigation process. For guidance on using the neXgenAI features in Sightline, please refer to the";
        const faqLabel = "FAQ";
        // Act
        const element = renderer
            .create(<Header docCount={100} />);
        // Assert
        expect(JSON.stringify(element)).toContain(appMainLabel);
        expect(JSON.stringify(element)).toContain(faqLabel);
    });

    test('RPMXCON-84230 - AI Investigate: Verify the Header and its tooltip icon in AI Investigate home page.', async () => {
        // Arrange
        fetch.mockResponseOnce(JSON.stringify({data:'0'}));
        const toolTipText = "This is help text";

        // Act
        render(<Header docCount={100} />);
        const helpButton = document.querySelector('[data-icon="circle-question"]');
        await userEvent.hover(helpButton);
        const toolTip = document.querySelector('[role="tooltip"]');

        // Assert
        expect(toolTip).not.toBeNull();
        expect(toolTip).toBeDefined();
        expect(toolTip.outerHTML).toMatch(toolTipText);
    });
});
