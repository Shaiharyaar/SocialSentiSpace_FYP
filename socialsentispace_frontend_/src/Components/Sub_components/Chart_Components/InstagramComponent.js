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

    await axiosInstance
      .getInstagramInfo("5f9b07177ac7c71c74eba498")
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
  const [chartdata, setchartdata] = useState({
    line: "Tweets per hr",
    data: [128, 229, 33, 436, 99, 132, 233],
  });

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
    await axiosInstance.loadinstagraminfo(Url).then((res) => {
      newdata = res.data;
    });
    var comm = [];

    newdata.Comments.forEach((comments) => {
      comm.push(comments);
    });

    setnewinfo({
      title1: "Insta Information",
      title2: "Instagram Details",
      title3: "posted",
      post:
        newdata.Comments[0] == "verfied"
          ? newdata.Comments[1]
          : newdata.Comments[0],
      name: newdata.Usernames[0],
      line1: "This was posted at",
      dt: newdata.time[0],
    });
    setComments(comm);

    setTimeout(() => {
      setisloading(true);
      setTimeout(() => {
        setiscardloading(false);
        setisloading(false);
      }, 2000);
    }, 2000);
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

  return (
    <div className="col subscreens">
      <div className="row screens">
        <h3>Instagram Analysis </h3>
        <FaInstagram color="#e1306c" size="2.2em" style={{ marginLeft: 10 }} />
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
        data={chartdata}
        closecomponent={closecomponent}
        cardloading={iscardloading}
        isloading={isloading}
        comments={comments}
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
          <Maincard info={info} countervalues={list} data={chartdata} />
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
          <Maincard
            info={props.info}
            countervalues={props.list}
            data={props.data}
            y_title={"comments"}
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
