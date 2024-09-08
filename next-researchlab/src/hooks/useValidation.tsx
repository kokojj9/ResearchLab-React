import { useState } from "react";

type validateFn = (value: string) => boolean;

const useValidation = (validateFn: validateFn, initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);
  const [isInput, setIsInput] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    setIsInput(true);
    setIsValid(validateFn(value));
  };

  const reset = () => {
    setValue(initialValue);
    setIsValid(false);
    setIsInput(false);
  };

  return {
    value,
    isValid,
    isInput,
    handleChange,
    reset,
  };
};

export default useValidation;
