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
  getTwitterInfo(_id) {
    return Axios.post(USER_API_BASE_URL + "dashboard/getTwitter", {
      id: _id,
    });
  }
  getYoutubeInfo(_id) {
    return Axios.post(USER_API_BASE_URL + "dashboard/getYoutube", {
      id: _id,
    });
  }
  getInstagramInfo(_id) {
    return Axios.post(USER_API_BASE_URL + "dashboard/getInstagram", {
      id: _id,
    });
  }
  getFacebookInfo(_id) {
    return Axios.post(USER_API_BASE_URL + "dashboard/getFacebook", {
      id: _id,
    });
  }
  getchips(data) {
    return Axios.post(USER_API_BASE_URL + "dashboard/getChips", data);
  }
  addchips(data) {
    return Axios.post(USER_API_BASE_URL + "dashboard/setChips", data);
  }

  async delete_all(chipid, social_id, media) {
    var detail_id = "",
      result_id = "";

    if (media == "Twitter") {
      await this.getTwitterInfo(social_id).then((res) => {
        detail_id = res.data.result.LatestTweet._id;
        result_id = res.data.result.Result._id;
      });
      //deleting Twitter data
      await this.deletetwitter(social_id)
        .then((res) => {
          console.log(res.body);
          if (res.status === 200) {
            console.log("Twitter data deleted.");
          } else {
            alert("Loading Twitter data not successful. Try Again!");
          }
        })
        .catch((error) => alert("Error loading chips"));

      //deleting Latest Tweet data
      await this.deleteLatestTweet(detail_id)
        .then((res) => {
          console.log(res.body);
          if (res.status === 200) {
            console.log("Latest tweet data deleted.");
          } else {
            alert("Loading Latest tweet data not successful. Try Again!");
          }
        })
        .catch((error) => alert("Error loading chips"));
    } else if (media == "Youtube") {
    }
    // deleting Result data
    await this.deleteresult(result_id)
      .then((res) => {
        console.log(res.body);
        if (res.status === 200) {
          console.log("Latest tweet data deleted.");
        } else {
          alert("Loading Latest tweet data not successful. Try Again!");
        }
      })
      .catch((error) => alert("Error loading chips"));

    await this.deletechip(chipid)
      .then((res) => {
        console.log(res.body);
        if (res.status === 200) {
          console.log("Chip deleted.");
        } else {
          alert("Loading chips not successful. Try Again!");
        }
        console.log(res);
      })
      .catch((error) => alert("Error loading chips"));
  }

  deletetwitter(id) {
    return Axios.post(USER_API_BASE_URL + "dashboard/deleteTwitter", {
      id: id,
    });
  }
  deleteLatestTweet(id) {
    return Axios.post(USER_API_BASE_URL + "dashboard/deleteLatestTweet", {
      id: id,
    });
  }
  deletechip(id) {
    return Axios.post(USER_API_BASE_URL + "dashboard/deleteChips", {
      chipid: id,
    });
  }
  deleteresult(id) {
    return Axios.post(USER_API_BASE_URL + "dashboard/deleteResult", {
      id: id,
    });
  }

  logOut() {
    localStorage.removeItem("UserInfo");
    console.log("UserInfo: ", localStorage.getItem("UserInfo"));

    return true;
  }

  async addtwitterinfo(label) {
    //get data on label

    const result = { positive: 50, negative: 20, neutral: 30 };

    const detail = { username: label, tweet: label, DateTime: label };

    var resultid = "",
      detailid = "",
      twitterid = "";

    await this.addresult(result).then((res) => {
      if (res.status == 200) {
        resultid = res.data.result._id;
      }
    });

    await this.addtwitterdetail(detail).then((res) => {
      if (res.status == 200) {
        detailid = res.data.result._id;
      }
    });

    const data = { trend: label, Result: resultid, LatestTweet: detailid };
    await this.addtwitter(data).then((res) => {
      if (res.status == 200) {
        twitterid = res.data.result._id;
      }
    });

    return twitterid;
  }

  async addYoutubeinfo(label) {
    //get data on label

    const result = { positive: 10, negative: 50, neutral: 40 };
    const url = "https://www.youtube.com/watch?v=9TfbfS7dbKc";
    const detail = {
      youtuber: label,
      videoURL: url,
      videoName: label,
      VideoDescription: label,
      DateTime: label,
    };

    var resultid = "",
      detailid = "",
      id = "";

    await this.addresult(result).then((res) => {
      if (res.status == 200) {
        resultid = res.data.result._id;
      }
    });

    await this.addyoutubedetail(detail).then((res) => {
      if (res.status == 200) {
        detailid = res.data.result._id;
      }
    });

    const data = { topic: label, Result: resultid, VideoDetail: detailid };
    await this.addyoutube(data).then((res) => {
      if (res.status == 200) {
        id = res.data.result._id;
      }
    });

    return id;
  }

  addresult(result) {
    return Axios.post(USER_API_BASE_URL + "dashboard/setResult", result);
  }
  addtwitterdetail(detail) {
    return Axios.post(USER_API_BASE_URL + "dashboard/setLatestTweet", detail);
  }
  addtwitter(data) {
    return Axios.post(USER_API_BASE_URL + "dashboard/setTwitter", data);
  }

  addyoutube(data) {
    return Axios.post(USER_API_BASE_URL + "dashboard/setYoutube", data);
  }
  addyoutubedetail(detail) {
    return Axios.post(USER_API_BASE_URL + "dashboard/setVideodetails", detail);
  }

  addinstagram(data) {
    return Axios.post(USER_API_BASE_URL + "dashboard/setInstagram", data);
  }

  addinstagramdetail(detail) {
    return Axios.post(USER_API_BASE_URL + "dashboard/setInstaDetails", detail);
  }

  addfacebook(data) {
    return Axios.post(USER_API_BASE_URL + "dashboard/setFacebook", data);
  }
  addfacebookdetail(detail) {
    return Axios.post(USER_API_BASE_URL + "dashboard/setfbDetails", detail);
  }

  authenticate() {
    const data = JSON.parse(localStorage.getItem("UserInfo"));
    return Axios.get(USER_API_BASE_URL + "users/authenticate", data);
  }
}
export default new axiosInstance();
