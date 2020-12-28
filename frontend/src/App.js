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
import "./resources/css/table.css";
import "./resources/css/bootstrap-css-only/css/bootstrap.min.css";
import { BaseRouter } from "./Routes/routes";
// import "@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css";
function App() {
  return (
    <Router>
      <BaseRouter></BaseRouter>
    </Router>
  );
}

export default App;
