import React, { useState } from 'react';

function CustomerInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
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
          Customer Input:
          <input type="text" value={inputValue} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CustomerInput;