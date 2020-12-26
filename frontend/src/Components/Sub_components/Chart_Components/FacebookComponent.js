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
  FacebookLoader,
  SubCardloader,
} from "../../loading_animations/cardloading";
import TextField from "@material-ui/core/TextField";

import { ImNeutral2, ImSad2, ImHappy2 } from "react-icons/im";

import { Autocomplete } from "@material-ui/lab";

import { FaFacebook, FaHashtag } from "react-icons/fa";

import { Maincard } from "../ParentCard";
import axiosInstance from "../../../jwt";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export const Facebookcomponent = () => {
  useEffect(() => {
    loadFacebookinfo();
  }, []);

  const [info, setinfo] = useState({
    title1: "Facebook Information",
    title2: "Latest Facebook Post",
    title3: "posted",
    post: "Here lies the latest Facebook post that was posted ...",
    name: "Obama",
    line1: "This was posted at",
    dt: "date and time",
  });

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

  const [chartdata, setchartdata] = useState({
    line: "Comments per day",
    data: [128, 229, 33, 436, 99, 132, 233],
  });
  const [newdata, setStatenewdata] = useState(false);
  const [newinfo, setNewinfo] = useState([]);
  const [newRes, setNewRes] = useState([]);
  const [Url, setUrl] = useState("");

  const closecomponent = () => {
    setStatenewdata(false);
  };
  const [loadingcomponent, setloadingcomponent] = useState(false);
  const [list, setlist] = useState([24, 65, 12]);
  const loadFacebookinfo = async () => {
    setloadingcomponent(false);
    var newdata = "";
    var newinfo = {
      title1: "Fb Information",
      title2: "Fb Details",
      title3: "posted",
      post: "",
      name: "",
      line1: "This was posted at",
      dt: "",
    };

    var youtubeid = "";
    await axiosInstance.getchips({ id: "1234" }).then((res) => {
      if (res.status === 200) {
        res.data.result.forEach((chip, index) => {
          console.log(chip);
          if (chip.MediaType == "Facebook") {
            youtubeid = chip.social_id;
          }
        });
      }
    });
    await axiosInstance
      .getFacebookInfo(youtubeid)
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
  const [isloading, setisloading] = useState(false);
  const [iscardloading, setiscardloading] = useState(false);
  const [PostList, setPostList] = useState([]);
  const handleok = async () => {
    setiscardloading(true);
    setOpen(false);
    setStatenewdata(true);

    var Res = [];
    var newdata = [];
    var isDone = false;
    await axiosInstance
      .loadfacebookinfo(Url)
      .then((res) => {
        isDone = true;
        newdata = res.data;
        Res = res.data.Results;
      })
      .catch((error) => {
        isDone = false;
        setiscardloading(false);
        setStatenewdata(false);
        alert("Enter a public Facebook page link.");
      });
    if (isDone) {
      var comm = [];
      var newinfo1 = {
        title1: "Fb Information",
        title2: "Fb Details",
        title3: "posted",
        post: newdata.Posts[0],
        name: newdata.PageName,
        line1: "This was posted at",
        dt: newdata.Times[0],
      };

      setNewinfo(newinfo1);
      setNewRes([Res["Neutral"], Res["Positive"], Res["Negative"]]);

      newdata.Posts.forEach((post, index) => {
        comm.push({ post: post, polarity: newdata.Polarity[index] });
      });

      setPostList(comm);
      setTimeout(() => {
        setisloading(true);
        setTimeout(() => {
          setiscardloading(false);
          setisloading(false);
        }, 2000);
      }, 2000);
    }
  };
  const updateUrl = (u) => {
    setUrl(u);
    if (u.includes("https://www.facebook.com/")) {
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

  return (
    <div className="container subscreens">
      <div className="row screens">
        <h3>Facebook Analysis </h3>
        <FaFacebook color="blue" size="2.2em" style={{ marginLeft: 10 }} />
      </div>
      {/* <div className="row">
        <div className="col-xl-9 boxes" style={{ marginTop: 10 }}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={videos.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter a Facebook page link"
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  checkhash(e.target.value);
                }}
              />
            )}
          />
        </div>
        <div
          className="col-xl-3 boxes"
          style={{ paddingTop: 10, borderRadius: 50 }}
        >
          <FormControl style={{ width: 250 }} className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Facebook posts</InputLabel>
            <Select defaultValue="" id="grouped-select">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"#love"}>#love</MenuItem>
              <MenuItem value={"#instagood"}>#instagood</MenuItem>
              <MenuItem value={"#photooftheday"}>#photooftheday</MenuItem>
              <MenuItem value={"#fashion"}>#fashion</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={"row"}>
        <h2 style={{ marginLeft: "45%" }}> OR</h2>
      </div> */}
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
                label="Enter a Facebook page link"
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
          <Button variant="contained" color="primary" onClick={handleok}>
            Search
          </Button>
        </div>
      </div>
      <LoadComponent
        check={newdata}
        info={newinfo}
        list={newRes}
        data={chartdata}
        Posts={PostList}
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
            <h3>Facebook Analysis </h3>
            <FaFacebook color="blue" size="2.2em" style={{ marginLeft: 10 }} />
          </div>
          <Maincard
            info={info}
            countervalues={list}
            data={chartdata}
            y_title={"comments"}
          />
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
          <h3>Facebook Analysis </h3>
          <FaFacebook color="blue" size="2.2em" style={{ marginLeft: 10 }} />
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
                    <th>Id</th>
                    <th>Post Description</th>
                    <th>Result</th>
                  </tr>
                  {props.Posts.map((element, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{element.post}</td>
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
            data={props.data}
            y_title={"comments"}
          />
        ) : (
          <FacebookLoader loading={props.isloading} />
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
