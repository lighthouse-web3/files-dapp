export const setFileData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "setFile",
      payload: data,
    });
  };
};

export const getFileData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "getFile",
      payload: data,
    });
  };
};
