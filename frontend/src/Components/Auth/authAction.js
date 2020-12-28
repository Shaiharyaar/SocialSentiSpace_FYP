import axiosInstance from "../../jwt";
export const getuserimage = () => async (dispatch) => {
  await axiosInstance
    .getUSER()
    .then((res) => {
      console.log("hellloooo: ", res.data.newdata.image);
      debugger;
      dispatch({
        type: "userfound",
        payload: res.data.newdata.image,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const removeuserimage = () => async (dispatch) => {
  dispatch({
    type: "removeuser",
  });
};
