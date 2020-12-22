import Axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

const MEDIA_API_BASE_URL = "http://localhost:8000/";

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
      await this.getYoutubeInfo(social_id).then((res) => {
        detail_id = res.data.result.VideoDetail._id;
        result_id = res.data.result.Result._id;
      });
      //deleting Twitter data
      await this.deleteyoutube(social_id)
        .then((res) => {
          console.log(res.body);
          if (res.status === 200) {
            console.log("Youtube data deleted.");
          } else {
            alert("Loading Youtube data not successful. Try Again!");
          }
        })
        .catch((error) => alert("Error loading chips"));

      //deleting youtube video data
      await this.deleteyoutubedetails(detail_id)
        .then((res) => {
          console.log(res.body);
          if (res.status === 200) {
            console.log("Latest Video data deleted.");
          } else {
            alert("Loading video data not successful. Try Again!");
          }
        })
        .catch((error) => alert("Error deleting video data"));
    } else if (media == "Facebook") {
      alert("Facebook");
      await this.getFacebookInfo(social_id).then((res) => {
        detail_id = res.data.result.postDetail._id;
        result_id = res.data.result.Result._id;
      });
      //deleting Facebook data
      await this.deletefacebook(social_id)
        .then((res) => {
          console.log(res.body);
          if (res.status === 200) {
            console.log("Facebook data deleted.");
          } else {
            alert("Deleting Facbook data not successful. Try Again!");
          }
        })
        .catch((error) => alert("Error Deleting Facebook data"));

      //deleting Facebook detail data
      await this.deleteFbDetails(detail_id)
        .then((res) => {
          console.log(res.body);
          if (res.status === 200) {
            console.log("Latest fb detail data deleted.");
          } else {
            alert("Deleting fb details data not successful. Try Again!");
          }
        })
        .catch((error) => alert("Error deleting fb detail data"));
    } else if (media == "Instagram") {
      await this.getInstagramInfo(social_id).then((res) => {
        detail_id = res.data.result.latestPost._id;
        result_id = res.data.result.Result._id;
      });
      //deleting Instagram data
      await this.deleteinstagram(social_id)
        .then((res) => {
          console.log(res.body);
          if (res.status === 200) {
            console.log("Instagram data deleted.");
          } else {
            alert("Deleting Instagram data not successful. Try Again!");
          }
        })
        .catch((error) => alert("Error Deleting Instagram data"));

      //deleting Facebook detail data
      await this.deleteInstaPost(detail_id)
        .then((res) => {
          console.log(res.body);
          if (res.status === 200) {
            console.log("Latest insta detail data deleted.");
          } else {
            alert("Deleting insta details data not successful. Try Again!");
          }
        })
        .catch((error) => alert("Error deleting insta detail data"));
    }

    // deleting Result data
    await this.deleteresult(result_id)
      .then((res) => {
        console.log(res.body);
        if (res.status === 200) {
          console.log("result data deleted.");
        } else {
          alert("Loading result was not successful. Try Again!");
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

  //--------------
  //UPDATING DATAA
  //--------------

  //Updating twiiter

  async updateTwitter(id, label) {
    console.log(label);
    var detail_id = "",
      result_id = "";

    await this.getTwitterInfo(id).then((res) => {
      detail_id = res.data.result.LatestTweet._id;
      result_id = res.data.result.Result._id;
    });

    //get new data (HARIS)
    var newdata = [];
    var Res = [];
    await this.loadtwitterinfo(label).then((res) => {
      newdata = res.data.Tweets;
      Res = res.data.Results;
    });

    const index = Math.floor(Math.random() * 12);

    var details = {
      id: detail_id,
      username: "@" + usernames[index],
      tweet: newdata[0].text,
      DateTime: newdata[0].date,
    };
    var result = {
      id: result_id,
      positive: Res["Positive"],
      neutral: Res["Neutral"],
      negative: Res["Negative"],
    };
    console.log(result);
    await this.updatetwitterdetails(details).then((res) => {
      console.log(res);
    });

    await this.updateresults(result).then((res) => {
      console.log(res);
    });
  }

  //Updating instagram

  async updateInstagram(id, Url) {
    var detail_id = "",
      result_id = "";

    await this.getInstagramInfo(id).then((res) => {
      detail_id = res.data.result.latestPost._id;
      result_id = res.data.result.Result._id;
    });

    //get new data (HARIS)
    var Res = [];
    var newdata = [];
    await this.loadinstagraminfo(Url).then((res) => {
      newdata = res.data;
      Res = res.data.Results;
    });
    var comm = [];

    newdata.Comments.forEach((comments) => {
      comm.push(comments);
    });

    const details = {
      id: detail_id,
      username: newdata.Usernames[0],
      postDetails: newdata.Post,
      DateTime: newdata.time[0],
    };
    var result = {
      id: result_id,
      positive: Res["Positive"],
      neutral: Res["Neutral"],
      negative: Res["Negative"],
    };
    console.log(result);

    await this.updateinstagramdetails(details).then((res) => {
      console.log(res);
    });

    await this.updateresults(result).then((res) => {
      console.log(res);
    });
  }

  //Updating facebook

  async updateFacebook(id, Url) {
    var detail_id = "",
      result_id = "";

    await this.getFacebookInfo(id).then((res) => {
      detail_id = res.data.result.postDetail._id;
      result_id = res.data.result.Result._id;
    });

    console.log(Url);
    //get new data
    var Res = [];
    var newdata = [];
    await this.loadfacebookinfo(Url).then((res) => {
      newdata = res.data;
      Res = res.data.Results;
    });

    var details = {
      id: detail_id,
      username: newdata.PageName,
      post: newdata.Posts[0],
      DateTime: newdata.Times[0],
    };

    var result = {
      id: result_id,
      positive: Res["Positive"],
      neutral: Res["Neutral"],
      negative: Res["Negative"],
    };
    await this.updatefacebookdetails(details).then((res) => {
      console.log(res);
    });

    await this.updateresults(result).then((res) => {
      console.log(res);
    });
  }

  //Updating youtube

  async updateYoutube(id, url) {
    console.log(url);
    var detail_id = "",
      result_id = "";

    await this.getYoutubeInfo(id).then((res) => {
      detail_id = res.data.result.VideoDetail._id;
      result_id = res.data.result.Result._id;
    });

    //get new data (HARIS)
    var newdata = [];
    var Res = [];
    await this.loadyoutubeinfo(url).then((res) => {
      newdata = res.data;
      Res = res.data.Results;
    });

    const details = {
      id: detail_id,
      youtuber: newdata.youtuber,
      videoURL: url,
      videoName: newdata.title,
      VideoDescription: newdata.description,
      DateTime: newdata.date,
    };
    console.log(details);
    var result = {
      id: result_id,
      positive: Res["Positive"],
      neutral: Res["Neutral"],
      negative: Res["Negative"],
    };
    await this.updateyoutubedetails(details).then((res) => {
      console.log(res);
    });

    await this.updateresults(result).then((res) => {
      console.log(res);
    });
  }

  updateinstagramdetails(body) {
    return Axios.post(
      USER_API_BASE_URL + "dashboard/updateinstagramdetails",
      body
    );
  }
  updatetwitterdetails(body) {
    return Axios.post(
      USER_API_BASE_URL + "dashboard/updatetwitterdetails",
      body
    );
  }
  updateyoutubedetails(body) {
    return Axios.post(
      USER_API_BASE_URL + "dashboard/updateyoutubedetails",
      body
    );
  }
  updatefacebookdetails(body) {
    return Axios.post(
      USER_API_BASE_URL + "dashboard/updatefacebookdetails",
      body
    );
  }
  updateresults(body) {
    return Axios.post(USER_API_BASE_URL + "dashboard/updateresult", body);
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

  deleteyoutube(id) {
    return Axios.post(USER_API_BASE_URL + "dashboard/deleteYoutube", {
      id: id,
    });
  }
  deleteyoutubedetails(id) {
    return Axios.post(USER_API_BASE_URL + "dashboard/deleteYoutubeDetails", {
      id: id,
    });
  }
  deletefacebook(id) {
    return Axios.post(USER_API_BASE_URL + "dashboard/deleteFacebook", {
      id: id,
    });
  }
  deleteFbDetails(id) {
    return Axios.post(USER_API_BASE_URL + "dashboard/deleteFbDetails", {
      id: id,
    });
  }
  deleteinstagram(id) {
    return Axios.post(USER_API_BASE_URL + "dashboard/deleteInstagram", {
      id: id,
    });
  }
  deleteInstaPost(id) {
    return Axios.post(USER_API_BASE_URL + "dashboard/deleteInstaPost", {
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

  //adding Twiiter Information

  async addtwitterinfo(label) {
    //get data on label
    var newdata = [];
    var Res = [];
    await this.loadtwitterinfo(label).then((res) => {
      newdata = res.data.Tweets;
      Res = res.data.Results;
    });

    const index = Math.floor(Math.random() * 12);

    var detail = {
      username: "@" + usernames[index],
      tweet: newdata[0].text,
      DateTime: newdata[0].date,
    };
    var result = {
      positive: Res["Positive"],
      neutral: Res["Neutral"],
      negative: Res["Negative"],
    };

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

  //adding youtube Information

  async addYoutubeinfo(url) {
    //get data on url

    var newdata = [];
    await this.loadyoutubeinfo(url).then((res) => {
      newdata = res.data;
    });

    const result = { positive: 10, negative: 50, neutral: 40 };
    const detail = {
      youtuber: newdata.youtuber,
      videoURL: url,
      videoName: newdata.title,
      VideoDescription: newdata.description,
      DateTime: newdata.date,
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

    const data = { topic: url, Result: resultid, VideoDetail: detailid };
    console.log("DATA: ", data);
    await this.addyoutube(data).then((res) => {
      if (res.status == 200) {
        id = res.data.result._id;
      }
    });

    return id;
  }

  //Adding facebook information

  async addFacebookinfo(label) {
    //get data on label

    const result = { positive: 10, negative: 50, neutral: 40 };

    const detail = {
      username: label,
      post: label,
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

    await this.addfacebookdetail(detail).then((res) => {
      if (res.status == 200) {
        detailid = res.data.result._id;
      }
    });

    const data = { postURL: label, Result: resultid, postDetail: detailid };
    await this.addfacebook(data).then((res) => {
      if (res.status == 200) {
        id = res.data.result._id;
      }
    });

    return id;
  }

  //Adding Instagram information

  async addInstagraminfo(Url) {
    //get data on label
    var Res = [];
    var newdata = [];
    await this.loadinstagraminfo(Url).then((res) => {
      newdata = res.data;
      Res = res.data.Results;
    });

    const detail = {
      username: newdata.Usernames[0],
      postDetails: newdata.Post,
      DateTime: newdata.time[0],
    };
    var result = {
      positive: Res["Positive"],
      neutral: Res["Neutral"],
      negative: Res["Negative"],
    };

    var resultid = "",
      detailid = "",
      id = "";

    await this.addresult(result).then((res) => {
      if (res.status == 200) {
        resultid = res.data.result._id;
      }
    });

    await this.addinstagramdetail(detail).then((res) => {
      if (res.status == 200) {
        detailid = res.data.result._id;
      }
    });

    const data = { hashtag: Url, Result: resultid, latestPost: detailid };
    await this.addinstagram(data).then((res) => {
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
  loadtwitterinfo(key) {
    return Axios.post(MEDIA_API_BASE_URL + "api/twitter/", { keyword: key });
  }
  loadyoutubeinfo(url) {
    return Axios.post(MEDIA_API_BASE_URL + "api/youtube/", { url: url });
  }
  loadinstagraminfo(url) {
    return Axios.post(MEDIA_API_BASE_URL + "api/instagram/", { url: url });
  }
  loadfacebookinfo(url) {
    return Axios.post(MEDIA_API_BASE_URL + "api/facebook/", { url: url });
  }
  authenticate() {
    const data = JSON.parse(localStorage.getItem("UserInfo"));
    return Axios.get(USER_API_BASE_URL + "users/authenticate", data);
  }
}

const usernames = [
  "GarryBurrito",
  "randomDude007",
  "TomScherbatsky",
  "Davidhellum",
  "Froyoyo",
  "WhoIsit?",
  "heyitssquawk",
  "RobertlikestoSleep",
  "CanofTrash",
  "LenaHerrera",
  "BoMet",
  "Markusmaybe?idfk",
];
export default new axiosInstance();
