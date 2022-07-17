import Comment from "./Comment";

const CommentSection = (props) => {
  const comments = props.comments.map((comment) => {
    return <Comment comment={comment} />;
  });
  return <div className="commentSection">{comments}</div>;
};
export default CommentSection;
