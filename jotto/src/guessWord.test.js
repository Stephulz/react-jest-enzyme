import React from 'react';
import { mount } from 'enzyme';

import App from './App';
import { findByTestAttr } from '../test/testUtils';

const setup = (state = {}) => {
    const wrapper = mount(<App />);

    const inputBox = findByTestAttr(wrapper, "input-box");
    inputBox.simulate('change', { target: { value: 'train' } });

    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate('click', { preventDefault() { } });

    return wrapper;
}

describe('no words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'party',
            success: false,
            guessedWords: []
        });
    });
    test('creates GuessedWords table with one row', () => {
        const guessedWordsRows = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsRows).toHaveLength(1);
    });
});

describe('some words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'party',
            success: false,
            guessedWords: [{ guessedWord: 'marty', letterMatchCount: 4 }]
        });
    });
    test('creates GuessedWords table with one row', () => {
        const guessedWordsRows = findByTestAttr(wrapper, 'guessed-words');
        expect(guessedWordsRows).toHaveLength(1);

    });
});

describe('guess secret word', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'train',
            success: true,
            guessedWords: [{ guessedWord: 'train', letterMatchCount: 5 }]
        });
    });
    test('creates GuessedWords table with one row', () => {
        const guessedWordsRows = findByTestAttr(wrapper, 'guessed-words');
        console.log(wrapper.debug())
        expect(guessedWordsRows.length).toBe(1);
    });
});