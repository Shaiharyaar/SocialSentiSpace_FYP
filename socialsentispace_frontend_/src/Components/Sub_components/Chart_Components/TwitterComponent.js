import React, { useState } from "react";

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
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [location, setLocation] = React.useState("");
  const [trend, setTrend] = React.useState("");
  const [info, setinfo] = useState({
    title1: "Information",
    title2: "Latest Tweet",
    title3: "tweeted",
    post: "Here lies the latest tweet that was tweeted ...",
    name: "Obama",
    line1: "This was tweeted at",
    dt: "date and time",
  });

  const handleLocation = (event) => {
    setLocation(event.target.value || "");
    if (event.target.value != "")
      document.getElementById("trendfield").style.visibility = "visible";
    else document.getElementById("trendfield").style.visibility = "hidden";
  };

  const handleTrend = (event) => {
    setTrend(event.target.value || "");

    console.log(document.getElementById("okbtn"));
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

  return (
    <div>
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
                  <MenuItem value={10}>{"#DonaldTrump"}Donaldtrump</MenuItem>
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
              onClick={handleClose}
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
      <LoadComponent />
      <Maincard
        info={info}
        countervalues={[20, 10, 70]}
        data={[128, 229, 33, 436, 99, 132, 233]}
      />
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
