require('jest-fetch-mock').enableMocks();

// Ignore CSS parsing errors
// This is a jsdom thing (https://github.com/jsdom/jsdom/issues/2177) because it can't handle @layer
const originalConsoleError = console.error;
const jsDomCssError = 'Error: Could not parse CSS stylesheet';
console.error = (...params) => {
  if (!params.find(p => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};