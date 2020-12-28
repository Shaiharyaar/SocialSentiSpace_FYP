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

import { ImNeutral2, ImSad2, ImHappy2 } from "react-icons/im";
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
  const [wordcloudData, setWordcloudData] = useState([]);
  const [chartdata, setchartdata] = useState({});

  const [wordcloudData1, setWordcloudData1] = useState([]);
  const [chartdata1, setchartdata1] = useState({});

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
      var isDone = false;
      var newdata = [];
      var Res = [];
      var data = [];

      await axiosInstance
        .loadyoutubeinfo(url)
        .then((res) => {
          isDone = true;
          newdata = res.data;
          Res = res.data.Results;
          data = res.data.wordCloudWords;
        })
        .catch((error) => {
          isDone = false;
          setStatenewdata(false);
          alert("Enter a correct Youtube Video link.");
          setiscardloading(false);
        });
      if (isDone) {
        var comm = [],
          wordlist = [],
          countlist = [];

        data.slice(0, 10).forEach((data, index) => {
          if (index < 10) {
            wordlist.push(data.text);
            countlist.push(data.value);
          }
        });
        setchartdata({ words: wordlist, counts: countlist });
        setWordcloudData(data);
        newdata.Comments.forEach((comment, index) => {
          comm.push({ comment: comment, polarity: newdata.Polarity[index] });
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

        setNewRes([Res["Neutral"], Res["Positive"], Res["Negative"]]);

        setTimeout(() => {
          setisloading(true);
          setTimeout(() => {
            setiscardloading(false);
            setisloading(false);
          }, 2000);
        }, 500);
        fetch(url).then(function (res) {
          console.log(res);
        });
      }
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
    var youtubeid = "",
      chartid = "";
    await axiosInstance.getchips({ id: "1234" }).then((res) => {
      if (res.status === 200) {
        res.data.result.forEach((chip, index) => {
          console.log(chip);
          if (chip.MediaType == "Youtube") {
            youtubeid = chip.social_id;
            chartid = chip.chartid;
          }
        });
      }
    });
    console.log(chartid);
    await axiosInstance
      .getYoutubeInfo(youtubeid)
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

    var chartdata = [];
    await axiosInstance
      .getchartdata({ id: chartid })
      .then((res) => {
        chartdata = res.data.result.Chartdata;
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(chartdata);
    var wordlist = [],
      countlist = [];

    chartdata.slice(0, 10).forEach((data, index) => {
      if (index < 10) {
        wordlist.push(data.text);
        countlist.push(data.value);
      }
    });
    setchartdata1({ words: wordlist, counts: countlist });
    setWordcloudData1(chartdata);

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
    }, 1000);
  };
  const createuserfavorite = async (lb) => {
    var isDone = true;
    await axiosInstance
      .addchipData(newinfo, wordcloudData, NewRes, lb, "Youtube", url)
      .catch((err) => {
        isDone = false;
      });
    if (isDone) {
      alert("User Favorite Added successfuly ");
    }
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
  const [NewRes, setNewRes] = useState([20, 50, 30]);
  return (
    <div className="container subscreens">
      <div className="row search-box">
        <div
          className="col-xl-11 boxes "
          id={"free-solo"}
          style={{ marginTop: 10 }}
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

        <div
          className="col-xl-1 p-0 justify-content-end d-flex"
          style={{ marginTop: 30, marginBottom: 20 }}
        >
          <Button variant="contained" color="primary" onClick={checkhash}>
            Search
          </Button>
        </div>
      </div>
      <LoadComponent
        check={newdata}
        info={newinfo}
        list={NewRes}
        chartdata={chartdata}
        clouddata={wordcloudData}
        closecomponent={closecomponent}
        cardloading={iscardloading}
        isloading={isloading}
        comments={comments}
        createchip={createuserfavorite}
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
            <Youtubecard
              info={info}
              countervalues={list}
              data={wordcloudData1}
              chartdata={chartdata1}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const LoadComponent = (props) => {
  const [open, setOpen] = React.useState(false);
  const [openbox, setOpenbox] = useState(false);
  const [label, setlabel] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleopenbox = () => {
    setOpenbox(true);
  };
  const handleOk = () => {
    console.log(label);
    setOpenbox(false);
    props.createchip(label);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenbox(false);
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
            <div>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              >
                Show Data
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleopenbox}
              >
                Add Chip
              </Button>{" "}
            </div>
          ) : (
            <div></div>
          )}
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={openbox}
            onClose={handleClose}
          >
            <DialogTitle>Enter Label for your favorite</DialogTitle>
            <DialogContent>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                style={{ width: 350 }}
                options={[].map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => {
                      setlabel(e.target.value);
                    }}
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button id="okbtn" onClick={handleOk} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"md"}
            aria-labelledby="form-dialog-title"
          >
            <div
              className="data-head"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <DialogTitle id="form-dialog-title">Data Obtained</DialogTitle>
              <p className={"totalcomments"}>
                Total Obtained: {props.comments.length}
              </p>
            </div>
            <DialogContent>
              <div className="showData-tablediv">
                <table className="showData-table">
                  <tr>
                    <th>COMMENTS</th>
                    <th>RESULT</th>
                  </tr>
                  {props.comments.map((element, index) => {
                    return (
                      <tr>
                        <td>{element.comment}</td>
                        <td>
                          <div>
                            {element.polarity == "Negative" ? (
                              <ImSad2
                                color="RGBA(211,0,0,0.8)"
                                size="2.2em"
                                className="redicon"
                              />
                            ) : element.polarity == "Neutral" ? (
                              <ImNeutral2
                                color="RGBA(0,146,255,0.8)"
                                size="2.2em"
                                className="blueicon"
                              />
                            ) : (
                              <ImHappy2
                                color="RGBA(0,194,52,0.8)"
                                size="2.2em"
                                className="greenicon"
                              />
                            )}
                          </div>
                        </td>
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
          <Youtubecard
            info={props.info}
            countervalues={props.list}
            data={props.clouddata}
            chartdata={props.chartdata}
          />
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
