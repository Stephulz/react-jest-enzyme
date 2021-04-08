import React, { useState } from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import Input from './Input';
import { checkProps } from '../test/testUtils';

const defaultProps = { secretWord: 'train' };
/**
 * Factory function to craete a ShallowWrapper for the Congrats component.
 * @param {object} props - Component props specific to this seteup
 * @returns {ShallowWrapper}
 */
const setup = (props = { secretWord: 'plane' }) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Input {...setupProps} />)
}

test('renders without error', () => {
    let wrapper = setup();
    const inputComponent = findByTestAttr(wrapper, "component-input");
    expect(inputComponent.length).toBe(1);
});

test('does not throw warning with expected props', () => {
    const expectedProps = { secretWord: 'plane' };
    checkProps(Input, expectedProps);
})

describe('state controlled input field', () => {
    test('state updates with value of input box upon change', () => {
        const mockSetCurrentGuess = jest.fn(); // mock function
        React.useState = jest.fn(() => ["", mockSetCurrentGuess]); // replace useState from Input component (getter, setter)

        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper, "input-box");

        const mockEvent = { target: { value: 'train' } }; // simulate mock input value 
        inputBox.simulate("change", mockEvent); // simulate change event with mockedValue

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');

    });
});
