import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useFetch from "./useFetch";

const useHandleFriend = () => {
  const [fetchData, loading] = useFetch();
  const { token } = useContext(AuthContext);

  const handleFriendRequest = async (bool, req_id) => {
    const friendReqUrl = "user/friend_request/";
    await fetchData(`${friendReqUrl}${req_id}?accept=${bool}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    });
  };

  return [handleFriendRequest];
};

export default useHandleFriend;
