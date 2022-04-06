export const setOtherData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "setData",
      payload: data,
    });
  };
};

export const getOtherData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "getData",
      payload: data,
    });
  };
};
