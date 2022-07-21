import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import useDataLoad from "../../hooks/useDataLoad";
import Notifications from "../loaders/Notifications";

const FriendMenu = () => {
  const { token, user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [friendReqs, refresh, loading] = useDataLoad(`user/friend_request`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  //pass in cb to set error true if there any problems
  // then display an error component

  useEffect(() => {
    socket.on("refreshNotifications", async () => {
      refresh();
    });
    return () => {
      socket.off("refreshNotifications");
    };
  }, [refresh, socket]);

  const requests = friendReqs.map((element) => {
    return (
      <div key={element._id} data-menu={true} className="friendReq">
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
          <p className="noFriends">No requests</p>
        ) : (
          requests
        )
      ) : (
        <Notifications />
      )}
    </div>
  );
};

export default FriendMenu;
