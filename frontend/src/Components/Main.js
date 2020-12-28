import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaSquarespace,
  FaTwitter,
  FaUserAstronaut,
  FaYoutube,
} from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Sidenavbar from "../Navigation/sidenav";
export const Mainscreen = (props) => {
  useEffect(() => {
    checkuserlogin();
    chatbotWatson();
  }, []);
  useEffect(() =>{
    if(location.pathname.includes("twitter"))
      setpagename("Twitter")
    else if(location.pathname.includes("facebook"))
      setpagename("Facebook")
    else if(location.pathname.includes("instagram"))
      setpagename("Instagram")
    else if(location.pathname.includes("youtube"))
      setpagename("Youtube")
    else if(location.pathname.includes("profile"))
      setpagename("Profile")
    else if(location.pathname.includes("dashboard"))
      setpagename("Dashboard")
  });

  const [pagename, setpagename] = useState("");
  const history = useHistory();
  const location = useLocation();
  console.log(location.pathname);
  const handlePageName = (name) => {
    setpagename(name);
  };
  const [image, setImage] = useState("");
  const chatbotWatson = () => {
    window
      .loadWatsonAssistantChat({
        integrationID: "4194ea86-c25c-4a5e-8f73-7155e4c03565", // The ID of this integration.
        region: "au-syd", // The region your integration is hosted in.
        serviceInstanceID: "a269969d-750b-4f1b-8d06-4950fd49f728", // The ID of your service instance.
      })
      .then((instance) => {
        instance.render();
      });
  };

  const checkuserlogin = () => {
    if (!localStorage.getItem("UserInfo")) {
      history.push("/login");
    }
  };
  return (
    <div>
      <Sidenavbar setname={handlePageName} logo={image} />
      <div className={"Mainscreen"}>
        <div className="row sticky-header">
          <div className={"col-xl-2"}></div>
          <div
            className={"col-xl-8 headbar"}
            style={{
              fontSize: 35,
            }}
          >
            {pagename == "Twitter" ? (
              <FaTwitter
                color="blue"
                size="0.8em"
                style={{ marginRight: 15, marginTop: 5 }}
              />
            ) : pagename == "Youtube" ? (
              <FaYoutube
                color="red"
                size="0.8em"
                style={{ marginRight: 15, marginTop: 5 }}
              />
            ) : pagename == "Instagram" ? (
              <FaInstagram
                color="#e1306c"
                size="0.8em"
                style={{ marginRight: 15, marginTop: 5 }}
              />
            ) : pagename == "Facebook" ? (
              <FaFacebook
                color="blue"
                size="0.8em"
                style={{ marginRight: 15, marginTop: 5 }}
              />
            ) : pagename == "Profile" ? (
              <FaUserAstronaut
                color="#e67a22"
                size="0.8em"
                style={{ marginRight: 15, marginTop: 2 }}
              />
            ) : (
              <FaSquarespace
                color="white"
                size="0.8em"
                style={{ marginRight: 15, marginTop: 5 }}
              />
            )}
            <h3 style={{ color: "white" }}>{pagename}</h3>
          </div>
        </div>
        <div className={"logo"}>
          <img
            src={require("../resources/img/logo.png")}
            height={100}
            style={{ paddingRight: 30, paddingTop: 10 }}
          />
        </div>
        <div className={"screens"}>{props.children}</div>
      </div>
    </div>
  );
};
