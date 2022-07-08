import { useEffect } from "react";
import useImageLoader from "../../../../hooks/useImageLoader";
import FriendButton from "./FriendButton";

const Profile = (props) => {
  const [imageLoaded, loadImage, imageError] = useImageLoader();

  useEffect(() => {
    if (!imageLoaded) {
      loadImage(props.profileData.profilePic);
    }
  }, [imageLoaded, loadImage, props.profileData.profilePic]);
  //need imgloader on profilepic
  return (
    <div className="profile">
      {imageLoaded && (
        <img
          className="profilePic"
          src={props.profileData.profilePic}
          alt={"user display"}
        />
      )}
      <div className="detailWrap">
        <p>Name: {props.profileData.fullName}</p>
        <p>Gender: {props.profileData.gender}</p>
        <p>Location: {props.profileData.location} </p>
        {!props.isUserPage && (
          <FriendButton refresh={props.refresh} profile={props.profileData} />
        )}
      </div>
    </div>
  );
};
export default Profile;
