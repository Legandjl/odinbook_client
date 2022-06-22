const SocialMenu = (props) => {
  const getInner = () => {
    // eslint-disable-next-line default-case
    switch (props.status) {
      case props.statusList[0]:
        return (
          <p data-menu={true} onClick={props.handleFriendReq}>
            Remove Friend
          </p>
        );
      case props.statusList[1]:
        return (
          <p data-menu={true} onClick={props.handleFriendReq}>
            Cancel Friend Request
          </p>
        );
      case props.statusList[3]:
        return (
          <div className="innerFriendReq">
            <p
              data-menu={true}
              onClick={(e) => {
                props.handleFriendReq(true);
              }}
            >
              Accept Friend Request
            </p>
            <p
              data-menu={true}
              onClick={(e) => {
                props.handleFriendReq(false);
              }}
            >
              Decline Friend Request
            </p>
          </div>
        );
    }
  };
  return (
    <div data-menu={true} className="socialMenu">
      <div className="socialMenuInner">{getInner()}</div>
    </div>
  );
};
export default SocialMenu;
