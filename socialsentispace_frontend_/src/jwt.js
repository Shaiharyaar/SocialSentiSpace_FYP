import Axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class axiosInstance {
  login(credentials) {
    return Axios.post(USER_API_BASE_URL + "users/login", credentials);
  }
  getuser(credentials) {
    return Axios.post(USER_API_BASE_URL + "users/getuser", credentials);
  }
  updatechips(credentials) {
    return Axios.post(USER_API_BASE_URL + "users/updatechips", credentials);
  }

  signup(credentials) {
    return Axios.post(USER_API_BASE_URL + "users/signup", credentials);
  }
  getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo"));
  }

  getAuthHeader() {
    return { headers: { Authorization: "bearer " + this.getUserInfo().token } };
  }
  getTwitterInfo() {
    return Axios.get(USER_API_BASE_URL + "dashboard/getTwitter");
  }
  getYoutubeInfo() {
    return Axios.get(USER_API_BASE_URL + "dashboard/getYoutube");
  }
  getInstagramInfo() {
    return Axios.get(USER_API_BASE_URL + "dashboard/getInstagram");
  }
  getFacebookInfo() {
    return Axios.get(USER_API_BASE_URL + "dashboard/getFacebook");
  }
  logOut() {
    localStorage.removeItem("UserInfo");
    console.log("UserInfo: ", localStorage.getItem("UserInfo"));

    return true;
  }

  authenticate() {
    const data = JSON.parse(localStorage.getItem("UserInfo"));
    return Axios.get(USER_API_BASE_URL + "users/authenticate", data);
  }
}
export default new axiosInstance();
