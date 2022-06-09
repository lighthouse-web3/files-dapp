const balanceReducer = (state = null, action) => {
  // action has two part action.type & action.payload
  switch (action.type) {
    case "setBalanceData":
      return action.payload;
    case "getBalanceData":
      return state;
    default:
      return state;
  }
};

export default balanceReducer;
