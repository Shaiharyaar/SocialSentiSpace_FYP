import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { Grid, Chip, Fab, Paper } from "@material-ui/core";
import { FaTwitter, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import axiosInstance from "../jwt";
import { Chiploader } from "./loading_animations/chiploading";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
const useStyles2 = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
}));

export default function ChipsArray(props) {
  const classes = useStyles();
  const classes2 = useStyles2();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("No Label");
  const [socialMedia, setsocialMedia] = useState("");
  const [fieldLabel, setfieldLabel] = useState("");
  const [data, setData] = useState("");
  const [currentkey, setcurrentkey] = useState(0);
  const [social_id, setsocial_id] = useState("");
  const [loadingChips, setloadingChips] = useState(false);
  const [userloadChips, setuserloadChips] = useState(false);

  const demo = [];

  // var user = JSON.parse(localStorage.getItem("UserInfo"));

  const handlesocialMedia = (event) => {
    setsocialMedia(event.target.value || "");
    if (event.target.value != "") {
      if (event.target.value == "Twitter")
        setfieldLabel("Enter a twitter hashtag");
      else if (event.target.value == "Youtube")
        setfieldLabel("Enter a Youtube video URL");
      else if (event.target.value == "Facebook")
        setfieldLabel("Enter a Fb public page URL");
      else if (event.target.value == "Instagram")
        setfieldLabel("Enter a Instagram Public post link");

      document.getElementById("Datafield").style.visibility = "visible";
    } else document.getElementById("Datafield").style.visibility = "hidden";
  };
  const handleData = (event) => {
    setData(event.target.value || "");

    if (event.target.value != "") {
      document.getElementById("okbtn").style.visibility = "visible";
      document.getElementById("span").style.visibility = "hidden";
    } else {
      document.getElementById("okbtn").style.visibility = "hidden";
      document.getElementById("span").style.visibility = "visible";
    }
  };

  const classes1 = useStyles1();
  const [chipData, setChipData] = React.useState([]);
  const [defaultchips, setdefaultchips] = React.useState([]);
  const user = JSON.parse(localStorage.getItem("UserInfo")).data.User;
  React.useEffect(() => {
    loaddefault_chips();
    updatechips();
  }, []);
  const loaddefault_chips = async () => {
    // await axiosInstance
    //   .getuser({ username: user.data.User.username })
    //   .then((res) => {
    //     console.log(res.body);
    //     if (res.status === 200) {
    //       localStorage.setItem("UserInfo", JSON.stringify(res));
    //     } else {
    //       alert("Loading chips not successful. Try Again!");
    //     }
    //     console.log(res);
    //   })
    //   .catch((error) => alert("Error loading chips"));

    var list = [];
    await axiosInstance
      .getchips({ id: "1234" })
      .then((res) => {
        if (res.status === 200) {
          res.data.result.forEach((chip, index) => {
            list.push({
              key: index,
              id: "1234",
              chartid: chip.chartid,
              social_id: chip.social_id,
              socialType: chip.MediaType,
              label: chip.Label,
              data: chip.Data,
            });
          });
          setdefaultchips(list);
        } else {
          alert("Loading chips not successful. Try Again!");
        }
      })
      .catch((error) => alert("Error loading chips"));

    // user = JSON.parse(localStorage.getItem("UserInfo"));
  };
  const updatechips = async () => {
    var list = [];
    // await axiosInstance
    //   .getuser({ username: user.data.User.username })
    //   .then((res) => {
    //     console.log(res.body);
    //     if (res.status === 200) {
    //       localStorage.setItem("UserInfo", JSON.stringify(res));
    //     } else {
    //       alert("Loading chips not successful. Try Again!");
    //     }
    //     console.log(res);
    //   })
    //   .catch((error) => alert("Error loading chips"));

    await axiosInstance
      .getchips({ id: user._id })
      .then((res) => {
        if (res.status === 200) {
          res.data.result.forEach((chip, index) => {
            list.push({
              key: index,
              id: chip._id,
              chartid: chip.chartid,
              social_id: chip.social_id,
              socialType: chip.MediaType,
              label: chip.Label,
              data: chip.Data,
            });
          });
          setChipData(list);
          setTimeout(() => {
            setloadingChips(true);
            setuserloadChips(true);
          }, 2000);

          console.log("Add chip after update: ", userloadChips);
        } else {
          alert("Loading chips not successful. Try Again!");
        }
      })
      .catch((error) => alert("Error loading chips"));

    // user = JSON.parse(localStorage.getItem("UserInfo"));
  };
  const loadComp = (chipToDisplay) => () => {
    console.log(chipToDisplay);
    if (chipToDisplay.id == "1234") {
      const data = defaultchips.filter(
        (chip) => chip.key === chipToDisplay.key
      );
      props.compload(data);
    } else {
      const data = chipData.filter((chip) => chip.key === chipToDisplay.key);
      props.compload(data);
    }
  };
  const handleDelete = (chipToDelete) => async () => {
    setuserloadChips(false);
    await axiosInstance.delete_all(
      chipToDelete.id,
      chipToDelete.social_id,
      chipToDelete.chartid,

      chipToDelete.socialType
    );
    updatechips();
  };

  const addchip = async (data) => {
    console.log("Add chip before: ", userloadChips);
    // await axiosInstance
    //   .updatechips({
    //     username: user.data.User.username,
    //     chip: JSON.stringify(chipData),
    //   })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       localStorage.setItem("UserInfo", JSON.stringify(res));
    //     } else {
    //       alert("login not successful, try again!");
    //     }
    //     console.log(res);
    //   })
    //   .catch((error) => alert("Error loading user"));

    await axiosInstance
      .addchips(data)
      .then((res) => {
        if (res.status === 200) {
          console.log("Chip added.");
        } else {
          alert("Chips addition successful, try again!");
        }
      })
      .catch((error) => alert("Error loading user"));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = async () => {
    setuserloadChips(false);

    setOpen(false);
    console.log("HANDLE OK: ", userloadChips);
    var id,
      chartid = "";
    if (socialMedia == "Twitter") {
      var ids = await axiosInstance.addtwitterinfo(data);
    } else if (socialMedia == "Youtube") {
      var ids = await axiosInstance.addYoutubeinfo(data);
    } else if (socialMedia == "Facebook") {
      var ids = await axiosInstance.addFacebookinfo(data);
    } else if (socialMedia == "Instagram") {
      var ids = await axiosInstance.addInstagraminfo(data);
    }
    id = ids.social;
    chartid = ids.chart;

    if (id) {
      const list = {
        userid: user._id,
        chartid: chartid,
        social_id: id,
        MediaType: socialMedia,
        Label: name,
        Data: data,
      };
      await addchip(list);
    } else {
      setuserloadChips(false);
    }
    updatechips();
    setsocialMedia("");
  };
  return (
    <div style={{ width: "100%" }}>
      <div className={"fav-box"}>
        <h2>User Favorites</h2>
      </div>
      <Paper
        component="ul"
        style={{
          borderTop: "4px solid #000",

          backgroundColor: "rgba(255,255,255,1",
          borderRadius: 30,
          paddingTop: 0,
          paddingLeft: 20,
          paddingRight: 20,
        }}
        className={classes.root}
      >
        {loadingChips ? (
          defaultchips.map((data) => {
            let icon;

            if (data.socialType === "Twitter") {
              icon = <FaTwitter color="blue" />;
            } else if (data.socialType === "Youtube") {
              icon = <FaYoutube color="red" />;
            } else if (data.socialType === "Facebook") {
              icon = <FaFacebook color="blue" />;
            } else if (data.socialType === "Instagram") {
              icon = <FaInstagram color="#e1306c" />;
            }
            return (
              <li key={data.key} style={{ marginTop: 8 }}>
                <Chip
                  icon={icon}
                  label={data.label}
                  onDelete={undefined}
                  onClick={loadComp(data)}
                  className={classes.chip}
                />
              </li>
            );
          })
        ) : (
          <div style={{ paddingTop: 13 }}>
            <p style={{ fontSize: 16, color: "gray", fontWeight: "bold" }}>
              loading chips
            </p>
          </div>
        )}
        {userloadChips ? (
          chipData.map((data) => {
            let icon;

            if (data.socialType === "Twitter") {
              icon = <FaTwitter color="blue" />;
            } else if (data.socialType === "Youtube") {
              icon = <FaYoutube color="red" />;
            } else if (data.socialType === "Facebook") {
              icon = <FaFacebook color="blue" />;
            } else if (data.socialType === "Instagram") {
              icon = <FaInstagram color="#e1306c" />;
            }
            return (
              <li key={data.key} style={{ marginTop: 8 }}>
                <Chip
                  icon={icon}
                  label={data.label}
                  onDelete={handleDelete(data)}
                  onClick={loadComp(data)}
                  className={classes.chip}
                />
              </li>
            );
          })
        ) : (
          <Chiploader />
        )}
        <div className={classes1.root}>
          <Fab
            onClick={handleClickOpen}
            color="primary"
            size="small"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
            onClose={handleClose}
          >
            <DialogTitle>Create your Shortcut</DialogTitle>

            <DialogContent style={{ width: 450 }}>
              <form className={classes2.container}>
                <FormControl className={classes2.formControl}>
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={demo.map((option) => option.title)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Label"}
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    )}
                  />
                </FormControl>

                <FormControl
                  style={{ marginLeft: 10 }}
                  className={classes2.formControl}
                >
                  <InputLabel id="demo-dialog-select-label">
                    Select Social Media
                  </InputLabel>
                  <Select
                    labelId="demo-dialog-select-label"
                    id="demo-dialog-select"
                    value={socialMedia}
                    onChange={handlesocialMedia}
                    input={<Input />}
                  >
                    <MenuItem value={"Twitter"}>
                      <FaTwitter
                        color="blue"
                        style={{ marginRight: 8, marginLeft: 5 }}
                      />{" "}
                      Twitter
                    </MenuItem>
                    <MenuItem value={"Youtube"}>
                      <FaYoutube
                        color="red"
                        style={{ marginRight: 8, marginLeft: 5 }}
                      />{" "}
                      Youtube
                    </MenuItem>
                    <MenuItem value={"Facebook"}>
                      <FaFacebook
                        color="blue"
                        style={{ marginRight: 8, marginLeft: 5 }}
                      />{" "}
                      Facebook
                    </MenuItem>
                    <MenuItem value={"Instagram"}>
                      <FaInstagram
                        color="#e1306c"
                        style={{ marginRight: 8, marginLeft: 5 }}
                      />{" "}
                      Instagram
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  id="Datafield"
                  style={{ visibility: "hidden" }}
                  className={classes2.formControl}
                >
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    style={{ width: 350 }}
                    options={demo.map((option) => option.title)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={fieldLabel}
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => {
                          handleData(e);
                        }}
                      />
                    )}
                  />
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                id="okbtn"
                onClick={handleOk}
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
      </Paper>
    </div>
  );
}
