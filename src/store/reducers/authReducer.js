const authReducer = (state = null, action) => {
  // action has two part action.type & action.payload
  switch (action.type) {
    case "login":
      return (state = action.payload);
    case "logout":
      return (state = null);
    default:
      return state;
  }
};

export default authReducer;
