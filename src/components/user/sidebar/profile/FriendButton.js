import useSocial from "../../../../hooks/useSocial";
import useShowMenu from "../../../../hooks/useShowMenu";
import SocialMenu from "./SocialMenu";

const FriendButton = (props) => {
  const [loadingFriendStatus, handleFriendReq, status, statusList] = useSocial(
    props.refresh,
    props.profile.friends
  );
  const [showMenu, toggleOn, toggleOff, reset] = useShowMenu();

  //possible statuses

  /*
   [
    "Friends",
    "Friend Request Sent",
    "Send Friend Request",
    "Respond to Request",
  ];
    */

  //show social menu onclick depending on state

  return (
    <div className="social">
      {!loadingFriendStatus && (
        <button
          disabled={!status}
          className="friendButton"
          onClick={
            status === statusList[2]
              ? handleFriendReq
              : !showMenu
              ? toggleOn
              : toggleOff
          }
        >
          {status !== null ? status : "..."}
        </button>
      )}
      {showMenu && (
        <SocialMenu
          handleFriendReq={handleFriendReq}
          status={status}
          statusList={statusList}
        />
      )}
    </div>
  );
};

export default FriendButton;
