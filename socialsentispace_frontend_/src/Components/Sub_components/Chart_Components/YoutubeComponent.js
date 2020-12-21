import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import {
  SubCardloader,
  YoutubeLoader,
} from "../../loading_animations/cardloading";
import TextField from "@material-ui/core/TextField";

import { FaYoutube } from "react-icons/fa";

import { Youtubecard } from "../../Cards/youtubeCard";
import axiosInstance from "../../../jwt";
import { Autocomplete } from "@material-ui/lab";

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
  const [newdata, setStatenewdata] = useState(false);

  const classes = useStyles();
  const videos = [];
  const [Check, setCheck] = useState(false);
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newinfo, setnewinfo] = useState([]);
  const checkhash = async () => {
    if (url.includes("https://www.youtube.com/watch?v=")) {
      setCheck(true);
      document.getElementById("free-solo").style.border = "1px solid limegreen";

      document.getElementById("free-solo").style.borderRadius = "10px";
      setiscardloading(true);
      setOpen(false);
      setStatenewdata(true);

      var newdata = [];
      await axiosInstance.loadyoutubeinfo(url).then((res) => {
        newdata = res.data;
      });
      var comm = [];

      newdata.Comments.forEach((comments) => {
        comm.push(comments);
      });

      setnewinfo({
        title1: "Youtube Information",
        title2: "Youtube Details",
        title3: "posted",
        post: newdata.description,
        name: newdata.youtuber,
        line1: newdata.title,
        dt: newdata.date,

        url: url,
      });
      setComments(comm);

      setTimeout(() => {
        setisloading(true);
        setTimeout(() => {
          setiscardloading(false);
          setisloading(false);
        }, 2000);
      }, 2000);
      fetch(url).then(function (res) {
        console.log(res);
      });
    } else if (url == "") {
      setCheck(false);
      setStatenewdata(false);

      document.getElementById("free-solo").style.border = "0px solid limegreen";
    } else {
      setCheck(false);
      setStatenewdata(false);

      document.getElementById("free-solo").style.border =
        "1px solid rgba(255,100,150,0.5)";

      document.getElementById("free-solo").style.borderRadius = "10px";
    }
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  const closecomponent = () => {
    setStatenewdata(false);
  };

  const [loadingcomponent, setloadingcomponent] = useState(false);
  const [list, setlist] = useState([24, 65, 12]);
  const [isloading, setisloading] = useState(false);
  const [iscardloading, setiscardloading] = useState(false);

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
  const updateUrl = (u) => {
    setUrl(u);
    if (u.includes("https://www.youtube.com/watch?v=")) {
      setCheck(true);
      document.getElementById("free-solo").style.border = "1px solid limegreen";

      document.getElementById("free-solo").style.borderRadius = "10px";
    } else if (u == "") {
      document.getElementById("free-solo").style.border = "0px solid limegreen";
    } else {
      document.getElementById("free-solo").style.border =
        "1px solid rgba(255,100,150,0.5)";

      document.getElementById("free-solo").style.borderRadius = "10px";
    }
  };
  const [newRes, setnewRes] = useState([20, 50, 30]);
  return (
    <div className="col subscreens">
      <div className="row screens">
        <h3>Youtube Analysis </h3>
        <FaYoutube color="red" size="2.2em" style={{ marginLeft: 10 }} />
      </div>
      <div className="row">
        <div
          className="col-xl-10 boxes"
          style={{ marginTop: 10 }}
          id={"free-solo"}
        >
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
                  updateUrl(e.target.value);
                }}
              />
            )}
          />
        </div>

        <div className="col-xl-2" style={{ marginTop: 35 }}>
          <Button variant="contained" color="primary" onClick={checkhash}>
            Search
          </Button>
        </div>
      </div>
      <LoadComponent
        check={newdata}
        info={newinfo}
        list={newRes}
        closecomponent={closecomponent}
        cardloading={iscardloading}
        isloading={isloading}
        comments={comments}
      />
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (props.check) {
    return (
      <div>
        <div className="row screens">
          <h3>Youtube Analysis </h3>
          <FaYoutube color="red" size="2.2em" style={{ marginLeft: 10 }} />
        </div>
        <div class="button-show-data">
          <div style={{ marginLeft: 20 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={props.closecomponent}
            >
              Close
            </Button>
          </div>
          {!props.cardloading ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Show Data
            </Button>
          ) : (
            <div></div>
          )}
          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"md"}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Data Obtained</DialogTitle>
            <DialogContent>
              <div className="showData-tablediv">
                <table className="showData-table">
                  <tr>
                    <th>id</th>
                    <th>comment</th>
                  </tr>
                  {props.comments.map((element, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{element}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        {!props.cardloading ? (
          <Youtubecard info={props.info} countervalues={props.list} />
        ) : (
          <YoutubeLoader loading={props.isloading} />
        )}
        <div className={"below-border"}></div>
      </div>
    );
  } else {
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
  }
};
