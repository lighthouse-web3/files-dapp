const balanceReducer = (state = null, action) => {
  // action has two part action.type & action.payload
  switch (action.type) {
    case "setData":
      return action.payload;
    case "getData":
      return state;
    default:
      return state;
  }
};

export default balanceReducer;
