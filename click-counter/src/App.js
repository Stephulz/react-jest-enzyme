import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [hasError, setHasError] = useState(false);

  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">
        The counter is currently&nbsp;
        <span data-test="count">{count}</span>
      </h1>
      {hasError && (
          <h3 data-test="error-label" className="error-label">The counter cannot go below zero</h3>
        )}
      <button
        data-test="increment-button"
        onClick={() => count >= 0 ? (setCount(count + 1), setHasError(false)) : setHasError(true)}>Increment counter</button>
        &nbsp;
      <button
        data-test="decrement-button"
        onClick={() => count > 0 ? setCount(count - 1) : (setCount(0), setHasError(true))}>Decrement counter</button>        
    </div>
  );
}

export default App;
