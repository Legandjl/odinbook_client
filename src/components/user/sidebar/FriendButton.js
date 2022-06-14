const FriendButton = (props) => {
  return (
    <div className="social">
      <button
        onClick={() =>
          props.friendStatus.handleFriendReq(
            props.friendStatus.isFriends
              ? "remove"
              : props.friendStatus.requestPending
              ? "cancel"
              : "add"
          )
        }
      >
        {props.friendStatus.isFriends
          ? "Friends"
          : props.friendStatus.requestPending
          ? "Request Pending"
          : "Add Friend"}
      </button>
    </div>
  );
};

export default FriendButton;
