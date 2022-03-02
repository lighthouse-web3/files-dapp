export const setNFTData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "setNFT",
      payload: data,
    });
  };
};

export const getNFTData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "getNFT",
      payload: data,
    });
  };
};
