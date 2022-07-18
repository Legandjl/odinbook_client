import React, { useContext, useEffect, useState } from "react";
import "../user.css";
import SideBar from "../sidebar/sidebar/SideBar";
import { AuthContext } from "../../../context/AuthContext";
import useDataLoad from "../../../hooks/useDataLoad";
import { useLocation, useParams } from "react-router-dom";
import SidebarLoader from "../../loaders/SidebarLoader";
import Feed from "../../feed/Feed";
import usePaginate from "../../../hooks/usePaginate";
import useScroll from "../../../hooks/useScroll";

const Page = () => {
  const { id } = useParams();
  const [toSkip, setToSkip] = useState(0);
  const { token } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(true);
  const [bottom, reset] = useScroll();
  const [profileData, refreshProfile, loading] = useDataLoad(`user/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const [posts, refreshPosts, loadingPosts, reachedEnd, resetPosts, addOne] =
    usePaginate(
      `post/wall/${id}/${toSkip}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      },
      setToSkip
    );

  useEffect(() => {
    if (bottom && !reachedEnd && !loadingPosts) {
      refreshPosts();
      reset();
    }
  }, [bottom, loadingPosts, reachedEnd, refreshPosts, reset]);
  const location = useLocation();

  useEffect(() => {
    setRefreshing(true);
    if (!loading) {
      refreshProfile();
      setToSkip(0);
      resetPosts();
      refreshPosts();
    }
    window.scrollTo(0, 0);
    setRefreshing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  return (
    <div className="userPage">
      <div className="sidebarDummy"></div>
      {!loading && !refreshing ? (
        <SideBar profileData={profileData} refresh={refreshProfile} id={id} />
      ) : (
        <SidebarLoader />
      )}
      <Feed
        posts={posts}
        addOne={addOne}
        reachedEnd={reachedEnd}
        loading={loadingPosts}
      />
    </div>
  );
};

export default Page;
