import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useDataLoad from "../../hooks/useDataLoad";
import useFetch from "../../hooks/useFetch";
import CommentCreator from "./CommentCreator";
import CommentSection from "./CommentSection";
import PostFunctions from "./PostFunctions";
import usePaginate from "../../hooks/usePaginate";
var Scroll = require("react-scroll");

const Post = (props) => {
  const [fetchData, loadingData, error] = useFetch();
  const { token } = useContext(AuthContext);
  const [content, setContent] = useState(props.data.content.substring(0, 20));
  const [showActive, setShowActive] = useState(false);
  const [toSkip, setToSkip] = useState(0);

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

  const [likeData, refreshLikes, loadingLikes] = useDataLoad(
    `post/likes/${props.data._id}`,
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

  const handleLike = async () => {
    if (loadingLikes) {
      return;
    }
    const url = `post/likes/${props.data._id}`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    };
    await fetchData(url, options);
    refreshLikes();
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
      {commentData.length > 0 && <CommentSection comments={commentData} />}
      {commentData.length > 0 && !reachedEnd && (
        <div onClick={handleComments} className="loadMore">
          <p>Load More</p>
        </div>
      )}
      <CommentCreator id={props.data._id} />
    </div>
  );
};

export default Post;
