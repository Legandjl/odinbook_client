import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";
import useFetch from "./useFetch";
import useHandleFriend from "./useHandleFriend";

const useSocial = (refreshProfile, friendList) => {
  const [loading, setLoading] = useState(true);
  const { token, user } = useContext(AuthContext);
  const { id } = useParams();
  const [requestState, setRequestState] = useState(null);
  const [friendRequestId, setFriendRequestId] = useState(null);
  const { socket } = useContext(SocketContext);

  const [fetchData, fetchInProgress, error] = useFetch();
  const [handleFriendReq] = useHandleFriend();
  const friendReqUrl = "user/friend_request/";
  const [requestStateList] = useState([
    "Friends",
    "Request Pending",
    "Send Friend Request",
    "Respond to Request",
  ]);

  useEffect(() => {
    // check if friends, then if not check if fr sent
    const checkFriendStatus = async () => {
      setLoading(true);
      const friend_req = await fetchData(`${friendReqUrl}${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      // if app user is in the friends list of the user profile being viewed
      if (friendList.indexOf(user._id) > -1) {
        setRequestState(requestStateList[0]);
      } else if (friend_req !== false) {
        setFriendRequestId(friend_req._id);

        // friend request pending
        if (friend_req.sender === user._id) {
          // user is the sender of the friend request
          setRequestState(requestStateList[1]);
        } else {
          //user is the recipient of the friend request
          setRequestState(requestStateList[3]);
        }
      } else {
        // no friend req exists and users aren't friends
        // only available path is to allow friend request sending
        setRequestState(requestStateList[2]);
      }
      setLoading(false);
    };
    if (loading && !fetchInProgress) {
      checkFriendStatus();
    } else {
      setLoading(false);
    }
  }, [
    fetchData,
    fetchInProgress,
    friendList,
    id,
    loading,
    requestStateList,
    token,
    user._id,
  ]);

  const handleClick = async (bool) => {
    // eslint-disable-next-line default-case
    switch (requestState) {
      case requestStateList[0]:
        // /friend/:id
        await fetchData(`user/friend/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "DELETE",
        });
        break;
      case requestStateList[1]:
        await fetchData(`${friendReqUrl}${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "DELETE",
        });
        break;
      case requestStateList[2]:
        await fetchData(`${friendReqUrl}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: JSON.stringify({ recipient: id }),
        });
        break;
      case requestStateList[3]:
        await handleFriendReq(bool, friendRequestId, id);
        break;
    }
    // emit refreshNotifications
    // refresh profile

    socket.emit("refreshNotifications", id, user._id);

    refreshProfile();
  };

  return [loading, handleClick, requestState, requestStateList];
};

export default useSocial;
