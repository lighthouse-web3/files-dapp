export const setSideBarClosed = (data) => {
  return (dispatch) => {
    dispatch({
      type: "setSidebarClosed",
      payload: data,
    });
  };
};

export const getSidebarClosed = (data) => {
  return (dispatch) => {
    dispatch({
      type: "getSidebarClosed",
      payload: data,
    });
  };
};
