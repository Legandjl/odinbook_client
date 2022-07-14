import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const PostFunctions = (props) => {
  const { user } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState();

  const liked =
    props.likes.map((like) => {
      return like.user === user._id;
    }).length > 0;

  return (
    <div className="postFunctionWrap">
      {" "}
      <i
        onClick={props.handleLike}
        class={`ri-heart-${!liked ? "line" : "fill"}`}
      ></i>
      <p>
        {liked && props.likes.length > 1
          ? `You and ${props.likes.length - 1} others like this`
          : liked && props.likes.length === 1
          ? "You like this"
          : props.likes.length === 0 && "Be the first to like this"}
      </p>
      <i style={{ justifySelf: "end" }} class="ri-chat-3-fill"></i>
    </div>
  );
};

export default PostFunctions;
