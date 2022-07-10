import { ThreeDots } from "react-loader-spinner";
import "./loaders.css";

const Submitting = () => {
  return (
    <div className="notifLoaderWrap">
      <ThreeDots color="black" height={15} width={15} />
    </div>
  );
};

export default Submitting;
