import React, { useContext, useEffect } from "react";
import "../user.css";
import SideBar from "../sidebar/SideBar";
import { AuthContext } from "../../../context/AuthContext";
import useDataLoad from "../../../hooks/useDataLoad";
import { useLocation, useParams } from "react-router-dom";
import UseFriends from "../../../hooks/useFriends";

const Page = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [profileData, refreshProfile, loading] = useDataLoad(`user/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const [loadingFriendStatus, handleFriendReq, friendStatus] =
    UseFriends(refreshProfile);

  const location = useLocation();
  useEffect(() => {
    if (!loading) {
      refreshProfile();
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  return (
    <div className="userPage">
      {!loading && !loadingFriendStatus && (
        <SideBar
          profileData={profileData}
          refresh={refreshProfile}
          friendStatus={{
            handleFriendReq,
            friendStatus,
          }}
        />
      )}
      <div className="feed"></div>
    </div>
  );
};

export default Page;
