import FriendLink from "./FriendLink";

const Friends = ({ friends }) => {
  const friendLinks = friends.map((friend) => {
    return <FriendLink id={friend} />;
  });
  return (
    <div className="friendsWrap">
      <div className="friendsHeader">Friends</div>
      <div className="friends">{friendLinks}</div>
    </div>
  );
};

export default Friends;
