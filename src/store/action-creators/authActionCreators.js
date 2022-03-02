export const setAuthData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "login",
      payload: data,
    });
  };
};

export const removeAuthData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "logout",
      payload: data,
    });
  };
};
