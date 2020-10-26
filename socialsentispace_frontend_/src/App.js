import React, { useEffect } from "react";
import logo from "./logo.svg";

import { Mainscreen } from "./Components/Main";
import { BrowserRouter as Router } from "react-router-dom";
//css imports
import "./App.css";
import "./resources/css/style.css";
import "./resources/css/sidenav.css";
import "./resources/css/queries.css";
import "./resources/css/profile.css";
import "./resources/css/login.css";
import { ThemeProvider } from "@livechat/ui-kit";
import "./resources/css/bootstrap-css-only/css/bootstrap.min.css";
import { BaseRouter } from "./Routes/routes";
// import "@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css";
function App() {
  const chatbotWatson = () => {
    window.watsonAssistantChatOptions = {
      integrationID: "4194ea86-c25c-4a5e-8f73-7155e4c03565", // The ID of this integration.
      region: "au-syd", // The region your integration is hosted in.
      serviceInstanceID: "a269969d-750b-4f1b-8d06-4950fd49f728", // The ID of your service instance.
      onLoad: function (instance) {
        instance.render();
      },
    };
  };
  useEffect(() => {
    chatbotWatson();
  }, []);
  return (
    <Router>
      <ThemeProvider>
        <BaseRouter></BaseRouter>
      </ThemeProvider>
    </Router>
  );
}

export default App;
