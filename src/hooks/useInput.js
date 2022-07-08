import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = async (url, cb) => {
    setSubmitting(true);
    setTimeout(() => {
      console.log(value);
      //after submitting expect new post to be returned
      // add new post to list of current posts
      // or do it via sockets
      // fetchNew or something
      setSubmitting(false);
      setValue("");
    }, 5000);
  };
  return [value, handleChange, handleSubmit, submitting];
};
export default useInput;
