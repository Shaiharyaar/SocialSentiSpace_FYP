import Axios from "axios";

const USER_API_BASE_URL = "http://localhost:3000/";

class axiosInstance {
  login(credentials) {
    return Axios.post(USER_API_BASE_URL + "users/login", credentials);
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
  logOut() {
    localStorage.removeItem("UserInfo");
    console.log("UserInfo: ", localStorage.getItem("UserInfo"));

    return true;
  }

  authenticate() {
    const data = JSON.parse(localStorage.getItem("UserInfo"));
    return Axios.get(USER_API_BASE_URL + "users/authenticate", data);
  }
  // getUserProducts() {
  //   return axios.get(
  //     USER_API_BASE_URL +
  //       `farmerProducts/?username=${this.getUserInfo().user.username}`,
  //     this.getAuthHeader()
  //   );
  // }

  // getProfile() {
  //   return axios.get(
  //     USER_API_BASE_URL + "users/" + this.getUserInfo().user.pk + "/",
  //     this.getAuthHeader()
  //   );
  // }

  // getDetailofProduct(productID) {
  //   console.log("detailofproduct: ", productID);
  //   return axios.get(
  //     USER_API_BASE_URL + "farmerProducts/" + productID + "/",
  //     this.getAuthHeader()
  //   );
  // }

  // addProduct(credentials) {
  //   return axios.post(
  //     USER_API_BASE_URL + "farmerProducts/",
  //     credentials,
  //     this.getAuthHeader()
  //   );
  // }
  // deleteproduct(itemid) {
  //   console.log("detailofproduct: ", itemid);
  //   return axios.delete(
  //     USER_API_BASE_URL + "farmerProducts/" + itemid + "/",
  //     this.getAuthHeader()
  //   );
  // }
  // updateproduct(itemid, data) {
  //   console.log("detailofproduct: ", itemid);
  //   return axios.put(
  //     USER_API_BASE_URL + "farmerProducts/" + itemid + "/",
  //     data,
  //     this.getAuthHeader()
  //   );
  // }

  // getVendorProducts() {
  //   return axios.get(
  //     USER_API_BASE_URL +
  //       `vendorProducts/?username=${this.getUserInfo().user.username}`,
  //     this.getAuthHeader()
  //   );
  // }
}

export default new axiosInstance();
