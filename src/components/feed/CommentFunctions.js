const CommentFunctions = (props) => {
  return (
    <div className="commentFunctions">
      <p onClick={props.handleLike}>{!props.liked ? "Like" : "Unlike"}</p>
    </div>
  );
};

export default CommentFunctions;
