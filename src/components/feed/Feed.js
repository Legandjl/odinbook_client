import "./feed.css";
import PostCreator from "./PostCreator";

const Feed = (props) => {
  // posts should be passed in through props
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const posts = props.posts.map((item) => {
    return <div className="post">{`post ${item}`}</div>;
  });
  return (
    <div className="feed">
      <PostCreator />
      {posts}
    </div>
  );
};

export default Feed;
