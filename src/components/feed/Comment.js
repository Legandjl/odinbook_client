import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import useDataLoad from "../../hooks/useDataLoad";
import useFetch from "../../hooks/useFetch";
import useLike from "../../hooks/useLike";
import useShowMenu from "../../hooks/useShowMenu";
import CommentFunctions from "./CommentFunctions";
import CommentMenu from "./CommentMenu";

const Comment = (props) => {
  const [showMenu, toggleOn] = useShowMenu();
  const [fetchData, loadingData, error] = useFetch();
  const [handleLike, liked] = useLike(props.comment._id);

  const { token, user } = useContext(AuthContext);
  const [commentContent, setCommentContent] = useState(
    props.comment.comment.substring(0, 200)
  );

  return (
    <div className="commentWrap">
      <div className="comment">
        <div className="commentHeader">{props.comment.user.fullName}</div>
        {commentContent}
        {commentContent.length !== props.comment.comment.length && (
          <div
            style={{ fontWeight: 900, fontSize: "0.8em", marginTop: 5 }}
            onClick={() => {
              setCommentContent(props.comment.comment);
            }}
            className="contentButton"
          >
            Show all
          </div>
        )}
      </div>
      <div className="commentMenuWrap">
        {props.comment.user._id === user._id && (
          <i onClick={toggleOn} class="ri-more-line"></i>
        )}
        {showMenu && <CommentMenu />}
      </div>

      <CommentFunctions handleLike={handleLike} liked={liked} />
    </div>
  );
};

export default Comment;
