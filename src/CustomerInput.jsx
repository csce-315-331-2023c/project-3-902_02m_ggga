import React, { useState } from 'react';

function CustomerInput(props) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
        // Call the callback function to pass the input value to the parent component
        props.onInputChange(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process the customer input here (e.g., send it to an API, store it in state, etc.)
        console.log('Customer input:', inputValue);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Quantity:
                    <input type="number" value={inputValue} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CustomerInput;