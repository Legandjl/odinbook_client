import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import useShowMenu from "../../hooks/useShowMenu";
import CommentMenu from "./CommentMenu";

const Comment = (props) => {
  const [showMenu, toggleOn] = useShowMenu();

  const { user } = useContext(AuthContext);
  return (
    <div className="commentWrap">
      <div className="comment">
        <div className="commentHeader">{props.comment.user.fullName}</div>
        {props.comment.comment}
      </div>
      <div className="commentMenuWrap">
        {props.comment.user === user._id && (
          <i onClick={toggleOn} class="ri-more-line"></i>
        )}
        {showMenu && <CommentMenu />}
      </div>
      <div className="commentFunctions">
        <p>Like</p>
      </div>
    </div>
  );
};

export default Comment;
