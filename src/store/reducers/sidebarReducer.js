const sideBarReducer = (state = false, action) => {
  // action has two part action.type & action.payload
  switch (action.type) {
    case "setSidebarClosed":
      return action.payload;
    case "getSidebarClosed":
      return state;
    default:
      return state;
  }
};

export default sideBarReducer;
