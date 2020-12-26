import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaSquarespace,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Sidenavbar } from "../Navigation/sidenav";
export const Mainscreen = (props) => {
  useEffect(() => {
    checkuserlogin();
    chatbotWatson();
  }, []);

  const [pagename, setpagename] = useState("Dashboard");
  const history = useHistory();
  const handlePageName = (name) => {
    setpagename(name);
  };

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
      <Sidenavbar setname={handlePageName} />
      <div className={"Mainscreen"}>
        <div
          className={"row headbar"}
          style={{
            textAlign: "center",
            fontSize: 35,
            paddingLeft: "40%",
            paddingTop: 30,
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
          ) : (
            <FaSquarespace
              color="white"
              size="0.8em"
              style={{ marginRight: 15, marginTop: 5 }}
            />
          )}
          <h3 style={{ color: "white" }}>{pagename}</h3>
        </div>
        <div className={"screens"}>{props.children}</div>
      </div>
    </div>
  );
};
