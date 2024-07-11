import { useState } from "react";

const useValidation = (validateFn) => {
  const [value, setValue] = useState();
  const [isValid, setIsValid] = useState();
  const [isInput, setIsInput] = useState();

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    setIsInput(true);
    setIsValid(validateFn(value));
  };

  return {
    value,
    isValid,
    isInput,
    handleChange
  };
};

export default useValidation;
