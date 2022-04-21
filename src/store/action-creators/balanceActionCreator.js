export const setBalanceData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "setData",
      payload: data,
    });
  };
};

export const getBalanceData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "getData",
      payload: data,
    });
  };
};
