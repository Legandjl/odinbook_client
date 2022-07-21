import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

const CommentMenu = (props) => {
  const [fetchData, fetchInProgress, error] = useFetch();
  const { token } = useContext(AuthContext);

  const handleDel = async () => {
    if (fetchInProgress) {
      return;
    }
    const url = `post/comment/${props.id}`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    };
    await fetchData(url, options);
    props.removeOne(props.id);
  };

  return (
    <div data-menu={true} className="commentMenu">
      <p onClick={handleDel} data-menu={true}>
        Delete
      </p>
    </div>
  );
};
export default CommentMenu;
