import { useState } from "react";

const useValidation = (validateFn, initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);
  const [isInput, setIsInput] = useState(false);

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
