import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from './App';

// Set up enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App Component
 * @function setup
 * @return ShallowWrapper
 */
const setup = () => shallow(<App />);

/**
 * Find an data-test element from a wrapper
 * @param {*} wrapper 
 * @param {*} val 
 * @returns element
 */
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter display starts at 0', () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

test('clicking button increments counter display', () => {
  const wrapper = setup();

  // find the button 
  const button = findByTestAttr(wrapper, "increment-button");

  // click the button
  button.simulate('click');

  // find the display, and test that the number has been incremented
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
});

test('clicking button decrements counter display', () => {
  const wrapper = setup();

  // find the button 
  const incrementButton = findByTestAttr(wrapper, "increment-button");
  const decrementButton = findByTestAttr(wrapper, "decrement-button");

  // click the button
  incrementButton.simulate('click');
  decrementButton.simulate('click');

  // find the display, and test that the number has been decrement
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

test('clicking button decrement when zero throws error', () => {
  const wrapper = setup();

  // find the button   
  const decrementButton = findByTestAttr(wrapper, "decrement-button");

  // click the button  
  decrementButton.simulate('click');

  //find the error label
  const errorLabel = findByTestAttr(wrapper, "error-label");

  // find error label  
  expect(errorLabel.text()).toBe("The counter cannot go below zero");
});

test('clicking button decrement when zero throws error then clear error on increment', () => {
  const wrapper = setup();

  // find the button   
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  const incrementButton = findByTestAttr(wrapper, "increment-button");

  // click the button  
  decrementButton.simulate('click');

  //find the error label
  const errorLabel = findByTestAttr(wrapper, "error-label");

  // find error label  
  expect(errorLabel).toBeTruthy();

  // click the increment button
  incrementButton.simulate('click');

  // ensure error gone
  expect(errorLabel).toMatchObject({});

});