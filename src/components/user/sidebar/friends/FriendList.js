import FriendLink from "./FriendLink";

const FriendList = ({ friends }) => {
  const friendLinks = friends.slice(0, 7).map((friend) => {
    return <FriendLink id={friend} />;
  });
  return (
    <div className="friendsWrap">
      <div className="friendsHeader">Friends</div>
      <div className="friends">{friendLinks}</div>
    </div>
  );
};

export default FriendList;
