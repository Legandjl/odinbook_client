import { useContext } from "react";
import { useParams } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import useInput from "../../hooks/useInput";
import Submitting from "../loaders/Submitting";

const PostCreator = (props) => {
  const [value, handleChange, reset] = useInput();
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [fetchData, fetchInProgress, error] = useFetch();

  const handleClick = async () => {
    const url = "post";
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({ content: value, location: id }),
    };
    const post = await fetchData(url, options);
    reset();
    props.addOne(post);
  };

  return (
    <div className="newPost">
      <ReactTextareaAutosize
        minRows={1}
        maxRows={6}
        placeholder="What's on your mind?"
        style={{
          resize: "none",
          border: "none",
          outline: "none",
          borderRadius: "9px",
          padding: "12px",
          backgroundColor: "#242526",
          color: "white",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
        value={value}
        onChange={handleChange}
      />
      <button
        className="postSubmit"
        onClick={handleClick}
        disabled={value.trim().length === 0 || fetchInProgress}
      >
        {!fetchInProgress ? "Post" : <Submitting />}
      </button>
    </div>
  );
};
export default PostCreator;
