import ReactTextareaAutosize from "react-textarea-autosize";
import useInput from "../../hooks/useInput";

const PostCreator = () => {
  const [value, handleChange] = useInput();
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
      <button disabled={value.trim().length === 0}>Post</button>
    </div>
  );
};
export default PostCreator;
