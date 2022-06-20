import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useShowMenu from "../../hooks/useShowMenu";
import FriendMenu from "./FriendMenu";

const HeaderFunctions = (props) => {
  const [showMenu, toggleOn, toggleOff, reset] = useShowMenu();
  const location = useLocation();

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  return (
    <div className="functionWrap">
      <i
        onClick={(e) => {
          !showMenu ? toggleOn(e) : toggleOff(e);
        }}
        style={{ position: "relative" }}
        class="ri-user-add-line"
      >
        {showMenu && <FriendMenu />}
      </i>
      <Link to={`user/${props.user._id}`}>
        <i class="ri-user-line"></i>
      </Link>
      <i onClick={props.logout} class="ri-logout-circle-line"></i>
    </div>
  );
};

export default HeaderFunctions;
