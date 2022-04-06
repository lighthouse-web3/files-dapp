const otherDataReducer = (state = null, action) => {
  switch (action.type) {
    case "setData":
      return action.payload;
    case "getData":
      return state;
    default:
      return state;
  }
};

export default otherDataReducer;
