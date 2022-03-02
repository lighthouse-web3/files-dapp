const nftReducer = (state = null, action) => {
  // action has two part action.type & action.payload
  switch (action.type) {
    case "setNFT":
      return action.payload;
    case "getNFT":
      return state;
    default:
      return state;
  }
};

export default nftReducer;
