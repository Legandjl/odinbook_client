import { ThreeDots } from "react-loader-spinner";
import "./loaders.css";

const Notifications = () => {
  return (
    <div className="notifLoaderWrap">
      <ThreeDots color="white" height={30} width={30} />
    </div>
  );
};

export default Notifications;
