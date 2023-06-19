import { useState } from 'react';

const useInput = () => {
  const [inputData, setInputData] = useState('');

  const inputChangeHandler = (event) => {
    setInputData(event.target.value);
  };

  return { inputData, inputChangeHandler };
};

export default useInput;
