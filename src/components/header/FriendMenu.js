import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import useDataLoad from "../../hooks/useDataLoad";

const FriendMenu = () => {
  const { token, user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [friendReqs, refresh, loading] = useDataLoad(`user/friend_request`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    // when user opens the friend request panel
    // set all notifications to viewed server siide
    socket.emit("setRequestsViewed", user._id);
    socket.on("setRequestsViewed", (res) => {
      // server emits refresh requests
      // update the requests
      // refresh()
      console.log(res);
    });
  }, [socket, user]);

  const requests = friendReqs.map((element) => {
    return (
      <div data-menu={true} className="friendReq">
        <Link to={`/user/${element.sender._id}`}>
          <p data-menu={true}>{element.sender.fullName}</p>
        </Link>
        <div data-menu={true} className="friendReqButtons">
          <button data-menu={true}>Accept</button>
          <button data-menu={true}>Decline</button>
        </div>
      </div>
    );
  });

  return (
    <div data-menu={true} className="friendMenu">
      {!loading ? (
        friendReqs.length === 0 ? (
          <p className="friendReq">No requests</p>
        ) : (
          requests
        )
      ) : (
        <p className="friendReq">Loading...</p>
      )}
    </div>
  );
};

export default FriendMenu;
