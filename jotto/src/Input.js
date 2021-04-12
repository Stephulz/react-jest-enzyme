import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Input({ success, secretWord }) {
    const [currentGuess, setCurrentGuess] = useState("");

    return (
        <div data-test="component-input">
            {!success && (
                <form className="form-inline">
                    <input data-test="input-box"
                        className="mb-2 mx-sm-3"
                        type="text"
                        placeholder="enter guess"
                        value={currentGuess}
                        onChange={(event) => setCurrentGuess(event.target.value)} />
                    <button
                        data-test="submit-button"
                        className="btn btn-primary mb-2"
                        onClick={(event) => {
                            // TODO: update guessedWords
                            // TODO: update guessedWords
                            event.preventDefault();
                            setCurrentGuess("");
                        }}
                    >
                        Submit
                 </button>
                </form>
            )}
        </div>
    )
}

Input.propTypes = {
    secretWord: PropTypes.string.isRequired
}
