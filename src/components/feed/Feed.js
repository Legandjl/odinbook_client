import "./feed.css";
import Post from "./Post";
import PostCreator from "./PostCreator";

const Feed = (props) => {
  const posts = props.posts.map((item, i) => {
    return <Post key={item._id} data={item} />;
  });

  return (
    <div className="feed">
      <PostCreator addOne={props.addOne} reset={props.reset} />
      {posts}
      {props.reachedEnd && <p style={{}}>NO MORE POSTS</p>}
      {props.loading && <p>loading..</p>}
    </div>
  );
};

export default Feed;
