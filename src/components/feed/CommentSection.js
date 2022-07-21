import Comment from "./Comment";

const CommentSection = (props) => {
  const comments = props.comments.map((comment, index) => {
    return (
      <Comment
        key={comment._id}
        comment={comment}
        index={index}
        removeOne={props.removeOne}
      />
    );
  });
  return <div className="commentSection">{comments}</div>;
};
export default CommentSection;
