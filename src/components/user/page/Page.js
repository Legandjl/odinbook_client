import React, { useContext, useEffect, useState } from "react";
import "../user.css";
import SideBar from "../sidebar/sidebar/SideBar";
import { AuthContext } from "../../../context/AuthContext";
import useDataLoad from "../../../hooks/useDataLoad";
import { useLocation, useParams } from "react-router-dom";

const Page = () => {
  const { id } = useParams();
  const [page_id, set_page_id] = useState(id);
  const { token } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(true);
  const [profileData, refreshProfile, loading] = useDataLoad(`user/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const location = useLocation();
  useEffect(() => {
    setRefreshing(true);
    if (!loading) {
      refreshProfile();
    }

    window.scrollTo(0, 0);
    setRefreshing(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  return (
    <div className="userPage">
      {!loading && !refreshing && (
        <SideBar profileData={profileData} refresh={refreshProfile} id={id} />
      )}
      <div className="feed"></div>
    </div>
  );
};

export default Page;
