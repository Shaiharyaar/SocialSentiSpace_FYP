import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ImNeutral2, ImSad2, ImHappy2 } from "react-icons/im";
import { Maincard } from "../ParentCard";
import { FaTwitter } from "react-icons/fa";
import axiosInstance from "../../../jwt";
import {
  SubCardloader,
  TwitterLoader,
} from "../../loading_animations/cardloading";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
}));

export const Twittercomponent = (props) => {
  useEffect(() => {
    loadTwitterinfo();
  }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [location, setLocation] = React.useState("");
  const [trend, setTrend] = React.useState("");
  const [loadingcomponent, setloadingcomponent] = useState(false);
  const [wordcloudData, setWordcloudData] = useState([]);
  const [chartdata, setchartdata] = useState({});
  const [wordcloudData1, setWordcloudData1] = useState([]);
  const [chartdata1, setchartdata1] = useState({});

  const [list, setlist] = useState([20, 50, 10]);

  const loadTwitterinfo = async () => {
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
    };
    var twitterid = "",
      chartid = "";
    await axiosInstance.getchips({ id: "1234" }).then((res) => {
      if (res.status === 200) {
        res.data.result.forEach((chip, index) => {
          console.log(chip);
          if (chip.MediaType == "Twitter") {
            twitterid = chip.social_id;
            chartid = chip.chartid;
          }
        });
      }
    });
    await axiosInstance
      .getTwitterInfo(twitterid)
      .then((res) => {
        newdata = res.data.result;
        console.log("INFO: " + newdata.trend);
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

    newinfo.name = newdata.LatestTweet.username;
    newinfo.post = newdata.LatestTweet.tweet;
    newinfo.dt = newdata.LatestTweet.DateTime;

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
  const [info, setinfo] = useState({
    title1: "Information",
    title2: "Latest Tweet",
    title3: "tweeted",
    post: "Here lies the latest tweet that was tweeted ...",
    name: "Obama",
    line1: "This was tweeted at",
    dt: "date and time",
  });

  const [newinfo, setnewinfo] = useState({
    title1: "Information",
    title2: "Latest Tweet",
    title3: "tweeted",
    post:
      "Time to dodge the airlock (or desperately try to use it in time)... time for some Among Us with some amazing people for Charity. :)",
    name: "Matthew Mercer",
    line1: "This was tweeted at",
    dt: "7:58 AM, Dec 20, 2020",
  });
  const [newRes, setNewRes] = useState([19, 71, 12]);

  const videos = [];

  const [newdata, setStatenewdata] = useState(false);

  const handleLocation = (event) => {
    setLocation(event.target.value || "");
    if (event.target.value != "")
      document.getElementById("trendfield").style.visibility = "visible";
    else document.getElementById("trendfield").style.visibility = "hidden";
  };
  // const handleTrend = (event) => {
  //   setTrend(event.target.value || "");
  //   console.log(event.target.value);

  //   if (event.target.value != "") {
  //     document.getElementById("okbtn").style.visibility = "visible";
  //     document.getElementById("span").style.visibility = "hidden";
  //   } else {
  //     document.getElementById("okbtn").style.visibility = "hidden";
  //     document.getElementById("span").style.visibility = "visible";
  //   }
  // };
  const [isloading, setisloading] = useState(false);
  const [iscardloading, setiscardloading] = useState(false);
  const [comments, setComments] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createuserfavorite = async (lb) => {
    var isDone = true;
    await axiosInstance
      .addchipData(newinfo, wordcloudData, newRes, lb, "Twitter", trend)
      .catch((err) => {
        isDone = false;
      });
    if (isDone) {
      alert("User Favorite Added successfuly ");
    }
  };
  const handleok = async () => {
    setiscardloading(true);
    setOpen(false);
    setStatenewdata(true);
    var newdata = [];
    var Result = [];
    var data = [];
    var isDone = false;
    await axiosInstance
      .loadtwitterinfo(trend)
      .then((res) => {
        isDone = true;
        newdata = res.data.Tweets;
        Result = res.data.Results;
        data = res.data.wordCloudWords;
      })

      .catch((error) => {
        isDone = false;
        setiscardloading(false);
        setStatenewdata(false);
        alert(
          "Error occured while loading twitter data. Check your internet connection."
        );
      });
    console.log("showing data:", data);
    var comm = [];

    if (isDone) {
      var wordlist = [];
      var countlist = [];
      data.slice(0, 10).forEach((data, index) => {
        if (index < 10) {
          wordlist.push(data.text);
          countlist.push(data.value);
        }
      });
      setchartdata({ words: wordlist, counts: countlist });
      newdata.forEach((tweet) => {
        comm.push({ tweet: tweet.text, polarity: tweet.polarity });
      });

      setnewinfo({
        title1: "Information",
        title2: "Latest Tweet",
        title3: "tweeted",
        post: comm[0].tweet,
        name: newdata[0].username,
        line1: "This was tweeted at",
        dt: newdata[0].date,
      });
      setNewRes([Result["Neutral"], Result["Positive"], Result["Negative"]]);
      setWordcloudData(data);
      setComments(comm);
      setTimeout(() => {
        setisloading(true);
        setTimeout(() => {
          setiscardloading(false);
          setisloading(false);
        }, 2000);
      }, 500);
    }
  };
  const closecomponent = () => {
    setStatenewdata(false);
  };

  return (
    <div className={"container subscreens"}>
      {/* <div className="selectloc">
        <Button className="trendbtn" onClick={handleClickOpen}>
          Select a Twitter Trend
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Fill the fields</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-dialog-select-label">
                  Select a Location
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={location}
                  onChange={handleLocation}
                  input={<Input />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Rawalpindi"}>Rawalpindi</MenuItem>
                  <MenuItem value={"Islamabad"}>Islamabad</MenuItem>
                  <MenuItem value={"Lahore"}>Lahore</MenuItem>
                </Select>
              </FormControl>
              <FormControl id="trendfield" className={classes.formControl}>
                <InputLabel id="demo-dialog-select-label">
                  Select a Trend
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={trend}
                  onChange={handleTrend}
                  input={<Input />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"#DonaldTrump"}>#Donaldtrump</MenuItem>
                  <MenuItem value={"#ObamaCare"}>#ObamaCare</MenuItem>
                  <MenuItem value={"#Pewdiepie"}>#Pewdiepie</MenuItem>
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              id="okbtn"
              onClick={handleok}
              style={{ visibility: "hidden" }}
              color="primary"
            >
              Ok
            </Button>
            <span
              id="span"
              style={{
                position: "absolute",
                fontFamily: "Calibri",
                right: 32,
                bottom: 15,
                color: "#999",
              }}
            >
              Ok
            </span>
          </DialogActions>
        </Dialog>
      </div> */}

      <div className="row search-box">
        <div className="col-xl-11 boxes " style={{ marginTop: 10 }}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={videos.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter a keyword your choosing"
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  setTrend(e.target.value);
                }}
              />
            )}
          />
        </div>
        <div
          className="col-xl-1 p-0 justify-content-end d-flex"
          style={{ marginTop: 30, marginBottom: 20 }}
        >
          <Button variant="contained" color="primary" onClick={handleok}>
            Search
          </Button>
        </div>
      </div>
      <LoadComponent
        check={newdata}
        info={newinfo}
        list={newRes}
        trend={trend}
        chartdata={chartdata}
        clouddata={wordcloudData}
        closecomponent={closecomponent}
        cardloading={iscardloading}
        isloading={isloading}
        comments={comments}
        createchip={createuserfavorite}
      />
      {!loadingcomponent ? (
        <div style={{ padding: 0 }}>
          <SubCardloader />
        </div>
      ) : (
        <div>
          <div className="row screens">
            <h3>Twitter Analysis </h3>
            <FaTwitter color="blue" size="2.2em" style={{ marginLeft: 10 }} />
          </div>
          <Maincard
            info={info}
            countervalues={list}
            data={wordcloudData1}
            chartdata={chartdata1}
          />
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
  // const showcommentdata =

  if (props.check) {
    return (
      <div>
        <div className="row screens">
          <h3>Twitter Analysis on {props.trend} </h3>
          <FaTwitter color="blue" size="2.2em" style={{ marginLeft: 10 }} />
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
                    <th>comment</th>
                    <th>Result</th>
                  </tr>
                  {props.comments.map((element, index) => {
                    return (
                      <tr>
                        <td>{element.tweet}</td>
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
          <Maincard
            info={props.info}
            countervalues={props.list}
            data={props.clouddata}
            chartdata={props.chartdata}
          />
        ) : (
          <TwitterLoader loading={props.isloading} />
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
