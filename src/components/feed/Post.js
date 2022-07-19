import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useDataLoad from "../../hooks/useDataLoad";
import useFetch from "../../hooks/useFetch";
import CommentCreator from "./CommentCreator";
import CommentSection from "./CommentSection";
import PostFunctions from "./PostFunctions";
import usePaginate from "../../hooks/usePaginate";
import Comments from "../loaders/Comments";
import useLike from "../../hooks/useLike";
var Scroll = require("react-scroll");

const Post = (props) => {
  const { token } = useContext(AuthContext);
  const [content, setContent] = useState(props.data.content.substring(0, 20));
  const [showActive, setShowActive] = useState(false);
  const [toSkip, setToSkip] = useState(0);
  const [handleLike, liked, likeData] = useLike(props.data._id);
  const [profData, refreshProf, loading] = useDataLoad(
    `user/${props.data.creator}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const [
    commentData,
    refreshComments,
    loadingComments,
    reachedEnd,
    resetComments,
    addOne,
  ] = usePaginate(
    `post/comments/${props.data._id}/${toSkip}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    },
    setToSkip
  );

  const handleComments = () => {
    refreshComments();
  };

  const handleContent = (e) => {
    if (showActive) {
      setContent(props.data.content.substring(0, 20));
      setShowActive(false);
    } else {
      setContent(props.data.content);
      setShowActive(true);
    }
  };

  return (
    <div className="post">
      <div className="postHeader" id={showActive && props.data._id}>
        {profData && (
          <Link to={`/user/${profData._id}`}> {profData.fullName} </Link>
        )}
      </div>
      <div className="postContent">
        {profData && content} {!profData && "loading..."}
        <Scroll.Link offset={-100} to={props.data._id} spy={true} smooth={true}>
          <div onClick={handleContent} className="contentButton">
            {showActive
              ? "Show Less"
              : content.trim().length < props.data.content.trim().length &&
                "Show More"}
          </div>
        </Scroll.Link>
      </div>

      <div className="postFooter">
        <PostFunctions handleLike={handleLike} likes={likeData} />
      </div>

      <CommentCreator id={props.data._id} addOne={addOne} />
      {commentData.length > 0 && <CommentSection comments={commentData} />}

      {loadingComments && <Comments />}
      {commentData.length > 0 && !reachedEnd && !loadingComments && (
        <div className="loadMore">
          <p onClick={handleComments}>Load More</p>
        </div>
      )}
      {reachedEnd && (
        <div
          style={{ marginTop: commentData.length === 0 && "1em" }}
          className="noMore"
        >
          <p>
            {commentData.length === 0 ? "No comments yet" : "No more comments"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Post;
