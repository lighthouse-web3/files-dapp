const otherDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "setData":
      return { ...state, ...action.payload };
    case "getData":
      return state;
    default:
      return state;
  }
};

export default otherDataReducer;
