import React, { useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { FaFacebook, FaHashtag } from "react-icons/fa";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Maincard } from "../ParentCard";
import { SubCardloader } from "../../loading_animations/cardloading";
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

    await axiosInstance
      .getFacebookInfo("5f9be68a3b6571272491517d")
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

  return (
    <div className="col subscreens">
      <div className="row screens">
        <h3>Facebook Analysis </h3>
        <FaFacebook color="blue" size="2.2em" style={{ marginLeft: 10 }} />
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
      </div>
      <div className="row">
        <div className="col boxes" style={{ marginTop: 10 }}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={videos.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter a Facebook post link"
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
      <LoadComponent />
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
