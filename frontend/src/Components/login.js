import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../jwt";

export const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    checkuserlogin();
  }, []);
  const checkuserlogin = () => {
    if (localStorage.getItem("UserInfo")) {
      history.push("/dashboard");
    }
  };
  const handleSubmit = async () => {
    var userregex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
    var passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    var letters = /^[A-Za-z]+$/;
    var emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (username == "") {
      alert("Username is required");
    } else if (!userregex.test(username)) {
      alert("Username can only contains letters,numbers and underscore.");
    } else if (username.length < 6) {
      alert("Username should be of at least length 6");
    } else if (password == "") {
      alert("Password is required");
    }
    // else if (passregex.test(password)) {
    //   alert(
    //     "Password must at least contain one uppercase, one lowercase and a digit."
    //   );
    // }
    else if (password < 8) {
      alert("Password should be of at least length 8");
    } else {
      const credentials = {
        username: username,
        password: password,
      };

      await axiosInstance
        .login(credentials)
        .then((res) => {
          console.log(res.body);
          if (res.status === 200) {
            localStorage.setItem("UserInfo", JSON.stringify(res));
            history.push("/dashboard");
          } else {
            alert("login not successful, try again!");
          }
          console.log(res);
        })
        .catch((error) => alert("Invalid Username or Password"));
    }
  };
  return (
    <div class="container1" onclick="onclick">
      <div class="top"></div>
      <div class="bottom"></div>
      <div class="center">
        <h2>Log In</h2>
        <input
          type="email"
          placeholder="Enter Username"
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <div className="btns">
          <div id="btn" onClick={handleSubmit}>
            <span class="noselect">Log In</span>
            <div id="circle"></div>
          </div>
          <a href="/">
            <div id="btn" onClick={() => history.push("/")}>
              <span class="noselect">Cancel</span>
              <div id="circle"></div>
            </div>
          </a>
        </div>
        <p className="para">
          Don't have an account? <br />
          <a href="/Signup">Create an account.</a>
        </p>
      </div>
    </div>
  );
};

export const Signup = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [image, setImage] = useState("");
  const [gender, setgender] = useState("Male");
  const history = useHistory();

  useEffect(() => {
    checkuserlogin();
  }, []);
  const checkuserlogin = () => {
    if (localStorage.getItem("UserInfo")) {
      history.push("/dashboard");
    }
  };

  const uploadimage = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const handleSubmit = async () => {
    var userregex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
    var passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    var letters = /^[A-Za-z]+$/;
    var emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      (firstname == "") |
      (lastname == "") |
      (gender == "") |
      (image == "") |
      (Cpassword == "")
    ) {
      alert("All Fields are required.");
    } else if (!letters.test(firstname) | !letters.test(lastname)) {
      alert("Name cannot contains spaces, special characters or digits.");
    } else if (email == "") {
      alert("Email is required.");
    } else if (!emailregex.test(email)) {
      alert(
        "Incorrect email. Your email should look like 'shaihxxxxxx@gmail.com'"
      );
    } else if (username == "") {
      alert("Username is required");
    } else if (!userregex.test(username)) {
      alert("Username can only contains letters,numbers and underscore.");
    } else if (username.length < 6) {
      alert("Username should be of at least length 6");
    } else if (password == "") {
      alert("Password is required");
    }
    //  else if (passregex.test(password)) {
    //   alert(
    //     "Password must at least contain one uppercase, one lowercase and a digit."
    //   );
    // }
    else if (password.length < 8) {
      alert("Password should be of at least length 8");
    } else if (password != Cpassword) {
      alert("Password do not match.");
    } else {
      const formData1 = new FormData();
      formData1.append("firstname", firstname);
      formData1.append("lastname", lastname);
      formData1.append("email", email);
      formData1.append("username", username);
      formData1.append("password", password);
      formData1.append("gender", gender);
      formData1.append("image", image);
      await axiosInstance
        .signup(formData1)
        .then((res) => {
          console.log(res);
          if (res) {
            if (res.status == 200) {
              localStorage.setItem("UserInfo", JSON.stringify(res));
              console.log(res);
              history.push("/dashboard");
            } else {
              alert("Invalid Input");
            }
          }
        })
        .catch((error) => {
          alert("Username already taken.");
        });
    }
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
          placeholder="Enter Email (shaxxxxx@gmail.com)"
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
        <select className="select" onChange={(e) => setgender(e.target.value)}>
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="Prefer not to say">Prefer not to say</option>
          <option value="others">Others</option>
        </select>
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
};
