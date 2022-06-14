import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useDataLoad from "../../../hooks/useDataLoad";

const FriendLink = ({ id }) => {
  console.log(id);
  const { token } = useContext(AuthContext);
  const [profileData, refresh, loading] = useDataLoad(`user/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return (
    <div className="friendLink">
      {!loading && <img src={profileData.profilePic} />}
    </div>
  );
};

export default FriendLink;
