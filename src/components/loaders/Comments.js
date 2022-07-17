import { ThreeDots } from "react-loader-spinner";
import "./loaders.css";

const Comments = () => {
  return (
    <div className="commentsLoaderWrap">
      <ThreeDots color="white" height={30} width={30} />
    </div>
  );
};

export default Comments;
