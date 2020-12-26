import React, { useEffect, useState } from "react";
import ChipsArray from "../chips";
import { Maincard } from "./ParentCard";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Youtubecard } from "../Cards/youtubeCard";
import { Facebookcomponent } from "./Chart_Components/FacebookComponent";
import { Instagramcomponent } from "./Chart_Components/InstagramComponent";
import { Twittercomponent } from "./Chart_Components/TwitterComponent";
import { Youtubecomponent } from "./Chart_Components/YoutubeComponent";
import axiosInstance from "../../jwt";
import { Cardloader, SubCardloader } from "../loading_animations/cardloading";
import { Button } from "@material-ui/core";

export const Dashboard = () => {
  useEffect(() => {
    loadcomponentinfo(comp, id, "");
  }, []);

  const [comp, setcomp] = useState("");
  const [id, setid] = useState("");
  const [chip, setchip] = useState({
    label: "",
    socialType: "",
    social_id: "",
  });
  const [list, setlist] = useState([20, 50, 10]);
  const [loadingcomponent, setloadingcomponent] = useState(false);
  const loadcomponentinfo = async (media, id, chartid, ref) => {
    setloadingcomponent(false);
    var newdata = "";
    var newinfo = {
      title1: "Information",
      title2: "Latest Tweet",
      title3: "tweeted",
      post: "",
      name: "",
      line1: "This was tweeted at",
      dt: "",

      url: "",
      youtuber: "",
      videoname: "",
    };
    if (chartid != "") {
      var chartdata = [];
      await axiosInstance.getchartdata({ id: chartid }).then((res) => {
        chartdata = res.data.result.Chartdata;
      });

      setClouddata(chartdata);
      var wordlist = [];
      var countlist = [];
      chartdata.slice(0, 10).forEach((data, index) => {
        if (index < 10) {
          wordlist.push(data.text);
          countlist.push(data.value);
        }
      });
      setBarchartdata({ words: wordlist, counts: countlist });
    }
    if (media == "") {
    } else if (media == "Twitter") {
      newinfo.title1 = "Information";
      newinfo.title2 = "Latest Tweet";
      newinfo.title3 = "tweeted";
      newinfo.line1 = "This was tweeted at";
      await axiosInstance
        .getTwitterInfo(id)
        .then((res) => {
          newdata = res.data.result;
          console.log("INFO: " + newdata.trend);
          if (ref) {
            setTimeout(() => {
              setisloading(true);
              setTimeout(() => {
                setisRefreshing(false);
                setloadingcomponent(true);
                setisloading(false);
              }, 2000);
            }, 2000);
          } else {
            setTimeout(() => {
              setloadingcomponent(true);
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      newinfo.name = newdata.LatestTweet.username;
      newinfo.post = newdata.LatestTweet.tweet;
      newinfo.dt = newdata.LatestTweet.DateTime;
    } else if (media == "Youtube") {
      newinfo.title1 = "Video Information";
      newinfo.title2 = "Video Title";
      newinfo.title3 = "Video Description";

      await axiosInstance
        .getYoutubeInfo(id)
        .then((res) => {
          newdata = res.data.result;
          console.log("INFO: " + newdata.trend);
          setTimeout(() => {
            setloadingcomponent(true);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });

      newinfo.youtuber = newdata.VideoDetail.youtuber;
      newinfo.line1 = newdata.VideoDetail.videoName;
      newinfo.post = newdata.VideoDetail.VideoDescription;
      newinfo.url = newdata.VideoDetail.videoURL;
      newinfo.dt = newdata.VideoDetail.DateTime;
    } else if (media == "Instagram") {
      newinfo.title1 = "Insta Information";
      newinfo.title2 = "Instagram Details";
      newinfo.title3 = "posted";

      newinfo.line1 = "This was posted at";
      await axiosInstance
        .getInstagramInfo(id)
        .then((res) => {
          newdata = res.data.result;
          console.log("INFO: " + newdata.trend);
          setTimeout(() => {
            setloadingcomponent(true);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });

      newinfo.name = newdata.latestPost.username;
      newinfo.post = newdata.latestPost.postDetails;
      newinfo.dt = newdata.latestPost.DateTime;
    } else if (media == "Facebook") {
      newinfo.title1 = "Fb Information";
      newinfo.title2 = "Fb Details";
      newinfo.title3 = "posted";

      newinfo.line1 = "This was posted at";
      await axiosInstance
        .getFacebookInfo(id)
        .then((res) => {
          console.log(res);
          newdata = res.data.result;
          console.log("INFO: " + newdata.trend);
          setTimeout(() => {
            setloadingcomponent(true);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
      newinfo.name = newdata.postDetail.username;
      newinfo.post = newdata.postDetail.post;
      newinfo.dt = newdata.postDetail.DateTime;
    }
    if (media != "") {
      console.log(
        newdata.Result.neutral,
        newdata.Result.positive,
        newdata.Result.negative
      );
      setlist([
        newdata.Result.neutral,
        newdata.Result.positive,
        newdata.Result.negative,
      ]);
    }
    setinfo(newinfo);
  };
  const [info, setinfo] = useState({
    title1: "Information",
    title2: "Latest Tweet",
    title3: "tweeted",
    post: "Here lies the latest tweet that was tweeted ...",
    name: "Obama",
    line1: "This was tweeted at",
    dt: "date and time",

    url: "https://www.youtube.com/watch?v=Na8vHaCLwKc",
    youtuber: "Pewdiepie",
    videoname: "",
  });
  const [Barchartdata, setBarchartdata] = useState({});
  const [clouddata, setClouddata] = useState([]);
  const LoadComponent = async (new_chip) => {
    await loadcomponentinfo(
      new_chip[0].socialType,
      new_chip[0].social_id,
      new_chip[0].chartid
    );
    setchip(new_chip[0]);
    setid(new_chip[0].social_id);
    setcomp(new_chip[0].socialType);
  };
  const [isloading, setisloading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);
  const handleRefresh = async () => {
    setisRefreshing(true);
    setloadingcomponent(false);

    if (comp == "Twitter") {
      await axiosInstance.updateTwitter(
        chip.social_id,
        chip.data,
        chip.chartid
      );
      await loadcomponentinfo(comp, id, chip.chartid, "ref");
    } else if (comp == "Youtube") {
      await axiosInstance.updateYoutube(
        chip.social_id,
        chip.data,
        chip.chartid
      );
      await loadcomponentinfo(comp, id, chip.chartid, "ref");
    } else if (comp == "Instagram") {
      await axiosInstance.updateInstagram(
        chip.social_id,
        chip.data,
        chip.chartid
      );
      await loadcomponentinfo(comp, id, chip.chartid, "ref");
    } else if (comp == "Facebook") {
      await axiosInstance.updateFacebook(
        chip.social_id,
        chip.data,
        chip.chartid
      );
      console.log("hello");
      await loadcomponentinfo(comp, id, chip.chartid, "ref");
    }
  };
  return (
    <div>
      <div className={"container chips_div"}>
        <ChipsArray compload={LoadComponent} />
      </div>
      {comp == "" ? (
        <h1>Click on the chips above to show data</h1>
      ) : (
        <div></div>
      )}
      {loadingcomponent ? (
        <div className={"container"}>
          <div class="button-show-data">
            <Button variant="outlined" color="default" onClick={handleRefresh}>
              Refresh
            </Button>
          </div>
          <CompCheck
            c={comp}
            info={info}
            list={list}
            clouddata={clouddata}
            bardata={Barchartdata}
          />
        </div>
      ) : isRefreshing ? (
        <div style={{ padding: 40 }}>
          <SubCardloader loading={isloading} />
        </div>
      ) : (
        <Cardloader />
      )}
    </div>
  );
};

const CompCheck = (props) => {
  if (props.c === "Twitter") {
    return (
      <div>
        <div className="row screens">
          <h3>Twitter Analysis </h3>
          <FaTwitter color="blue" size="2.2em" style={{ marginLeft: 10 }} />
        </div>
        <Maincard
          info={props.info}
          countervalues={props.list}
          data={props.clouddata}
          chartdata={props.bardata}
        />
      </div>
    );
  } else if (props.c === "Youtube") {
    return (
      <div>
        <div className="row screens">
          <h3>Youtube Analysis </h3>
          <FaYoutube color="red" size="2.2em" style={{ marginLeft: 10 }} />
          <Youtubecard
            info={props.info}
            countervalues={props.list}
            data={props.clouddata}
            chartdata={props.bardata}
          />
        </div>
      </div>
    );
  } else if (props.c === "Facebook") {
    return (
      <div>
        <div className="row screens">
          <h3>Facebook Analysis </h3>
          <FaFacebook color="blue" size="2.2em" style={{ marginLeft: 10 }} />
          <Maincard
            info={props.info}
            countervalues={props.list}
            data={props.clouddata}
            chartdata={props.bardata}
          />
        </div>
      </div>
    );
  } else if (props.c === "Instagram") {
    return (
      <div>
        <div className="row screens">
          <h3>Instagram Analysis </h3>
          <FaInstagram
            color="#e1306c"
            size="2.2em"
            style={{ marginLeft: 10 }}
          />
          <Maincard
            info={props.info}
            countervalues={props.list}
            data={props.clouddata}
            chartdata={props.bardata}
          />
        </div>
      </div>
    );
  } else {
    return <div>{props.c}</div>;
  }
};
