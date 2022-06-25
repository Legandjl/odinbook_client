import { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { SocketContext } from "../../../../context/SocketContext";
import useImageCrop from "../../../../hooks/useImageCrop";
import FilePicker from "../../../filepicker/FilePicker";
import CropTool from "../../../uploader/CropTool";

import FriendList from "../friends/FriendList";
import Profile from "../profile/Profile";

const SideBar = (props) => {
  const [loadImage, imageSrc, toggleCrop, startCrop, isCropping] =
    useImageCrop();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const isUserPage = props.profileData._id === user._id;
  const { socket } = useContext(SocketContext);
  let location = useLocation();

  console.log(id + "overall id");

  //listen for emit of friendrefresh here
  // then the button will change and friends list will update

  useEffect(() => {
    console.log(id + "page id");
    socket.on("refreshNotifications", async (pid) => {
      if (props.id === pid) {
        console.log(pid + "post id");

        props.refresh();
      }
    });
    return () => {
      console.log("returning");
      socket.off();
    };
  }, [id, location, props, socket]);

  // filepicker triggers start crop
  // startcrop sets is cropping & imagesrc
  // iscropping sets croptool to display with src as imagesrc
  // then croptool handles upload and sets is cropping to false
  // which closes the window

  /* 
        <FilePicker startCrop={startCrop} />
      {isCropping && (
        <CropTool
          image={imageSrc}
          toggleCrop={toggleCrop}
          loadImage={loadImage}
        />
      )}{" "}
    */

  return (
    <div className={"userSideBar"}>
      <Profile
        profileData={props.profileData}
        refresh={props.refresh}
        friendStatus={props.friendStatus}
        isUserPage={isUserPage}
      />
      <FriendList friends={props.profileData.friends} />
    </div>
  );
};

export default SideBar;
