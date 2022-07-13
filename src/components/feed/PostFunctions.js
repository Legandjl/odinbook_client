const PostFunctions = (props) => {
  return (
    <div className="postFunctionWrap">
      {" "}
      <i onClick={props.handleLike} class="ri-heart-line"></i>
      <i class="ri-chat-3-line"></i>
    </div>
  );
};

export default PostFunctions;
