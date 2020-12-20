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

    var data = "newTwitter";

    var details = {
      id: detail_id,
      username: data,
      tweet: data,
      DateTime: data,
    };
    var result = { id: result_id, positive: 10, neutral: 50, negative: 40 };

    await this.updatetwitterdetails(details).then((res) => {
      console.log(res);
    });

    await this.updateresults(result).then((res) => {
      console.log(res);
    });
  }

  //Updating instagram

  async updateInstagram(id, label) {
    console.log(label);
    var detail_id = "",
      result_id = "";

    await this.getInstagramInfo(id).then((res) => {
      detail_id = res.data.result.latestPost._id;
      result_id = res.data.result.Result._id;
    });

    //get new data (HARIS)

    var _label = "newInstagram";

    var details = {
      id: detail_id,
      username: _label,
      postDetails: _label,
      DateTime: _label,
    };
    var result = { id: result_id, positive: 10, neutral: 50, negative: 40 };

    await this.updateinstagramdetails(details).then((res) => {
      console.log(res);
    });

    await this.updateresults(result).then((res) => {
      console.log(res);
    });
  }

  //Updating facebook

  async updateFacebook(id, label) {
    console.log(label);
    var detail_id = "",
      result_id = "";

    await this.getFacebookInfo(id).then((res) => {
      detail_id = res.data.result.postDetail._id;
      result_id = res.data.result.Result._id;
    });

    //get new data (HARIS)

    var _label = "newFacebook";

    var details = {
      id: detail_id,
      username: _label,
      post: _label,
      DateTime: _label,
    };
    var result = { id: result_id, positive: 10, neutral: 50, negative: 40 };

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

    var label = "newYoutube";

    var details = {
      id: detail_id,
      youtuber: label,
      videoURL: url,
      videoName: label,
      VideoDescription: label,
      DateTime: label,
    };
    var result = { id: result_id, positive: 10, neutral: 50, negative: 40 };

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

  //adding youtube Information

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

  async addInstagraminfo(label) {
    //get data on label

    const result = { positive: 10, negative: 50, neutral: 40 };

    const detail = {
      username: label,
      postDetails: label,
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

    await this.addinstagramdetail(detail).then((res) => {
      if (res.status == 200) {
        detailid = res.data.result._id;
      }
    });

    const data = { hashtag: label, Result: resultid, latestPost: detailid };
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

  authenticate() {
    const data = JSON.parse(localStorage.getItem("UserInfo"));
    return Axios.get(USER_API_BASE_URL + "users/authenticate", data);
  }
  getcommentlist() {
    const commentlist = [
      "this is a thank u for helping with my modules and spending time with me :,) @UshiWakaChannnn the link to the among us edited pic:https://pinterest.ph/pin/742671794799328083/",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "God that was some of the best among us matches I ever played thanks @serketron for having me",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "Among us in the switch is *chefs kisses*",
      "me returning to among us",
      "i pirated among us today. felt good. but no one to play with.",
      "@InnerslothDevs hello I just wanted to ask I made an order for my girlfriend and we're just starting our relationship and I made this little among us art because that's where we met what do you think?",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "this is a thank u for helping with my modules and spending time with me :,) @UshiWakaChannnn the link to the among us edited pic:https://pinterest.ph/pin/742671794799328083/",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "God that was some of the best among us matches I ever played thanks @serketron for having me",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "Among us in the switch is *chefs kisses*",
      "me returning to among us",
      "i pirated among us today. felt good. but no one to play with.",
      "@InnerslothDevs hello I just wanted to ask I made an order for my girlfriend and we're just starting our relationship and I made this little among us art because that's where we met what do you think?",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "this is a thank u for helping with my modules and spending time with me :,) @UshiWakaChannnn the link to the among us edited pic:https://pinterest.ph/pin/742671794799328083/",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "God that was some of the best among us matches I ever played thanks @serketron for having me",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "Among us in the switch is *chefs kisses*",
      "me returning to among us",
      "i pirated among us today. felt good. but no one to play with.",
      "@InnerslothDevs hello I just wanted to ask I made an order for my girlfriend and we're just starting our relationship and I made this little among us art because that's where we met what do you think?",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "this is a thank u for helping with my modules and spending time with me :,) @UshiWakaChannnn the link to the among us edited pic:https://pinterest.ph/pin/742671794799328083/",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "God that was some of the best among us matches I ever played thanks @serketron for having me",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "Among us in the switch is *chefs kisses*",
      "me returning to among us",
      "i pirated among us today. felt good. but no one to play with.",
      "@InnerslothDevs hello I just wanted to ask I made an order for my girlfriend and we're just starting our relationship and I made this little among us art because that's where we met what do you think?",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "this is a thank u for helping with my modules and spending time with me :,) @UshiWakaChannnn the link to the among us edited pic:https://pinterest.ph/pin/742671794799328083/",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "God that was some of the best among us matches I ever played thanks @serketron for having me",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "Among us in the switch is *chefs kisses*",
      "me returning to among us",
      "i pirated among us today. felt good. but no one to play with.",
      "@InnerslothDevs hello I just wanted to ask I made an order for my girlfriend and we're just starting our relationship and I made this little among us art because that's where we met what do you think?",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "this is a thank u for helping with my modules and spending time with me :,) @UshiWakaChannnn the link to the among us edited pic:https://pinterest.ph/pin/742671794799328083/",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "God that was some of the best among us matches I ever played thanks @serketron for having me",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "Among us in the switch is *chefs kisses*",
      "me returning to among us",
      "i pirated among us today. felt good. but no one to play with.",
      "@InnerslothDevs hello I just wanted to ask I made an order for my girlfriend and we're just starting our relationship and I made this little among us art because that's where we met what do you think?",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "this is a thank u for helping with my modules and spending time with me :,) @UshiWakaChannnn the link to the among us edited pic:https://pinterest.ph/pin/742671794799328083/",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "God that was some of the best among us matches I ever played thanks @serketron for having me",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "Among us in the switch is *chefs kisses*",
      "me returning to among us",
      "i pirated among us today. felt good. but no one to play with.",
      "@InnerslothDevs hello I just wanted to ask I made an order for my girlfriend and we're just starting our relationship and I made this little among us art because that's where we met what do you think?",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "this is a thank u for helping with my modules and spending time with me :,) @UshiWakaChannnn the link to the among us edited pic:https://pinterest.ph/pin/742671794799328083/",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "God that was some of the best among us matches I ever played thanks @serketron for having me",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "Among us in the switch is *chefs kisses*",
      "me returning to among us",
      "i pirated among us today. felt good. but no one to play with.",
      "@InnerslothDevs hello I just wanted to ask I made an order for my girlfriend and we're just starting our relationship and I made this little among us art because that's where we met what do you think?",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "this is a thank u for helping with my modules and spending time with me :,) @UshiWakaChannnn the link to the among us edited pic:https://pinterest.ph/pin/742671794799328083/",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "God that was some of the best among us matches I ever played thanks @serketron for having me",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "Among us in the switch is *chefs kisses*",
      "me returning to among us",
      "i pirated among us today. felt good. but no one to play with.",
      "@InnerslothDevs hello I just wanted to ask I made an order for my girlfriend and we're just starting our relationship and I made this little among us art because that's where we met what do you think?",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "this is a thank u for helping with my modules and spending time with me :,) @UshiWakaChannnn the link to the among us edited pic:https://pinterest.ph/pin/742671794799328083/",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "God that was some of the best among us matches I ever played thanks @serketron for having me",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "Among us in the switch is *chefs kisses*",
      "me returning to among us",
      "i pirated among us today. felt good. but no one to play with.",
      "@InnerslothDevs hello I just wanted to ask I made an order for my girlfriend and we're just starting our relationship and I made this little among us art because that's where we met what do you think?",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "this is a thank u for helping with my modules and spending time with me :,) @UshiWakaChannnn the link to the among us edited pic:https://pinterest.ph/pin/742671794799328083/",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "God that was some of the best among us matches I ever played thanks @serketron for having me",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "Among us in the switch is *chefs kisses*",
      "me returning to among us",
      "i pirated among us today. felt good. but no one to play with.",
      "@InnerslothDevs hello I just wanted to ask I made an order for my girlfriend and we're just starting our relationship and I made this little among us art because that's where we met what do you think?",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "this is a thank u for helping with my modules and spending time with me :,) @UshiWakaChannnn the link to the among us edited pic:https://pinterest.ph/pin/742671794799328083/",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "God that was some of the best among us matches I ever played thanks @serketron for having me",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "Among us in the switch is *chefs kisses*",
      "me returning to among us",
      "i pirated among us today. felt good. but no one to play with.",
      "@InnerslothDevs hello I just wanted to ask I made an order for my girlfriend and we're just starting our relationship and I made this little among us art because that's where we met what do you think?",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "this is a thank u for helping with my modules and spending time with me :,) @UshiWakaChannnn the link to the among us edited pic:https://pinterest.ph/pin/742671794799328083/",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "God that was some of the best among us matches I ever played thanks @serketron for having me",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "Among us in the switch is *chefs kisses*",
      "me returning to among us",
      "i pirated among us today. felt good. but no one to play with.",
      "@InnerslothDevs hello I just wanted to ask I made an order for my girlfriend and we're just starting our relationship and I made this little among us art because that's where we met what do you think?",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "this is a thank u for helping with my modules and spending time with me :,) @UshiWakaChannnn the link to the among us edited pic:https://pinterest.ph/pin/742671794799328083/",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "God that was some of the best among us matches I ever played thanks @serketron for having me",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "Among us in the switch is *chefs kisses*",
      "me returning to among us",
      "i pirated among us today. felt good. but no one to play with.",
      "@InnerslothDevs hello I just wanted to ask I made an order for my girlfriend and we're just starting our relationship and I made this little among us art because that's where we met what do you think?",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "this is a thank u for helping with my modules and spending time with me :,) @UshiWakaChannnn the link to the among us edited pic:https://pinterest.ph/pin/742671794799328083/",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "God that was some of the best among us matches I ever played thanks @serketron for having me",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "Among us in the switch is *chefs kisses*",
      "me returning to among us",
      "i pirated among us today. felt good. but no one to play with.",
      "@InnerslothDevs hello I just wanted to ask I made an order for my girlfriend and we're just starting our relationship and I made this little among us art because that's where we met what do you think?",
      "Among us game with the High Council",
      "there is one impostor among us",
      "I'm jaehyun jeon,i have a busy schedule cause i'm always on the grind but that won't hinder me from giving u a good time! hmu if you want to hold hands, play among us and exchange playlists. im not down for a commitment but i can spoil you with attention",
      "Among us was funny today",
      "SHOULD I,,AMONG US???",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
      "there is one impostor among us",
      "among us〜Pleading face",
      "Thinking about how philza said that @TubboLive has to be asked not to break servers and stuff and I was like okay lol and then in the last two days alone I’ve seen him hack into MCU and also figure out how to sorta make himself host in a Among Us tournament LET THE HOSTS BREATHE",
      "should @coochieequeen get wine drunk and play among us",
      "day 147 of missing @myotispop Heart with ribbonHeart with ribbonTwo heartsRevolving heartsBeating heartGrowing heart i would do,,,, shoutout to the cleanest imposter duo in town lol. they just don’t play like us, u know? like 95% of the credit goes to berry tho Growing heart",
      "day 148 of missing @myotispop ♌︎ ♡ ♍︎ she absolutely carried me in a game of among us tonight and when i say she carried me?? i mean she won the whole thing while i was afk taking hopie out to go potty skdkKSK. she’s so impressive that it’s unreal like omg. miss her lots",
      "the strategy this week PHEW",
      "THIS BITCH SAID MARINATE LIKE ITS AMONG US GOODBYE",
      "SHOULD I,,AMONG US???",
      "Among us game with the High Council",
    ];

    return commentlist;
  }
}

export default new axiosInstance();
