import React from 'react'
import PropTypes from 'prop-types';

/**
 * Functional react component for congratulatory message.
 * @param {object} success - Boolean  
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is false)
 */
export default function Congrats({ success }) {
    if (success) {
        return (
            <div data-test="component-congrats" className="alert alert-success">
                <span data-test="congrats-message">
                    Congratulations! You guessed the word!
                </span>
            </div>
        )
    } else {
        return (
            <div data-test="component-congrats" />
        )
    }
}

Congrats.propTypes = {
    success: PropTypes.bool.isRequired
}
