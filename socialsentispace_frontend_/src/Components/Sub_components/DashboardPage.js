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

export const Dashboard = () => {
  const [comp, setcomp] = useState("Twitter");
  const [list, setlist] = useState([20, 50, 10]);
  useEffect(() => {
    loadcomponentinfo(comp);
  }, []);

  const loadcomponentinfo = async (media) => {
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
    if (media == "Twitter") {
      newinfo.title1 = "Information";
      newinfo.title2 = "Latest Tweet";
      newinfo.title3 = "tweeted";
      newinfo.line1 = "This was tweeted at";
      await axiosInstance
        .getTwitterInfo()
        .then((res) => {
          newdata = res.data.result;
          console.log("INFO: " + newdata.trend);
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
        .getYoutubeInfo()
        .then((res) => {
          newdata = res.data.result;
          console.log("INFO: " + newdata.trend);
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

      await axiosInstance
        .getInstagramInfo()
        .then((res) => {
          newdata = res.data.result;
          console.log("INFO: " + newdata.trend);
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

      await axiosInstance
        .getFacebookInfo()
        .then((res) => {
          console.log(res);
          newdata = res.data.result;
          console.log("INFO: " + newdata.trend);
        })
        .catch((error) => {
          console.log(error);
        });
      newinfo.name = newdata.postDetail.username;
      newinfo.post = newdata.postDetail.post;
      newinfo.dt = newdata.postDetail.DateTime;
    }
    setlist([
      newdata.Result.neutral,
      newdata.Result.positive,
      newdata.Result.negative,
    ]);
    console.log("list: ", list);
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
  const [chartdata, setchartdata] = useState({
    line: "Tweets per hr",
    data: [128, 229, 33, 436, 99, 132, 233],
  });
  const LoadComponent = async (c) => {
    await loadcomponentinfo(c);
    setcomp(c);
  };

  return (
    <div>
      <div className={"container"}>
        <ChipsArray compload={LoadComponent} />
      </div>
      <CompCheck c={comp} info={info} list={list} chart={chartdata} />
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
          data={props.chart}
        />
      </div>
    );
  } else if (props.c === "Youtube") {
    return (
      <div>
        <div className="row screens">
          <h3>Youtube Analysis </h3>
          <FaYoutube color="red" size="2.2em" style={{ marginLeft: 10 }} />
          <Youtubecard info={props.info} countervalues={props.list} />
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
            data={props.chart}
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
            countervalues={[20, 10, 70]}
            data={props.chart}
          />
        </div>
      </div>
    );
  } else {
    return <div>{props.c}</div>;
  }
};
