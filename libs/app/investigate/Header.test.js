import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import Header from './Header'

import { Provider } from 'react-redux';
import store from '../../../app/Investigate/store'

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
        const totalDocCountLabel = "Total Documents";
        const btnLabel = "Manage Document Population";
        // Act
        const element = renderer
            .create(<Header docCount={100} />);
        // Assert
        expect(JSON.stringify(element)).toContain(totalDocCountLabel);
        expect(JSON.stringify(element)).toContain("0");
        expect(JSON.stringify(element)).toMatch(btnLabel);
        expect(JSON.stringify(element)).toMatch("This is help text");

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
});
