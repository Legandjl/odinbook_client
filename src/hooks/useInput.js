import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");
  const reset = () => {
    setValue("");
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return [value, handleChange, reset];
};
export default useInput;
