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

describe.skip('no words guessed', () => {
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

describe.skip('some words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'party',
            success: false,
            guessedWords: [{ guessedWord: 'marty', letterMatchCount: 4 }]
        });
    });
    test('adds row to guessedWrods table', () => {
        const guessedWordsRows = findByTestAttr(wrapper, 'guessed-words');
        expect(guessedWordsRows).toHaveLength(2);
    });
});

describe.skip('guess secret word', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'train',
            success: false,
            guessedWords: [{ guessedWord: 'agile', letterMatchCount: 2 }]
        });
        const inputBox = findByTestAttr(wrapper, "input-box");
        inputBox.simulate('change', { target: { value: 'train' } });

        const submitButton = findByTestAttr(wrapper, "submit-button");
        submitButton.simulate('click', { preventDefault() { } });
    });
    test('creates GuessedWords table with one row', () => {
        const guessedWordsRows = findByTestAttr(wrapper, 'guessed-words');
        expect(guessedWordsRows.length).toBe(3);
    });
    test('displays congrats component', () => {
        const congrats = findByTestAttr(wrapper, 'component-congrats');
        expect(congrats.text().length).toBeGreaterThan(0);
    });
    test('does not display input component contents', () => {
        const inputBox = findByTestAttr(wrapper, "input-box");
        expect(inputBox.exists()).toBe(false);

        const submitButton = findByTestAttr(wrapper, "submit-button");
        expect(submitButton.exists()).toBe(false);
    });
});