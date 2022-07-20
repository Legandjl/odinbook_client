import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const PostFunctions = (props) => {
  const { user } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState();

  const liked = props.likes.some((like) => {
    return like.user === user._id;
  });

  const length = props.likes.length;

  return (
    <div className="postFunctionWrap">
      {" "}
      <i
        onClick={props.handleLike}
        class={`ri-heart-${!liked ? "line" : "fill"}`}
      ></i>
      <p>
        {liked && length > 1
          ? `You and ${length - 1} ${
              length - 1 === 1 ? "other" : "others"
            } likes this`
          : liked && length === 1
          ? "You like this"
          : length === 0
          ? "Be the first to like this"
          : length > 0 &&
            `${length} ${length > 1 ? "people like" : "person likes"}  this`}
      </p>
      <i style={{ justifySelf: "end" }} class="ri-chat-3-fill"></i>
    </div>
  );
};

export default PostFunctions;
