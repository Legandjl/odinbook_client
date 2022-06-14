import FriendLink from "./FriendLink";

const Friends = ({ friends }) => {
  /*
  console.log(friends);
  const friends2 = [];
  for (let x = 0; x < 6; x++) {
    friends2.push(friends[0]);
    console.log(x);
  }
  const friendLinks = friends2.map((friend) => {
    return <FriendLink id={friend._id} />;
  }); */
  return (
    <div className="friendsWrap">
      <div className="friendsHeader">Friends</div>
      <div className="friends"></div>
    </div>
  );
};

export default Friends;
