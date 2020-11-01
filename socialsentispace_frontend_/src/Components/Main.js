import React, { useEffect, useState } from "react";
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
        <div className={"headbar"}>
          <h1 style={{ fontSize: 52 }}>{pagename}</h1>
        </div>
        <div className={"screens"}>{props.children}</div>
      </div>
    </div>
  );
};
