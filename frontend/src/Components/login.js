import React, { useEffect, useState, Component } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../jwt";
import Logo from "../resources/img/logo.png";
import {LoginLoader} from "../Components/loading_animations/cardloading"
import LogoBlack from "../resources/img/logoblackbg.png";

export const Login = () => {
    const [formValues, setFormValues] = useState({ username:"",  password:""});
    const [formErrors, setFormErrors] = useState({ username:"",  password:""});
    const [formValidity, setFormValidity] = useState({ username: false ,  password: false});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [displayAlert, setDisplayAlert] = useState(false);
    const [displayAlertMessage, setDisplayAlertMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [loggedInMessage, setLoggedInMessage] = useState(false);
    const history= useHistory();

    useEffect(() => {
        checkuserlogin();
    }, []);
    const checkuserlogin = () => {
        if (localStorage.getItem("UserInfo")) {
          history.push("/dashboard");
        }
    };

    const handleChange = ({ target }) => {
        const {name, value} = target
        setFormValues(prevState => ({
          ...prevState,
          [name]: value
        }));
        handleValidation(target);
        setErrorMessage(false);
    };
  
    const handleValidation = async(target) => {
        const { name, value } = target;
        var fieldValidationErrors = {...formErrors};
        var validity = {...formValidity};
        const isUsername = name === "username";
        const isPassword = name === "password";
        const usernameTest = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/i;
        validity[name] = value.length > 0;
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} is required and cannot be empty`;
        if (validity[name]) {
          if (isUsername) {
            validity[name] = usernameTest.test(value);
            fieldValidationErrors[name] = validity[name]
              ? ""
              : `${name} should be a valid username`;
          }
          if (isPassword) {
            validity[name] = value.length >= 6;
            fieldValidationErrors[name] = validity[name]
              ? ""
              : `${name} should be 6 characters minimum`;
          }
        }
        setFormErrors(prevState => ({
          ...prevState,
          username: fieldValidationErrors.username,
          password: fieldValidationErrors.password,
        }));
        console.log(formErrors);
        setFormValidity(prevState => ({
          ...prevState,
          username: validity.username,
          password: validity.password,
        }));

    };
  
    const handleSubmit = async(event) => {
        event.preventDefault();
        setIsSubmitting(true);
        if (Object.values(formValidity).every(Boolean)) {
            const credentials = {
              username: formValues.username,
              password: formValues.password,
            };
            await axiosInstance
            .login(credentials)
            .then((res) => {
                  if (res.status === 200) {
                      localStorage.setItem("UserInfo", JSON.stringify(res));
                      setLoggedInMessage(true)
                      setDisplayAlert(true);
                      setDisplayAlertMessage("Logged in Successfully! Redirecting...");
                      setTimeout(() => {
                          setDisplayAlert(false)
                          setLoggedInMessage(false)
                          setDisplayAlertMessage("")
                          history.push("/dashboard");
                        }
                          , 2000);
                  } 
                  else {
                    setErrorMessage(true);
                    setDisplayAlert(true);
                    setDisplayAlertMessage("Login Not Successful")
                    setTimeout(() => {
                      setErrorMessage(false);
                      setDisplayAlertMessage("");
                    }, 3000);
                    
                  }
              })
              .catch((error) => {
                  setErrorMessage(true);
                  setDisplayAlert(true);
                  setDisplayAlertMessage("Invalid Username or Password")
                  setTimeout(() => {
                    setErrorMessage(false);
                    setDisplayAlertMessage("");
                  }, 3000);
              })
              setIsSubmitting(false);
        } 
        else {
              for (let key in formValues) {
                let target = {
                  name: key,
                  value: formValues[key]
                };
                handleValidation(target);
              }
              setIsSubmitting(false);
        }
    };

        // const { formValues, formErrors, isSubmitting } = this.state;
      return (
          <div className="mainPage container-fluid">
              <div className="row">
                  <div className="rightBox col-md-7 container">
                        <img style={{
                            height: "25vh",
                            width: "45vh",
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "3vh",
                            marginBottom: "15vh",
                            display: "block"
                          }} src={LogoBlack} alt={LogoBlack}
                          />
                          <LoginLoader />
                  </div>
                  <div className="leftBox col-md-5">
                      <div style={errorMessage || loggedInMessage ? {marginBottom: "16.8vh"}: {marginBottom: "25.8vh"}}>
                          <span style={{
                            marginLeft: "0.3vh",
                            height: "6vh",
                            width: "10vh"
                          }} ></span>
                          {/* <img style={{
                            marginLeft: "0.3vh",
                            height: "6vh",
                            width: "10vh"
                          }} src={Logo} alt={Logo}/> */}
                      </div>
                      <div className="loginContent">
                          {errorMessage ?
                            <div className="alertBox alert alert-danger alert-dismissible fade show" id="alert-danger" role="alert">
                                {displayAlertMessage}
                            </div>
                          : ""}
                          {loggedInMessage ?
                            <div className="alertBox alert alert-success alert-dismissible fade show" id="alert-success"
                              role="alert">
                              {displayAlertMessage}
                            </div>
                            : ""}
                          <h6 className="Account-Information">Log in with your Social Senti Space account</h6>
                          <form onSubmit={handleSubmit}>
                              <div className="form-group">
                                  <input style={formValues.username !== "" ? {color: "#000000", fontWeight: "500"}:{}}
                                      type="text"
                                      className={`Textfield form-control ${
                                        formErrors.username ? "is-invalid" : ""
                                      }`}
                                      name="username"
                                      onChange={handleChange}
                                      value={formValues.username}
                                      placeholder="Username"
                                  />
                              </div>
                              <div className="form-group">
                                  <input style={formValues.password !== "" ? {color: "#000000", fontWeight: "500"}:{}}
                                      type="password"
                                      className={`Textfield form-control ${
                                        formErrors.password ? "is-invalid" : ""
                                      }`}
                                      name="password"
                                      onChange={handleChange}
                                      value={formValues.password}
                                      placeholder="Password"
                                    />
                              </div>
                              <button type="submit"
                                  className="button"
                                  disabled={isSubmitting}
                                  >
                                {isSubmitting ? "Please wait..." : "Sign in"}
                              </button>
                          </form>

                    {/* <div className="w-100" style={{textAlign: "center"}}>
                      <span className="forgotPassword" onClick={() => history.push("/login")}>Forgot Password</span>
                    </div> */}
                      </div>
              <div className="footerBox">
                <span className="signupMessage">Don't have an account? <a onClick={() => history.push("/signup")} className="signUp">Sign Up</a></span>
              </div>
            </div>
            
          </div>



          <style jsx>{
            //language=CSS
              `							
              .mainPage{
                background: #FFFFFF;
                overflow: hidden;
              }
              .leftBox{
                height: 100%;
                padding: 2.4vh 7vw 2.4vh 7vw;
                background-color: #FFFFFF;
              }
              .rightBox{
                height: 100vh;
                background-color: #212121;
                clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
              }
              .alertBox{
                margin: 0vh 0vh 4vh 0vh;
              }
              .Account-Information {
                width: 100%;
                font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
                font-size: 2.8vh;
                font-weight: bold;
                font-style: normal;
                color: #000000;
                padding-top: 0vh;
                padding-bottom: 3.2vh;
                margin: 0vh 0vh 0vh 0vh;
                margin-block: 0px;
                line-height: 3.8vh;
              }
              .Textfield {
                width: 100%;
                height: 4vh;
                border: 0.07vw solid #F9F9F9;
                border-radius: 0.25vw;
                background-color: #F9F9F9;
                margin: 0vh 0vh 1.6vh 0vh;
                padding: 0vh 2vh 0vh 2vh;
                font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
                font-style: normal;
                font-weight: normal;
                font-size: 1.4vh;
                color: #C0C0C4;
                line-height: 1.6vh;
              }
              .button {
                width: 100%;
                height: 4vh;
                color: #FFFFFF;
                border-radius: 0.25vw;
                border: 0.07vw solid #28A745;
                background-color: #212121;
                margin: 0.8vh 0vh 0.8vh 0vh;
                font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
                font-style: normal;
                font-weight: 600;
                font-size: 1.4vh;
              }
              .button:focus{
                outline: none;
              }
              .forgotPassword{
                font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
                font-style: normal;
                font-weight: 400;
                font-size: 1.4vh;
                color: #000000;
                width: 100%;
                line-height: 2.6vh;
              }
              .forgotPassword:hover{
                cursor: pointer;
              }
              .footerBox{
                background-color: #FFFFFF;
                border: 0.1vh solid #E4E4E6;
                box-sizing: border-box;
                border-radius: 0.15vw;
                width:100%;
                text-align: center;
                padding: 0.7vh 0vh 0.7vh 0vh;
                margin-top: 27.8vh;
                margin-bottom: 2.4vh;
              }
              .signupMessage{
                font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
                font-style: normal;
                font-weight: normal;
                font-size: 1.4vh;
                color: #82828C;
              }
              .signUp{
                text-decoration: underline;
                text-decoration-skip-ink: none;
                color: #00B7FF;
                font-weight: 500;
              }
              .signUp:hover{
                cursor: pointer;
                color: #00B7FF;
              }

              @media (max-width: 650px) {
                .mainPage{
                  height: 100%;
                  width: 100%;
                }
                .rightBox{
                  display: none;
                }
              }
              
            `}</style>

        </div>
      );
};


export const Signup = () => {
  const [formValues, setFormValues] = useState({ firstName: "", lastName: "", username:"", email:"", password:"", Cpassword:"", gender:"", image:""});
  const [formErrors, setFormErrors] = useState({ firstName: "", lastName: "", username:"", email:"", password:"", Cpassword:"", gender:"", image:""});
  const [formValidity, setFormValidity] = useState({ firstName: false, lastName: false, username:false, email:false, password:false, Cpassword:false, gender:false, image:false});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [displayAlertMessage, setDisplayAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [loggedInMessage, setLoggedInMessage] = useState(false);
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
    const {files} = e.target
    setFormValues(prevState => ({
      ...prevState,
      image: files[0],
    }))
    setFormValidity(prevState => ({
      ...prevState,
      image: true,
    }))
    setFormErrors(prevState => ({
      ...prevState,
      image: "",
    }))
  };


  const handleChange = ({ target }) => {
    const {name, value} = target
    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
    handleValidation(target);
    setErrorMessage(false);
};

const handleValidation = async(target) => {
    const { name, value } = target;
    var fieldValidationErrors = {...formErrors};
    var validity = {...formValidity};
    const isUsername = name === "username";
    const isPassword = name === "password";
    const isCPassword = name === "Cpassword";
    const isEmail = name === "email";
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const usernameTest = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/i;
    validity[name] = value.length > 0;
    fieldValidationErrors[name] = validity[name]
      ? ""
      : `${name} is required and cannot be empty`;
    if (validity[name]) {
      if (isUsername) {
        validity[name] = usernameTest.test(value);
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be a valid username`;
      }
      if (isEmail) {
        validity[name] = emailTest.test(value);
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be a valid email`;
      }
      if (isPassword) {
        validity[name] = value.length >= 6;
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be 6 characters minimum`;
      }
      if (isCPassword) {
        validity[name] = value.length >= 6 && value === formValues['password'];
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} Passwords are not same`;
      }
    }
    setFormErrors(prevState => ({
      ...prevState,
      firstName: fieldValidationErrors.firstName,
      lastName: fieldValidationErrors.lastName,
      username: fieldValidationErrors.username,
      email: fieldValidationErrors.email,
      password: fieldValidationErrors.password,
      Cpassword: fieldValidationErrors.Cpassword,
      gender: fieldValidationErrors.gender,
      image: fieldValidationErrors.image
    }));
    setFormValidity(prevState => ({
      ...prevState,
      firstName: validity.firstName,
      lastName: validity.lastName,
      username: validity.username,
      email: validity.email,
      password: validity.password,
      Cpassword: validity.Cpassword,
      gender: validity.gender,
      image: validity.image
    }));
};
  
    const handleSubmit = async(event) => {
        event.preventDefault();
        setIsSubmitting(true);
        console.log(formValidity)
        if (Object.values(formValidity).every(Boolean)) {
              const formData1 = new FormData();
              formData1.append("firstname", formValues['firstName']);
              formData1.append("lastname", formValues['lastName']);
              formData1.append("email", formValues['email']);
              formData1.append("username", formValues['username']);
              formData1.append("password", formValues['password']);
              formData1.append("gender", formValues['gender']);
              formData1.append("image", formValues['image']);
              await axiosInstance
                .signup(formData1)
                .then((res) => {
                  console.log(res);
                  if (res) {
                    if (res.status == 200) {
                      localStorage.setItem("UserInfo", JSON.stringify(res));
                      setLoggedInMessage(true)
                      setDisplayAlert(true);
                      setDisplayAlertMessage("Signed Up Successfully! Redirecting...");
                      setTimeout(() => {
                          setDisplayAlert(false)
                          setLoggedInMessage(false)
                          setDisplayAlertMessage("")
                          history.push("/dashboard");
                        }
                          , 2000);
                    } else {
                      setErrorMessage(true);
                      setDisplayAlert(true);
                      setDisplayAlertMessage("Invalid Input")
                      setTimeout(() => {
                        setErrorMessage(false);
                        setDisplayAlertMessage("");
                      }, 3000);
                    }
                  }
                })
                .catch((error) => {
                  setErrorMessage(true);
                  setDisplayAlert(true);
                  setDisplayAlertMessage("Username Already Taken")
                  setTimeout(() => {
                    setErrorMessage(false);
                    setDisplayAlertMessage("");
                  }, 3000);
              })
              setIsSubmitting(false);
        } 
        else {
              for (let key in formValues) {
                let target = {
                  name: key,
                  value: formValues[key]
                };
                handleValidation(target);
              }
              setIsSubmitting(false);
        }
    };

        // const { formValues, formErrors, isSubmitting } = this.state;
      return (
          <div className="mainPage container-fluid">
              <div className="row">
                  <div className="leftBox col-md-5">
                          
                      <div style={errorMessage || loggedInMessage ? {marginBottom: "3vh"}: {marginBottom: "12vh"}}>
                          <span style={{
                            marginLeft: "0.3vh",
                            height: "6vh",
                            width: "10vh"
                          }} ></span>
                      </div>
                      <div className="loginContent">
                          {errorMessage ?
                            <div className="alertBox alert alert-danger alert-dismissible fade show" id="alert-danger" role="alert">
                                {displayAlertMessage}
                            </div>
                          : ""}
                          {loggedInMessage ?
                            <div className="alertBox alert alert-success alert-dismissible fade show" id="alert-success"
                              role="alert">
                              {displayAlertMessage}
                            </div>
                            : ""}
                          <h6 className="Account-Information">Get Started with your Social Senti Space account</h6>
                          <form onSubmit={handleSubmit}>
                              <div className="nameFields">
                                  <div className="form-group" id="subNameField">
                                      <input
                                        style={formValues.firstName !== "" ? {color: "#000000", fontWeight: "500"} : {}}
                                        type="text"
                                        className={`Textfield form-control ${
                                          formErrors.firstName ? "is-invalid" : ""
                                        }`}
                                        placeholder="First Name"
                                        value={formValues.firstName}
                                        name="firstName"
                                        onChange={handleChange}/>
                                  </div>
                                  <div className="form-group" id="subNameField">
                                      <input
                                        style={formValues.lastName !== "" ? {color: "#000000", fontWeight: "500"} : {}}
                                        type="text"
                                        className={`Textfield form-control ${
                                          formErrors.lastName ? "is-invalid" : ""
                                        }`}
                                        placeholder="Last Name"
                                        value={formValues.lastName}
                                        name="lastName"
                                        onChange={handleChange}/>
                                  </div>
                              </div>
                              <div className="form-group">
                                  <input style={formValues.username !== "" ? {color: "#000000", fontWeight: "500"}:{}}
                                      type="text"
                                      className={`Textfield form-control ${
                                        formErrors.username ? "is-invalid" : ""
                                      }`}
                                      name="username"
                                      onChange={handleChange}
                                      value={formValues.username}
                                      placeholder="Username"
                                  />
                              </div>
                              <div className="form-group">
                                    <input style={formValues.email !== "" ? {color: "#000000", fontWeight: "500"} : {}}
                                        type="email"
                                        className={`Textfield form-control ${
                                          formErrors.email ? "is-invalid" : ""
                                        }`}
                                        placeholder="Email"
                                        value={formValues.email}
                                        name="email"
                                        onChange={handleChange}/>
                              </div>
                              <div className="form-group">
                                  <input style={formValues.password !== "" ? {color: "#000000", fontWeight: "500"}:{}}
                                      type="password"
                                      className={`Textfield form-control ${
                                        formErrors.password ? "is-invalid" : ""
                                      }`}
                                      name="password"
                                      onChange={handleChange}
                                      value={formValues.password}
                                      placeholder="Password"
                                    />
                              </div>
                              <div className="form-group">
                                  <input style={formValues.Cpassword !== "" ? {color: "#000000", fontWeight: "500"}:{}}
                                      type="password"
                                      className={`Textfield form-control ${
                                        formErrors.Cpassword ? "is-invalid" : ""
                                      }`}
                                      name="Cpassword"
                                      onChange={handleChange}
                                      value={formValues.Cpassword}
                                      placeholder="Re-Enter Password"
                                    />
                              </div>
                              <div className="form-group">
                                  <select 
                                      style={formValues.gender !== "" ? {color: "#000000", fontWeight: "500"}:{}}
                                      className={`Textfield form-control ${
                                        formErrors.gender ? "is-invalid" : ""
                                      }`} 
                                      onChange={handleChange}
                                      value={formValues.gender}
                                      name="gender"
                                      >
                                      <option value="">Gender</option>
                                      <option value="male">Male</option>
                                      <option value="female">Female</option>
                                      <option value="Prefer not to say">Prefer not to say</option>
                                      <option value="others">Others</option>
                                  </select>
                              </div>
                              <div className="form-group">
                                    <input
                                        name="image"
                                        style={{paddingTop: "0.6vh"}}
                                        // required="true"
                                        type="file"
                                        accept="image/*"
                                        className={`Textfield form-control ${
                                          formErrors.image ? "is-invalid" : ""
                                        }`}
                                        onChange={(e) => uploadimage(e)}
                                    />
                              </div>
                              <button type="submit"
                                  className="button"
                                  disabled={isSubmitting}
                                  >
                                {isSubmitting ? "Please wait..." : "Sign Up"}
                              </button>
                          </form>

                      </div>
                    <div className="footerBox">
                      <span className="signupMessage">Already Have an Account? <a onClick={() => history.push("/login")} className="signUp">Log in</a></span>
                    </div>
                  </div>
                  <div className="rightBox col-md-7 container">
                        <img style={{
                            height: "25vh",
                            width: "45vh",
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "3vh",
                            marginBottom: "15vh",
                            display: "block"
                          }} src={LogoBlack} alt={LogoBlack}
                          />
                          <LoginLoader />
                  </div>
            
          </div>



          <style jsx>{
            //language=CSS
              `							
              .mainPage{
                background: #FFFFFF;
                overflow: hidden;
              }
              .leftBox{
                height: 100%;
                padding: 2.4vh 7vw 2.4vh 7vw;
                background-color: #FFFFFF;
              }
              .rightBox{
                height: 100vh;
                background-color: #212121;
                clip-path: polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%);
              }
              .alertBox{
                margin: 0vh 0vh 4vh 0vh;
              }
              .Account-Information {
                width: 100%;
                font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
                font-size: 2.8vh;
                font-weight: bold;
                font-style: normal;
                color: #000000;
                padding-top: 0vh;
                padding-bottom: 4.8vh;
                margin: 0vh 0vh 0vh 0vh;
                margin-block: 0px;
                line-height: 3.8vh;
              }
              .Textfield {
                width: 100%;
                height: 4vh;
                border: 0.07vw solid #F9F9F9;
                border-radius: 0.25vw;
                background-color: #F9F9F9;
                margin: 0vh 0vh 1.6vh 0vh;
                padding: 0vh 2vh 0vh 2vh;
                font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
                font-style: normal;
                font-weight: normal;
                font-size: 1.4vh;
                color: #C0C0C4;
                line-height: 1.6vh;
              }

              .nameFields {
                display: flex;
                justify-content: space-between;
              }
              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                -webkit-appearance: none;
              }
              input[type='number'] {
                -moz-appearance: textfield;
              }
              #subNameField {
                width: 49%;
                margin: 0px 0px 0px 0px;
              }

              .button {
                width: 100%;
                height: 4vh;
                color: #FFFFFF;
                border-radius: 0.25vw;
                border: 0.07vw solid #28A745;
                background-color: #212121;
                margin: 0.8vh 0vh 0.8vh 0vh;
                font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
                font-style: normal;
                font-weight: 600;
                font-size: 1.4vh;
              }
              .button:focus{
                outline: none;
              }
              .forgotPassword{
                font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
                font-style: normal;
                font-weight: 400;
                font-size: 1.4vh;
                color: #000000;
                width: 100%;
                line-height: 2.6vh;
              }
              .forgotPassword:hover{
                cursor: pointer;
              }
              .footerBox{
                background-color: #FFFFFF;
                border: 0.1vh solid #E4E4E6;
                box-sizing: border-box;
                border-radius: 0.15vw;
                width:100%;
                text-align: center;
                padding: 0.7vh 0vh 0.7vh 0vh;
                margin-top: 7vh;
                margin-bottom: 2.4vh;
              }
              .signupMessage{
                font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
                font-style: normal;
                font-weight: normal;
                font-size: 1.4vh;
                color: #82828C;
              }
              .signUp{
                text-decoration: underline;
                text-decoration-skip-ink: none;
                color: #00B7FF;
                font-weight: 500;
              }
              .signUp:hover{
                cursor: pointer;
                color: #00B7FF;
              }

              @media (max-width: 650px) {
                .mainPage{
                  height: 100%;
                  width: 100%;
                }
                .rightBox{
                  display: none;
                }
              }
              
            `}</style>

        </div>
      );
};

