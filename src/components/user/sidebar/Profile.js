import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import FriendButton from "./FriendButton";

const Profile = (props) => {
  const { user } = useContext(AuthContext);

  console.log(props.isUserPage + " in profile");

  return (
    <div className="profile">
      <img className="profilePic" src={props.profileData.profilePic} />
      <div className="detailWrap">
        <p>Name: {props.profileData.fullName}</p>
        <p>Age:</p>
        <p>Gender:</p>
        <p>Location: </p>
        {!props.isUserPage && (
          <FriendButton
            refresh={props.refresh}
            friendStatus={props.friendStatus}
          />
        )}
      </div>
    </div>
  );
};
export default Profile;
