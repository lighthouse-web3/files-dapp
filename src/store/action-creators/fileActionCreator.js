export const setFileData = (data) => {
  //console.log(data, "inside ac");
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
