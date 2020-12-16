import React, { useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { FaYoutube } from "react-icons/fa";

import { makeStyles } from "@material-ui/core/styles";
import { Youtubecard } from "../../Cards/youtubeCard";
import { SubCardloader } from "../../loading_animations/cardloading";
import axiosInstance from "../../../jwt";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export const Youtubecomponent = () => {
  const [info, setinfo] = useState({
    title1: "Video Information",
    title2: "Video Title",
    title3: "Description",
    post: "Here lies the Video Description",
    name: "Video",
    line1: "Video title",
    dt: "(date and time)",
    url: "https://www.youtube.com/watch?v=Na8vHaCLwKc",
    youtuber: "Pewdiepie",
  });
  useEffect(() => {
    loadYoutubeinfo();
  }, []);
  const [open, setOpen] = React.useState(false);

  const [location, setLocation] = React.useState("");
  const [trend, setTrend] = React.useState("");
  const classes = useStyles();
  const videos = [];
  const checkhash = (val) => {
    if (val == "")
      document.getElementById("free-solo-demo").style.borderColor = "#888";
    else
      document.getElementById("free-solo-demo").style.borderColor = "#c13584";
  };

  const [loadingcomponent, setloadingcomponent] = useState(false);
  const [list, setlist] = useState([24, 65, 12]);

  const loadYoutubeinfo = async () => {
    setloadingcomponent(false);
    var newdata = "";
    var newinfo = {
      title1: "Youtube Information",
      title2: "Youtube Details",
      title3: "posted",
      post: "",
      name: "",
      line1: "This was tweeted at",
      dt: "",

      url: "",
      youtuber: "",
      videoname: "",
    };

    newinfo.title1 = "Video Information";
    newinfo.title2 = "Video Title";
    newinfo.title3 = "Video Description";

    await axiosInstance
      .getYoutubeInfo("5f9af9d25a99bd1940dfbbd4")
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

    setlist([
      newdata.Result.neutral,
      newdata.Result.positive,
      newdata.Result.negative,
    ]);
    console.log("list: ", list);
    setinfo(newinfo);
    setTimeout(() => {
      setloadingcomponent(true);
    }, 2000);
  };

  return (
    <div className="col">
      <div className="row screens">
        <h3>Youtube Analysis </h3>
        <FaYoutube color="red" size="2.2em" style={{ marginLeft: 10 }} />
      </div>
      <div className="row">
        <div className="col boxes" style={{ marginTop: 10 }}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={videos.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter a Youtube video link"
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  checkhash(e.target.value);
                }}
              />
            )}
          />
        </div>
      </div>
      <LoadComponent />
      {!loadingcomponent ? (
        <div>
          <SubCardloader />
        </div>
      ) : (
        <div>
          <div className="row screens">
            <h3>Youtube Analysis </h3>
            <FaYoutube color="red" size="2.2em" style={{ marginLeft: 10 }} />
            <Youtubecard info={info} countervalues={list} />
          </div>
        </div>
      )}
    </div>
  );
};

const LoadComponent = (props) => {
  // if (props.check) {
  //   return <YoutubeAnalysis url={props.url} />;
  // } else {
  return (
    <div className="container">
      <div className="col">
        <div className="row">
          <div className="emptyComp">
            <h3>Your Search Result Will appear here</h3>
          </div>{" "}
        </div>
      </div>
    </div>
  );
  // }
};
