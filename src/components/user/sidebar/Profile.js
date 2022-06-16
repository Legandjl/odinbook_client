import { DateTime } from "luxon";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import FriendButton from "./FriendButton";

const Profile = (props) => {
  return (
    <div className="profile">
      <img className="profilePic" src={props.profileData.profilePic} />
      <div className="detailWrap">
        <p>Name: {props.profileData.fullName}</p>

        <p>Gender: {props.profileData.gender}</p>
        <p>Location: {props.profileData.location} </p>
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
