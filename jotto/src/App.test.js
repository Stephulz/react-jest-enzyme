import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import App from './App';

// activate global mock to make sure getSecretWord deosn't make network call
jest.mock('./actions');
import { getSecretWord as mockGetSecretWord } from './actions';

const setup = () => {
  return mount(<App />)
};

test('renders without error', () => {
  const wrapper = setup();
  const app = findByTestAttr(wrapper, "component-app");
  expect(app.length).toBe(1);
});

describe('ger secret workd', () => {
  beforeEach(() => {
    // clear the mock calls from previous tests
    mockGetSecretWord.mockClear();
  });
  test('getSecretWord on app mount', () => {
    const wrapper = setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });

  test('getSecretWord does not run on app update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    wrapper.setProps();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });

});
