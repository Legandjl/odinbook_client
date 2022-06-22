const useHandleFriend = () => {
  const handleFriendRequest = async (bool) => {
    console.log(bool);
  };

  return [handleFriendRequest];
};

export default useHandleFriend;
