const FriendButton = (props) => {
  return (
    <div className="social">
      <button onClick={props.friendStatus.handleFriendReq}>
        {props.friendStatus.friendStatus}
      </button>
    </div>
  );
};

export default FriendButton;
