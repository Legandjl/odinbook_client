import FriendLink from "./FriendLink";

const FriendList = ({ friends }) => {
  const friendLinks = friends.slice(0, 7).map((friend) => {
    return <FriendLink id={friend} />;
  });
  return (
    <div className="friendsWrap">
      <div className="friendsHeader">Friends</div>
      <div className="friends">
        {friendLinks.length > 0 ? friendLinks : <p>User has no friends</p>}
      </div>
    </div>
  );
};

export default FriendList;
