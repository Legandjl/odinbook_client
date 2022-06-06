import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import Uploady from "@rpldy/uploady";
import ImagePreview from "../../../images/ImagePreview";

const ProfilePic = () => {
  return (
    <Uploady destination={{ url: "https://my-server.com/upload" }}>
      <UploadPreview
        PreviewComponent={ImagePreview}
        fallbackUrl="https://icon-library.net/images/image-placeholder-icon/image-placeholder-icon-6.jpg"
      />

      <UploadButton />
    </Uploady>
  );
};
//https://codesandbox.io/s/ywx32nz40z

export default ProfilePic;
