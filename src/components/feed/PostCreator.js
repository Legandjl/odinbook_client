import ReactTextareaAutosize from "react-textarea-autosize";
import useInput from "../../hooks/useInput";

const PostCreator = () => {
  const [value, handleChange, handleSubmit, submitting] = useInput();
  //todo change placeholder depending on if its
  // homepage/userpage
  //or someone elses page
  //maybe completely disabled if its not a friend

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
          backgroundColor: " rgb(63, 62, 62)",
          color: "white",
        }}
        value={value}
        onChange={handleChange}
      />
      <button
        onClick={handleSubmit}
        disabled={value.trim().length === 0 || submitting}
      >
        Post
      </button>
    </div>
  );
};
export default PostCreator;
