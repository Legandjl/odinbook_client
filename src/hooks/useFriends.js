import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useFetch from "./useFetch";

const UseFriends = (refreshProfile) => {
  const [requestPending, setRequestPending] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token, user } = useContext(AuthContext);
  const { id } = useParams();
  const [isFriends, setIsFriends] = useState(user.friends.indexOf(id) > -1);
  // check if friends, then if not check if fr sent
  const [fetchData, fetchInProgress, error] = useFetch();
  const friendStatus = isFriends
    ? "Friends"
    : requestPending
    ? "Request Pending"
    : "Add Friend";
  useEffect(() => {
    const checkFriendStatus = async () => {
      const friend_req_sent = await fetchData(`user/friend_request/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequestPending(friend_req_sent);
      setLoading(false);
    };
    if (loading && !fetchInProgress && !isFriends) {
      checkFriendStatus();
    } else {
      setLoading(false);
    }
  }, [fetchData, fetchInProgress, id, isFriends, loading, token]);

  const handleFriendReq = (type) => {
    const test = isFriends ? "remove" : requestPending ? "cancel" : "add";
    switch (test) {
      case "remove":
        console.log("remove");
        break;
      case "add":
        console.log("add");
        break;
      case "cancel":
        console.log("cancel");
        break;
      default:
        console.log("No value found");
    }
    refreshProfile();
  };

  return [loading, handleFriendReq, friendStatus];
};

export default UseFriends;
