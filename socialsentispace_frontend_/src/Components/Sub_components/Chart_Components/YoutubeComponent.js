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
  const [Url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const checkhash = (url) => {
    console.log("hello");

    if (url.includes("https://www.youtube.com/watch?v=")) {
      setCheck(true);
      setUrl(url);
      document.getElementById("free-solo").style.border = "1px solid limegreen";

      document.getElementById("free-solo").style.borderRadius = "10px";
      setiscardloading(true);
      setOpen(false);
      setStatenewdata(true);
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

  return (
    <div className="col subscreens">
      <div className="row screens">
        <h3>Youtube Analysis </h3>
        <FaYoutube color="red" size="2.2em" style={{ marginLeft: 10 }} />
      </div>
      <div className="row">
        <div className="col boxes" id={"free-solo"} style={{ marginTop: 10 }}>
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
      <LoadComponent
        check={newdata}
        info={info}
        list={list}
        closecomponent={closecomponent}
        cardloading={iscardloading}
        isloading={isloading}
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
                  <tr>
                    <td>01</td>
                    <td>
                      ilfgbwekf bhweliur hlweiufkwefikweufgsdjhvbnmsd,ue
                      jhfwejfg sjhfgwek jdhgw kdjhwg hf qf jhdg qjdqg
                    </td>
                  </tr>
                  <tr>
                    <td>01</td>
                    <td>
                      ilfgbwekf bhweliur hlweiufkwefikweufgsdjhvbnmsd,ue
                      jhfwejfg sjhfgwek jdhgw kdjhwg hf qf jhdg qjdqg
                    </td>
                  </tr>
                  <tr>
                    <td>01</td>
                    <td>
                      ilfgbwekf bhweliur hlweiufkwefikweufgsdjhvbnmsd,ue
                      jhfwejfg sjhfgwek jdhgw kdjhwg hf qf jhdg qjdqg
                    </td>
                  </tr>
                  <tr>
                    <td>01</td>
                    <td>
                      ilfgbwekf bhweliur hlweiufkwefikweufgsdjhvbnmsd,ue
                      jhfwejfg sjhfgwek jdhgw kdjhwg hf qf jhdg qjdqg
                    </td>
                  </tr>
                  <tr>
                    <td>01</td>
                    <td>
                      ilfgbwekf bhweliur hlweiufkwefikweufgsdjhvbnmsd,ue
                      jhfwejfg sjhfgwek jdhgw kdjhwg hf qf jhdg qjdqg
                    </td>
                  </tr>
                  <tr>
                    <td>01</td>
                    <td>
                      ilfgbwekf bhweliur hlweiufkwefikweufgsdjhvbnmsd,ue
                      jhfwejfg sjhfgwek jdhgw kdjhwg hf qf jhdg qjdqg
                    </td>
                  </tr>
                  <tr>
                    <td>01</td>
                    <td>
                      ilfgbwekf bhweliur hlweiufkwefikweufgsdjhvbnmsd,ue
                      jhfwejfg sjhfgwek jdhgw kdjhwg hf qf jhdg qjdqg
                    </td>
                  </tr>
                  <tr>
                    <td>01</td>
                    <td>
                      ilfgbwekf bhweliur hlweiufkwefikweufgsdjhvbnmsd,ue
                      jhfwejfg sjhfgwek jdhgw kdjhwg hf qf jhdg qjdqg
                    </td>
                  </tr>
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
