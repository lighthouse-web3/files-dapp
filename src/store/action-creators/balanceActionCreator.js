export const setBalanceData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "setBalanceData",
      payload: data,
    });
  };
};

export const getBalanceData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "getBalanceData",
      payload: data,
    });
  };
};
