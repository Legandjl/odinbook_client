import { useContext } from "react";

import ReactTextareaAutosize from "react-textarea-autosize";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import useInput from "../../hooks/useInput";

const CommentCreator = (props) => {
  const [value, handleChange, reset] = useInput();
  const { token } = useContext(AuthContext);
  const [fetchData, fetchInProgress, error] = useFetch();

  const handleClick = async (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      const url = `post/comment/${props.id}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({ comment: value }),
      };
      await fetchData(url, options);
      reset();
      return;
    }
    handleChange(e);
  };

  return (
    <ReactTextareaAutosize
      value={value}
      onChange={handleChange}
      minRows={1}
      maxRows={6}
      placeholder="Write a comment.."
      onKeyDown={handleClick}
      style={{
        resize: "none",
        border: "none",
        outline: "none",
        borderRadius: "9px",
        padding: "9px",
        backgroundColor: "rgb(63, 62, 62)",
        color: "white",
        marginLeft: "1em",
        marginRight: "1em",
        marginBottom: "1em",
      }}
    />
  );
};
export default CommentCreator;
