const fileReducer = (state = null, action) => {
  // action has two part action.type & action.payload
  switch (action.type) {
    case "setFile":
      return action.payload;
    case "getFile":
      return state;
    default:
      return state;
  }
};

export default fileReducer;
