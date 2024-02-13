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

    it('Counter renders', () => {
        // Arrange
        fetch.mockResponseOnce(JSON.stringify({data:'10000'}));

        // Act
        const element = renderer
            .create(<Provider store={store}><Header /></Provider>);
            

        // Assert
        expect(JSON.stringify(element)).toContain('counter');
    });

    test('Title Renders', () => {
        // Arrange
        fetch.mockResponseOnce(JSON.stringify({data:'10000'}));

        // Act
        const element = renderer
            .create(<Provider store={store}><Header /></Provider>);
            

        // Assert
        expect(JSON.stringify(element)).toContain('neXgenAI Investigate');
    });

    test('Help Icon Renders', () => {
        // Arrange
        fetch.mockResponseOnce(JSON.stringify({data:'10000'}));

        // Act
        const element = renderer
            .create(<Provider store={store}><Header /></Provider>);
         

        // Assert
        expect(JSON.stringify(element)).toContain('circle-question');
    });

    test("RPMXCON-84594 renders FAQ link", async () => {
        // Arrange
        const url = "https://www.sightlinecentral.com/doc/faq/gen-ai-faq/";
        
        // Act
        render(<Provider store={store}><Header /></Provider>);
        const anchor = document.querySelector(`[href="${url}"]`);
        
        // Assert
        expect(anchor).not.toBeNull();
        expect(anchor).toBeDefined();
    });
});
