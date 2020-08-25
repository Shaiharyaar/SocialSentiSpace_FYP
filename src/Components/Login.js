import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../Jwt";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const history = useHistory();
  if (localStorage.getItem("userInfo")) {
    // history.push("/userPage");
  }

  const handleSubmit = async () => {
    let path = "/userPage";

    const credentials = {
      username: username,
      password: password,
    };
    await axiosInstance
      .login(credentials)
      .then((res) => {
        console.log(res.body);
        if (res.status === 200) {
          localStorage.setItem("UserInfo", JSON.stringify(res.data));
          console.log("Login Credentials :", res.data);
          history.push(path);
        } else {
          alert("login not successful, try again!");
        }
        console.log(res);
      })
      .catch((error) => alert("Invalid Username or Password"));
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
            <div id="btn" onClick={handleSubmit}>
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
}
export default Login;
