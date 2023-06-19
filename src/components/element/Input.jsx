import React, { useState } from 'react';

function TextInput(className) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      className={className}
    />
  );
}

export default TextInput;
