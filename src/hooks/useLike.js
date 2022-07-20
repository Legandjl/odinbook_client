import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useDataLoad from "./useDataLoad";
import useFetch from "./useFetch";

const useLike = (id) => {
  const { token, user } = useContext(AuthContext);
  const [fetchData, loadingData, error] = useFetch();
  const [likeData, refreshLikes, loadingLikes] = useDataLoad(
    `post/likes/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const liked = likeData.some((like) => {
    return like.user === user._id;
  });

  const handleLike = async () => {
    if (loadingLikes) {
      return;
    }
    const url = `post/likes/${id}`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    };
    await fetchData(url, options);
    refreshLikes();
  };

  return [handleLike, liked, likeData, refreshLikes];
};

export default useLike;
