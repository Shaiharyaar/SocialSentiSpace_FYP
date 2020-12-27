import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";

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

export const Profile = () => {
  useEffect(() => {
    getUser();
  }, []);

  const classes2 = useStyles2();

  const [user, setuser] = useState({});
  const [openbox, setOpenbox] = useState(false);
  const [openpass, setOpenpass] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [match, setMatch] = useState(false);
  const handleopenbox = () => {
    setuserdata();
    setOpenbox(true);
  };
  const handleUPDATE = () => {
    setOpenbox(false);
  };
  const handlechangepassword = () => {
    alert(newpassword);
    setOpenpass(false);
  };

  const handleopen = () => {
    setOpenpass(true);
  };
  const confirmpassword = (pass) => {
    setNewpassword(pass);
    if (pass == cpassword) {
      alert("Password Matched: ", newpassword);
      setMatch(true);
    } else {
      setMatch(false);
    }
  };
  const confirmpassword1 = (pass) => {
    setCpassword(pass);
    if (pass == newpassword) {
      alert("Password Matched: ", newpassword);
      setMatch(true);
    } else {
      setMatch(false);
    }
  };
  const handleClose = () => {
    setOpenbox(false);
    setOpenpass(false);
  };

  const getUser = () => {
    if (localStorage.getItem("UserInfo")) {
      const u = localStorage.getItem("UserInfo");
      setuser(JSON.parse(u).data.User);
      console.log("USER: ", JSON.parse(u).data.User);
    }
  };
  const setuserdata = () => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setUsername(user.username);
    setEmail(user.email);
    setGender(user.gender);
    setImage(user.image);
  };
  return (
    <div className="body1">
      <aside class="profile-card">
        <header>
          <a target="_blank" href="#">
            <img src={user.image} class="hoverZoomLink" />
          </a>

          <h4>{user.firstname + " " + user.lastname}</h4>
        </header>

        <div class="profile-bio">
          <p>
            <strong>Email: </strong>
            {user.email}
            <br />
            <br />
            <strong>Gender: </strong>
            {user.gender}
            <br />
          </p>
          <div className={"d-flex flex-column justify-content-center"}>
            <a
              href="#"
              className="btn btn-full profbtn"
              style={{
                width: "100%",
                height: 35,
                marginBottom: 10,
              }}
              onClick={handleopenbox}
            >
              Edit Profile
            </a>
            <a
              href="#"
              className="btn btn-full profbtn"
              style={{
                width: "100%",
                height: 35,
              }}
              onClick={handleopen}
            >
              Edit Password
            </a>
          </div>
        </div>
      </aside>
      <Dialog
        open={openbox}
        onClose={handleClose}
        maxWidth={"lg"}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
        <DialogContent>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            value={firstname}
            style={{ width: 500 }}
            options={[].map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={"First Name"}
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
            )}
          />
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            value={lastname}
            style={{ width: 500 }}
            options={[].map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={"Last Name"}
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
            )}
          />
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            value={username}
            style={{ width: 500 }}
            options={[].map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={"Username"}
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            )}
          />
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            value={email}
            style={{ width: 500 }}
            options={[].map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={"Email"}
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            )}
          />
          <FormControl
            style={{ marginLeft: 10 }}
            className={classes2.formControl}
          >
            <InputLabel id="demo-dialog-select-label">Select Gender</InputLabel>
            <Select
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
              value={gender}
              onChange={setGender}
              input={<Input />}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"prefer not to say"}>
                Prefer not to say Facebook
              </MenuItem>
              <MenuItem value={"others"}>Others</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button id="okbtn" onClick={handleUPDATE} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openpass}
        onClose={handleClose}
        maxWidth={"lg"}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Password</DialogTitle>
        <DialogContent>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            style={{ width: 500 }}
            options={[].map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={"Enter old Password"}
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  setOldpassword(e.target.value);
                }}
              />
            )}
          />
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            style={{ width: 500 }}
            options={[].map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={"New Password"}
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  confirmpassword(e.target.value);
                }}
              />
            )}
          />
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            style={{ width: 500 }}
            options={[].map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={"Confirm New Password"}
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  confirmpassword1(e.target.value);
                }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {match ? (
            <Button id="okbtn" onClick={handlechangepassword} color="primary">
              Update
            </Button>
          ) : (
            <div></div>
            // <span
            //   id="span"
            //   style={{
            //     position: "absolute",
            //     fontFamily: "Calibri",
            //     right: 32,
            //     bottom: 15,
            //     color: "#999",
            //   }}
            // >
            //   Update
            // </span>
          )}{" "}
        </DialogActions>
      </Dialog>
    </div>
  );
};
