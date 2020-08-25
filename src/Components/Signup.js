import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Label } from "reactstrap";
import AxiosInstance from "../Jwt";

function Signup() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [image, setImage] = useState("");
  const [gender, setgender] = useState("Male");
  const history = useHistory();
  if (localStorage.getItem("userInfo")) {
    // history.push("/userPage");
  }
  const uploadimage = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("gender", gender);

    formData.append("image", image);

    // let r = {
    //   firstname: firstname,
    //   lastname: lastname,
    //   username: username,
    //   email: email,
    //   password: password,
    //   gender: gender,
    //   image: image,
    // };

    await AxiosInstance.signup(formData)
      .then((res) => {
        console.log(res);
        if (res) {
          if (res.status == 200) {
            localStorage.setItem("UserInfo", JSON.stringify(res.data));
            history.push("/userPage");
          } else {
            alert("Invalid Input");
          }
        }
      })
      .catch((error) => {
        alert("Username already exists");
      });
  };
  return (
    <div className="container1">
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="center">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Enter First name"
          onChange={(e) => setfirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Last name"
          onChange={(e) => setlastname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Username"
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setCpassword(e.target.value)}
        />
        <div className="FormField">
          <input
            required="true"
            type="file"
            accept="image/*"
            className="FormField__Input"
            onChange={(e) => uploadimage(e)}
          />
        </div>

        <div className="btns">
          <Label for="exampleSelect">Gender</Label>
          <select
            defaultValue={"Male"}
            onChange={(e) => setgender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <div className="btns">
          <div id="btn" onClick={handleSubmit}>
            <span className="noselect">Register</span>
            <div id="circle"></div>
          </div>
          <a href="/login">
            <div id="btn">
              <span className="noselect">Cancel</span>
              <div id="circle"></div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
