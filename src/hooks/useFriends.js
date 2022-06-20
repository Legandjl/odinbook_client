import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useFetch from "./useFetch";

const UseFriends = (refreshProfile, friendList) => {
  const [loading, setLoading] = useState(true);
  const { token, user } = useContext(AuthContext);
  const { id } = useParams();
  const [requestState, setRequestState] = useState(null);
  // check if friends, then if not check if fr sent
  const [fetchData, fetchInProgress, error] = useFetch();
  const friendReqUrl = "user/friend_request/";
  const [requestStateList] = useState([
    "Friends",
    "Request Pending",
    "Add Friend",
  ]);

  useEffect(() => {
    const checkFriendStatus = async () => {
      setLoading(true);
      const friend_req_sent = await fetchData(`${friendReqUrl}${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      // if app user is in the friends list of the user profile being viewed
      if (friendList.indexOf(user._id) > -1) {
        setRequestState(requestStateList[0]);
        // if there is a friend request pending
      } else if (friend_req_sent) {
        setRequestState(requestStateList[1]);
        // if neither
      } else {
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

  const handleFriendReq = async (type) => {
    switch (requestState) {
      case requestStateList[0]:
        console.log("removing");
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
      default:
        return;
      //emit refreshNotifications
      // refresh profile
    }
    refreshProfile();
  };

  return [loading, handleFriendReq, requestState];
};

export default UseFriends;
