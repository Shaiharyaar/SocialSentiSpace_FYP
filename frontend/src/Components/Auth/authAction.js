import axiosInstance from "../../jwt";
export const getuserimage = () => async (dispatch) => {
  await axiosInstance
    .getUSER()
    .then((res) => {
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
