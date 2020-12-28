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
import { connect } from "react-redux";
import { getuserimage } from "../../Components/Auth/authAction";

import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import axiosInstance from "../../jwt";
import { MdModeEdit } from "react-icons/md";

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

const Profile = (props) => {
  useEffect(() => {
    getUser();
    setuserdata();
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
  const [openimagebox, setOpenimagebox] = useState(false);
  const [uploadimage, setUploadimage] = useState("");

  const [match, setMatch] = useState(false);
  const handleopenbox = () => {
    setuserdata();
    setOpenbox(true);
  };

  const handleupload = async () => {
    var newuser = {};
    console.log(uploadimage);
    const formData1 = new FormData();
    formData1.append("image", uploadimage);
    await axiosInstance
      .updateimage(formData1)
      .then((res) => {
        newuser = res.data.newdata;
        console.log(newuser);
      })
      .catch((err) => {
        alert("DP did not change");
      });

    setImage(newuser.image);

    // change here
    props.getuserimage();

    var olduserdata = await axiosInstance.getUserInfo();
    olduserdata.data.User = newuser;
    await localStorage.setItem("UserInfo", JSON.stringify(olduserdata));

    setOpenimagebox(false);
  };

  const handleUPDATE = async () => {
    var newuser = {};
    const credentials = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      gender: gender,
    };
    await axiosInstance
      .updateprofile(credentials)
      .then((res) => {
        newuser = res.data.newdata;
      })
      .catch((err) => {
        console.log(err);
      });
    var olduserdata = await axiosInstance.getUserInfo();
    console.log("OLD USER DATA: ", olduserdata);
    olduserdata.data.User = newuser;
    console.log("updated user data: ", olduserdata);
    await localStorage.setItem("UserInfo", JSON.stringify(olduserdata));
    setOpenbox(false);
  };
  const handlechangepassword = async () => {
    var newuser = {};
    const credentials = { oldPassword: oldpassword, newPassword: newpassword };
    await axiosInstance
      .changepassword(credentials)
      .then((res) => {
        if(res.data.response !== undefined){
          newuser = res.data.response;
          alert("Password Changed Successfuly");
        }
        else{
          alert("Please Try Again!")
        }
      })
      .catch((err) => {
        console.log(err);
      });
    var olduserdata = await axiosInstance.getUserInfo();
    console.log("OLD USER DATA: ", olduserdata);
    olduserdata.data.User = newuser;
    console.log("updated user data: ", olduserdata);
    await localStorage.setItem("UserInfo", JSON.stringify(olduserdata));

    setOpenpass(false);
  };

  const handleopen = () => {
    setOpenpass(true);
  };
  const confirmpassword = (pass) => {
    setNewpassword(pass);
    console.log(pass);
    if (pass == cpassword && pass.length > 8) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  };
  const confirmpassword1 = (pass) => {
    setCpassword(pass);
    if (pass == newpassword && pass.length > 8) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  };
  const handleopenimagebox = () => {
    setOpenimagebox(true);
  };
  const handleClose = () => {
    setOpenbox(false);
    setOpenpass(false);
    setOpenimagebox(false);
  };

  const getUser = () => {
    if (localStorage.getItem("UserInfo")) {
      const u = localStorage.getItem("UserInfo");
      setuser(JSON.parse(u).data.User);
      console.log("USER: ", JSON.parse(u).data.User);
    }
  };
  const setuserdata = () => {
    const u = axiosInstance.getUserInfo().data.User;
    setFirstname(u.firstname);
    setLastname(u.lastname);
    setUsername(u.username);
    setEmail(u.email);
    setGender(u.gender);
    setImage(u.image);
  };

  return (
    <div className="body1">
      <aside class="profile-card">
        <header>
          <a>
            <img src={image} class="hoverZoomLink" />
          </a>
          <a
            href="#"
            class={"uploadimage"}
            style={{ position: "absolute" }}
            onClick={handleopenimagebox}
          >
            <MdModeEdit size={20} color={"#e67a22"} />
          </a>
          <h4>{firstname + " " + lastname}</h4>
        </header>

        <div class="profile-bio">
          <p>
            <strong>Email: </strong>
            {email}
            <br />
            <br />
            <strong>Gender: </strong>
            {gender}
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
        open={openimagebox}
        onClose={handleClose}
        maxWidth={"lg"}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change Display Picture</DialogTitle>
        <DialogContent>
          <div
            className="FormField uploadimage-field"
            style={{ width: 500, height: 40 }}
          >
            <input
              required="true"
              type="file"
              accept="image/*"
              className="FormField__Input"
              style={{ padding: 10 }}
              onChange={(e) => setUploadimage(e.target.files[0])}
            />
          </div>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button id="okbtn" onClick={handleupload} color="primary">
              Upload
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
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
                  setEmail(e.target.value);
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
                Prefer not to say
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
          <span style={{ color: "#a1a1a1", fontSize: 11 }}>
            *new password length should be of at least length 8
          </span>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            style={{ width: 500 }}
            options={[].map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                type="password"
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
                type="password"
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
                type="password"
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
const mapStateToProps = (state) => ({
  userimage: state.authState.userimage,
});

export default connect(mapStateToProps, { getuserimage })(Profile);
