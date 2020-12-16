import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Input,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import { Maincard } from "../ParentCard";
import { FaTwitter } from "react-icons/fa";
import axiosInstance from "../../../jwt";
import {
  Cardloader,
  SubCardloader,
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

    await axiosInstance
      .getTwitterInfo("5f9aa366a88a56128c3b17e9")
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

  const [chartdata, setchartdata] = useState({
    line: "Tweets per hr",
    data: [128, 229, 33, 436, 99, 132, 233],
  });
  const [newdata, setStatenewdata] = useState(false);
  const handleLocation = (event) => {
    setLocation(event.target.value || "");
    if (event.target.value != "")
      document.getElementById("trendfield").style.visibility = "visible";
    else document.getElementById("trendfield").style.visibility = "hidden";
  };
  const handleTrend = (event) => {
    setTrend(event.target.value || "");
    console.log(event.target.value);

    if (event.target.value != "") {
      document.getElementById("okbtn").style.visibility = "visible";
      document.getElementById("span").style.visibility = "hidden";
    } else {
      document.getElementById("okbtn").style.visibility = "hidden";
      document.getElementById("span").style.visibility = "visible";
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleok = () => {
    setOpen(false);
    setStatenewdata(true);
  };
  const closecomponent = () => {
    setStatenewdata(false);
  };

  return (
    <div className={"subscreens"}>
      <div className="row screens">
        <h3>Twitter Analysis </h3>
        <FaTwitter color="blue" size="2.2em" style={{ marginLeft: 10 }} />
      </div>
      <div className="selectloc">
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
      </div>

      <LoadComponent
        check={newdata}
        info={info}
        list={list}
        trend={trend}
        chartdata={chartdata}
        closecomponent={closecomponent}
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
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Open form dialog
          </Button>
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
        <Maincard
          info={props.info}
          countervalues={props.list}
          data={props.chartdata}
        />
        <div className="row screens">
          <h3>Twitter Analysis </h3>
          <FaTwitter color="blue" size="2.2em" style={{ marginLeft: 10 }} />
        </div>
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
