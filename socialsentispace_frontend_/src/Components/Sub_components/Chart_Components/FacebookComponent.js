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

  const [Check, setCheck] = useState(false);
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

  const handleok = (url) => {
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

  return (
    <div className="col subscreens">
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
        <div className="col boxes " id={"free-solo"} style={{ marginTop: 10 }}>
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
                  handleok(e.target.value);
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
        data={chartdata}
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
