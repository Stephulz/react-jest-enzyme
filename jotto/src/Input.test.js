import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import Input from './Input';
import { checkProps } from '../test/testUtils';

// mock entire module for destructuring useState on import
const mockSetCurrentGuess = jest.fn();
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: (initialState) => [initialState, mockSetCurrentGuess]
}));

const defaultProps = { secretWord: 'train' };
/**
 * Factory function to craete a ShallowWrapper for the Congrats component.
 * @param {object} props - Component props specific to this seteup
 * @returns {ShallowWrapper}
 */
const setup = (props = { success: false, secretWord: 'plane' }) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Input {...setupProps} />)
}

describe('render', () => {
    describe('success is true', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup({ success: true });
        });
        test('renders without error', () => {
            const wrapper = setup();
            const inputComponent = findByTestAttr(wrapper, "component-input");
            expect(inputComponent.length).toBe(1);
        });
        test('Input box does not show', () => {
            const inputBox = findByTestAttr(wrapper, "input-box");
            expect(inputBox.exists()).toBe(false);
        });
        test('Submit button does not show', () => {
            const submitButton = findByTestAttr(wrapper, "submit-button");
            expect(submitButton.exists()).toBe(false);
        });
    });
    describe('success is false', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup({ success: false });
        });
        test('renders without error', () => {
            const wrapper = setup();
            const inputComponent = findByTestAttr(wrapper, "component-input");
            expect(inputComponent.length).toBe(1);
        });
        test('Input box shows', () => {
            const inputBox = findByTestAttr(wrapper, "input-box");
            expect(inputBox.exists()).toBe(true);
        });
        test('Submit button shows', () => {
            const submitButton = findByTestAttr(wrapper, "submit-button");
            expect(submitButton.exists()).toBe(true);
        });
    });
});

test('does not throw warning with expected props', () => {
    const expectedProps = { secretWord: 'plane' };
    checkProps(Input, expectedProps);
});

describe('state controlled input field', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
    test('state updates with value of input box upon change', () => {
        const inputBox = findByTestAttr(wrapper, "input-box");

        const mockEvent = { preventDefault() { }, target: { value: 'train' } }; // simulate mock input value 
        inputBox.simulate("change", mockEvent); // simulate change event with mockedValue        
        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
    });

    test('field is cleared when submit button click', () => {
        const submitButton = findByTestAttr(wrapper, "submit-button");
        const mockEvent = { preventDefault() { }, target: { value: '' } }; // mock useState       

        submitButton.simulate('click', mockEvent);
        expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
    });
});
