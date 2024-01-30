import React from 'react';
import renderer from 'react-test-renderer';
import IconButton from './IconButton';

test('IconButton renders with correct icon', () => {
  const element = renderer
    .create(<IconButton icon="circle-question" />)
    .toJSON();
  expect(JSON.stringify(element)).toMatch('circle-question');
});