// __mocks__/svgMock.js

// This is a mock for SVG files used in Jest tests
const React = require('react');

// Mocked SVG components
const MockedHelpIcon = () => <svg data-testid="mocked-help-icon" />;
const MockedDownloadIcon = () => <svg data-testid="mocked-download-icon" />;
const MockedHelpIconSm = () => <svg data-testid="mocked-help-icon-sm" />;

// Export the mocked components
module.exports = {
  React,
  MockedHelpIcon,
  MockedDownloadIcon,
  MockedHelpIconSm,
};
