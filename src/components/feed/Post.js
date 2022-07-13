import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";
import { AuthContext } from "../../context/AuthContext";
import useDataLoad from "../../hooks/useDataLoad";
import useFetch from "../../hooks/useFetch";
import PostFunctions from "./PostFunctions";
var Scroll = require("react-scroll");

const Post = (props) => {
  const [fetchData, loadingData, error] = useFetch();
  const { token } = useContext(AuthContext);
  const [content, setContent] = useState(props.data.content.substring(0, 20));
  const [showActive, setShowActive] = useState(false);

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
    const url = `post/likes/${props.data._id}`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    };
    const like = await fetchData(url, options);
    console.log(like);
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
        <PostFunctions handleLike={handleLike} />
      </div>
      <ReactTextareaAutosize
        minRows={1}
        maxRows={6}
        placeholder="Write a comment.."
        style={{
          resize: "none",
          border: "none",
          outline: "none",
          borderRadius: "9px",
          padding: "9px",
          backgroundColor: "rgb(63, 62, 62)",
          color: "white",
          marginLeft: "1em",
          marginRight: "1em",
          marginBottom: "1em",
        }}
      />
    </div>
  );
};

export default Post;
