import React from "react";
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
import Autocomplete from "@material-ui/lab/Autocomplete";
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

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("No Label");
  const [socialMedia, setsocialMedia] = React.useState("");
  const [fieldLabel, setfieldLabel] = React.useState("");
  const [data, setData] = React.useState("");
  const videos = [];
  const handlesocialMedia = (event) => {
    setsocialMedia(event.target.value || "");
    if (event.target.value != "") {
      if (event.target.value == "Twitter")
        setfieldLabel("Enter a twitter hashtag");
      else if (event.target.value == "Youtube")
        setfieldLabel("Enter a Youtube URL Link");
      else if (event.target.value == "Facebook")
        setfieldLabel("Enter a Fb post URL Link");
      else if (event.target.value == "Instagram")
        setfieldLabel("Enter an Instagram Hashtag");

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
  const [chipData, setChipData] = React.useState([
    { key: 0, socialType: "Twitter", label: "Twitter", data: "twitter" },
    { key: 1, socialType: "Youtube", label: "Youtube", data: "youtube" },
    { key: 2, socialType: "Facebook", label: "Facebook", data: "facebook" },
    { key: 3, socialType: "Instagram", label: "Instagram", data: "insta" },
  ]);

  React.useEffect(() => {}, []);
  const loadComp = (chipToDisplay) => () => {
    const data = chipData.filter((chip) => chip.key === chipToDisplay.key);
    props.compload(data[0].label);
  };
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () => {
    const list = {
      key: chipData.length,
      socialType: socialMedia,
      label: name,
      data: data,
    };
    console.log(list);
    chipData.push(list);
    setOpen(false);
  };
  return (
    <div style={{ width: "100%", marginBottom: 40 }}>
      <Paper
        component="ul"
        style={{
          backgroundColor: "rgba(255,255,255,0.5",
          borderRadius: 30,
          paddingTop: 0,
          paddingLeft: 20,
          paddingRight: 20,
        }}
        className={classes.root}
      >
        {chipData.map((data) => {
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
                onDelete={
                  (data.key === 0) |
                  (data.key === 1) |
                  (data.key === 2) |
                  (data.key === 3)
                    ? undefined
                    : handleDelete(data)
                }
                onClick={loadComp(data)}
                className={classes.chip}
              />
            </li>
          );
        })}
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
                    options={videos.map((option) => option.title)}
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
                    options={videos.map((option) => option.title)}
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
