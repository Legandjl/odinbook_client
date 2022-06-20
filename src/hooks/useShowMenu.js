import { useEffect, useRef, useState } from "react";

const useShowMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.dataset.menu && e.target !== menuRef.current) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  const toggleOn = (e) => {
    setShowMenu(true);
    menuRef.current = e.target;
  };

  const toggleOff = (e) => {
    if (!e.target.dataset.menu) {
      setShowMenu(false);
    }
  };

  const reset = () => {
    menuRef.current = null;
    setShowMenu(false);
  };

  return [showMenu, toggleOn, toggleOff, reset];
};

export default useShowMenu;
