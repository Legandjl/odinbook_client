import UseFriends from "../../../../hooks/useFriends";

const FriendButton = (props) => {
  const [loadingFriendStatus, handleFriendReq, status] = UseFriends(
    props.refresh,
    props.profile.friends
  );

  return (
    <div className="social">
      {!loadingFriendStatus && (
        <button className="friendButton" onClick={handleFriendReq}>
          {status !== null ? status : "..."}
        </button>
      )}
    </div>
  );
};

export default FriendButton;
