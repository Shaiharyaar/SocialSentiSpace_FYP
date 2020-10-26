import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { FaInstagram, FaHashtag } from "react-icons/fa";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Maincard } from "../ParentCard";

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

  return (
    <div className="col">
      <div className="row screens">
        <h3>Instagram Analysis </h3>
        <FaInstagram color="#e1306c" size="2.2em" style={{ marginLeft: 10 }} />
      </div>
      <div className="row">
        <div className="col-xl-9 boxes" style={{ marginTop: 10 }}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={videos.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter an Instagram #hashtag of your choosing"
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
            <InputLabel htmlFor="grouped-select">
              Latest Instagram Trends
            </InputLabel>
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
      <LoadComponent />
      <Maincard
        info={info}
        countervalues={[20, 10, 70]}
        data={[128, 229, 33, 435, 99, 132, 233]}
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
