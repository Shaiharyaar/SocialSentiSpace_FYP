import React, { useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { FaInstagram, FaHashtag } from "react-icons/fa";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { ImNeutral2, ImSad2, ImHappy2 } from "react-icons/im";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Maincard } from "../ParentCard";
import axiosInstance from "../../../jwt";
import {
  InstagramLoader,
  SubCardloader,
} from "../../loading_animations/cardloading";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export const Instagramcomponent = () => {
  const [info, setinfo] = useState({
    title1: "Instagram Information",
    title2: "Latest Instagram Post",
    title3: "posted",
    post: "Here lies the latest instagram post that was posted ...",
    name: "Obama",
    line1: "This was posted at",
    dt: "date and time",
  });

  useEffect(() => {
    loadInstagraminfo();
  }, []);

  const [open, setOpen] = React.useState(false);

  const [location, setLocation] = React.useState("");
  const [trend, setTrend] = React.useState("");
  const [loadingcomponent, setloadingcomponent] = useState(false);
  const [wordcloudData, setWordcloudData] = useState([]);
  const [chartdata, setchartdata] = useState({});

  const [wordcloudData1, setWordcloudData1] = useState([]);
  const [chartdata1, setchartdata1] = useState({});

  const [list, setlist] = useState([20, 50, 10]);

  const loadInstagraminfo = async () => {
    setloadingcomponent(false);
    var newdata = "";
    var newinfo = {
      title1: "Insta Information",
      title2: "Instagram Details",
      title3: "posted",
      post: "",
      name: "",
      line1: "This was posted at",
      dt: "",
    };
    var instagramid = "",
      chartid = "";

    await axiosInstance.getchips({ id: "1234" }).then((res) => {
      if (res.status === 200) {
        res.data.result.forEach((chip, index) => {
          console.log(chip);
          if (chip.MediaType == "Instagram") {
            instagramid = chip.social_id;
            chartid = chip.chartid;
          }
        });
      }
    });
    await axiosInstance
      .getInstagramInfo(instagramid)
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

    newinfo.name = newdata.latestPost.username;
    newinfo.post = newdata.latestPost.postDetails;
    newinfo.dt = newdata.latestPost.DateTime;

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

  const classes = useStyles();
  const videos = [];
  const [hashtag, setHashtag] = useState("");
  const [isloading, setisloading] = useState(false);

  const [iscardloading, setiscardloading] = useState(false);

  const [comments, setComments] = useState([]);

  const handleok = async () => {
    setiscardloading(true);
    setOpen(false);
    setStatenewdata(true);

    var newdata = [];
    var Res = [];
    var data = [];

    var isDone = false;
    await axiosInstance
      .loadinstagraminfo(Url)
      .then((res) => {
        isDone = true;
        newdata = res.data;
        Res = res.data.Results;
        data = res.data.wordCloudWords;
      })
      .catch((error) => {
        isDone = false;
        setiscardloading(false);
        setStatenewdata(false);
        alert("Enter a public instagram post link.");
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
        title1: "Insta Information",
        title2: "Instagram Details",
        title3: "posted",
        name: newdata.Usernames[0],
        post: newdata.Post,
        line1: "This was posted at",
        dt: newdata.time[0],
      });

      setComments(comm);
      setNewRes([Res["Neutral"], Res["Positive"], Res["Negative"]]);

      setTimeout(() => {
        setisloading(true);
        setTimeout(() => {
          setiscardloading(false);
          setisloading(false);
        }, 2000);
      }, 2000);
    }
  };
  const [newdata, setStatenewdata] = useState(false);

  const [Check, setCheck] = useState(false);

  const closecomponent = () => {
    setStatenewdata(false);
  };

  const [newinfo, setnewinfo] = useState({
    title1: "Insta Information",
    title2: "Instagram Details",
    title3: "posted",
    post: "",
    name: "",
    line1: "This was posted at",
    dt: "",
  });
  const [newRes, setNewRes] = useState([19, 71, 12]);

  const handleselect = (e) => {
    setTrend(e.target.value);
    setStatenewdata(true);
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
  };
  const [Url, setUrl] = useState("");
  const updateUrl = (u) => {
    setUrl(u);
    if (u.includes("https://www.instagram.com/p/")) {
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

  const createuserfavorite = async (lb) => {
    var isDone = true;
    await axiosInstance
      .addchipData(newinfo, wordcloudData, newRes, lb, "Instagram", Url)
      .catch((err) => {
        isDone = false;
      });
    if (isDone) {
      alert("User Favorite Added successfuly ");
    }
  };

  return (
    <div className="container subscreens">
      <div className="row screens">
        <h3>Instagram Analysis </h3>
        <FaInstagram color="#e1306c" size="2.2em" style={{ marginLeft: 10 }} />
      </div>
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
                label="Enter a Instagram Public post link"
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
          <Button variant="contained" color="primary" onClick={handleok}>
            Search
          </Button>
        </div>
        {/* <div
          className="col-xl-3 boxes"
          style={{ paddingTop: 10, borderRadius: 50 }}
        >
          <FormControl style={{ width: 250 }} className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">
              Latest Instagram Trends
            </InputLabel>
            <Select
              defaultValue=""
              id="grouped-select"
              value={trend}
              onChange={handleselect}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"#love"}>#love</MenuItem>
              <MenuItem value={"#instagood"}>#instagood</MenuItem>
              <MenuItem value={"#photooftheday"}>#photooftheday</MenuItem>
              <MenuItem value={"#fashion"}>#fashion</MenuItem>
            </Select>
          </FormControl>
        </div>*/}
      </div>
      <LoadComponent
        check={newdata}
        info={newinfo}
        list={newRes}
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
            <h3>Instagram Analysis </h3>
            <FaInstagram
              color="#e1306c"
              size="2.2em"
              style={{ marginLeft: 10 }}
            />
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

  if (props.check) {
    return (
      <div>
        <div className="row screens">
          <h3>Instagram Analysis </h3>
          <FaInstagram
            color="#e1306c"
            size="2.2em"
            style={{ marginLeft: 10 }}
          />{" "}
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
            <DialogTitle id="form-dialog-title">Data Obtained</DialogTitle>
            <DialogContent>
              <div className="showData-tablediv">
                <table className="showData-table">
                  <tr>
                    <th>Id</th>
                    <th>Comment</th>
                    <th>Result</th>
                  </tr>
                  {props.comments.map((element, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
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
          <Maincard
            info={props.info}
            countervalues={props.list}
            data={props.clouddata}
            chartdata={props.chartdata}
          />
        ) : (
          <InstagramLoader loading={props.isloading} />
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
